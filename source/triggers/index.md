---
title: 时机
type: page
layout: default
cover: /images/trigger/tea_master.png
---

这一节实在是太复杂了，所以单开。
TIP：作者也是塔二萌新，如有错误还望指正。

## 时序逻辑（？）

**在塔二中，卡牌/遗物/Power继承自AbstractModel类，它提供了统一的时机函数。**
它们统一在{MegaCrit.Sts2.Core.Hooks.Hook}中被封装。
对于所有监听某个时机的AbstractModel而言，具体调用顺序（CombatState.IterateHookListeners）为：
**玩家**：（最多触发玩家数*50条例）
- Power
- 遗物
- 药水（药水槽中的药水）
- 充能球
- 卡牌（牌堆顺序为：Hand->DrawPile->DiscardPile->ExhaustPile->PlayPile）
  - 卡牌本身
  - 卡牌痛苦（比如女王限制只能3打1）
  - 卡牌附魔
- Modifier

**怪物**：
- Power
- 怪物本身（MonsterModel）

<details>
<summary>[你也可以看看源代码]</summary>

``` C#
public IEnumerable<AbstractModel> IterateHookListeners()
	{
		List<AbstractModel> list = new List<AbstractModel>(Players.Count * 50);
		for (int i = 0; i < _allies.Count + _enemies.Count; i++)
		{
			Creature creature = ((i < _allies.Count) ? _allies[i] : _enemies[i - _allies.Count]);
			list.AddRange(creature.Powers);
			Player player = creature.Player;
			if (player == null)
			{
				list.Add(creature.Monster);
			}
			else
			{
				if (!player.IsActiveForHooks)
				{
					continue;
				}
				IReadOnlyList<RelicModel> relics = player.Relics;
				for (int j = 0; j < relics.Count; j++)
				{
					if (!relics[j].IsMelted)
					{
						list.Add(relics[j]);
					}
				}
				IReadOnlyList<PotionModel> potionSlots = player.PotionSlots;
				for (int k = 0; k < potionSlots.Count; k++)
				{
					if (potionSlots[k] != null)
					{
						list.Add(potionSlots[k]);
					}
				}
				if (player.PlayerCombatState == null)
				{
					continue;
				}
				list.AddRange(player.PlayerCombatState.OrbQueue.Orbs);
				IReadOnlyList<CardPile> allPiles = player.PlayerCombatState.AllPiles;
				for (int l = 0; l < allPiles.Count; l++)
				{
					CardPile cardPile = allPiles[l];
					IReadOnlyList<CardModel> cards = cardPile.Cards;
					for (int m = 0; m < cards.Count; m++)
					{
						CardModel cardModel = cards[m];
						list.Add(cardModel);
						if (cardModel.Affliction != null)
						{
							list.Add(cardModel.Affliction);
						}
						if (cardModel.Enchantment != null)
						{
							list.Add(cardModel.Enchantment);
						}
					}
				}
			}
		}
		for (int n = 0; n < Modifiers.Count; n++)
		{
			list.Add(Modifiers[n]);
		}
		if (MultiplayerScalingModel != null)
		{
			list.Add(MultiplayerScalingModel);
		}
		foreach (AbstractModel item in list)
		{
			if (Contains(item))
			{
				yield return item;
			}
		}
	}

```
</details>

---

### 玩家回合开始

这里按时间顺序列出所有回合开始时的时机函数以及生效对象：（Hook为上方给出的AbstractModel通用时机）
- Creature.BeforeTurnStart
    <font color=MediumTurquoise>当前Side的全体生物（例如玩家阵营/敌方阵营）</font>
- **Hook**.BeforeSideTurnStart
    <font color=MediumTurquoise>全体AbstractModel</font>
    <font color=Medium>遗物-破碎核心</font>
- Creature.PrepareForNextTurn
    <font color=MediumTurquoise>仅限玩家的非额外回合，全体敌人</font>
- Creature.AfterTurnStart
    <font color=MediumTurquoise>当前Side的全体生物</font>
- **Hook**.AfterBlockCleared
    <font color=MediumTurquoise>当前Side的全体生物</font>
    <font color=Medium>遗物-船甲板</font>
- CombatManager.SetupPlayerTurn （内含多个时机）
    <font color=MediumTurquoise>开启回合的全体玩家（涉及额外回合处理）</font>
  - 重置能量（冰淇淋生效时机）
  - **Hook**.AfterEnergyReset
    <font color=Medium>遗物-孙子兵法</font>
  - **Hook**.BeforeHandDraw
    <font color=Medium>遗物-忍者卷轴</font>
  - **Hook**.ModifyHandDraw（在这修改回合开始时的抽牌数）
    <font color=Medium>遗物-准备背包</font>
  - **Hook**.AfterModifyingHandDraw
    <font color=Medium>遗物-怀表（闪烁）</font>
  - *（第一回合的固有处理）*
  - *CardPileCmd.Draw（抽牌）*
  - **Hook**.AfterPlayerTurnStart（这里还有多个时机）
    - AfterPlayerTurnStartEarly
        <font color=Medium>遗物-历史课</font>
    - AfterPlayerTurnStart
        <font color=Medium>遗物-选择悖论</font>
    - AfterPlayerTurnStartLate
        <font color=Medium>遗物-小血瓶</font>
- **Hook**.AfterSideTurnStart
    <font color=MediumTurquoise>全体AbstractModel</font>
    <font color=Medium>遗物-大帽子</font>
- OrbQueue.AfterTurnStart（能量球相关，todo）
    <font color=MediumTurquoise>开启回合的全体玩家</font>
- **Hook**.BeforePlayPhaseStart
    <font color=MediumTurquoise>全体存活的且开启回合的玩家</font>
    <font color=Medium>遗物-低语耳环（恶魔打牌）</font>

---

### 怪物回合开始

与玩家回合类似，后半部分不同：
- Creature.BeforeTurnStart
    <font color=MediumTurquoise>当前Side的全体生物（例如玩家阵营/敌方阵营）</font>
- **Hook**.BeforeSideTurnStart
    <font color=MediumTurquoise>全体AbstractModel</font>
- Creature.AfterTurnStart
    <font color=MediumTurquoise>当前Side的全体生物</font>
- **Hook**.AfterBlockCleared
    <font color=MediumTurquoise>当前Side的全体生物</font>
- **Hook**.AfterSideTurnStart
    <font color=MediumTurquoise>全体AbstractModel</font>
- Action.Invoke
    <font color=MediumTurquoise>敌方回合开始时的Action</font>
- CombatManager.CheckWinCondition（判断胜负）
- CombatManager.ExecuteEnemyTurn（内含多个时机）
    <font color=MediumTurquoise>仅限存活的enemy</font>
  - Creature.TakeTurn
  - CombatManager.CheckWinCondition（判断胜负）
- CombatManager.EndEnemyTurn

---

### 玩家回合结束

由CombatManager.AfterAllPlayersReadyToEndTurn执行

<details>
<summary>[你也可以看看源代码]</summary>

``` C#
private async Task AfterAllPlayersReadyToEndTurn(Func<Task>? actionDuringEnemyTurn = null)
	{
		EndingPlayerTurnPhaseOne = true;
		RunManager.Instance.ActionQueueSynchronizer.SetCombatState(ActionSynchronizerCombatState.EndTurnPhaseOne);
		await WaitUntilQueueIsEmptyOrWaitingOnNonPlayerDrivenAction();
		await EndPlayerTurnPhaseOneInternal();
		if (IsInProgress && RunManager.Instance.NetService.Type != NetGameType.Replay)
		{
			RunManager.Instance.ActionQueueSynchronizer.RequestEnqueue(new ReadyToBeginEnemyTurnAction(LocalContext.GetMe(_state), actionDuringEnemyTurn));
		}
		EndingPlayerTurnPhaseOne = false;
	}

```

</details>

执行顺序：
- **Hook**.BeforeTurnEnd
- CombatManager.DoTurnEnd
  - OrbQueue.BeforeTurnEnd
  - CardCmd.Exhaust （虚无卡牌处理）
    <font color=MediumTurquoise>须满足拥有Ethereal-Keyword且Hook.ShouldEtherealTrigger</font>
    ~~虚无牌的卡面上一定要有虚无词条~~
  - CardPileCmd.Add （回合结束有效果的卡牌处理->放入待执行区）
    <font color=MediumTurquoise>须满足CardModel.HasTurnEndInHandEffect为true</font>
  - CardModel.OnTurnEndInHand
  - 分支：
    - CardCmd.Exhaust （回合结束有效果的卡牌的虚无处理）
    - CardPileCmd.Add （回合结束有效果的卡牌处理->放入弃牌区）
- **Hook**.BeforeFlush
    <font color=MediumTurquoise>结束回合的全体玩家</font>
    - BeforeFlush
        <font color=Medium>附魔-沉眠精华</font>
    - BeforeFlushLate
        <font color=Medium>Power-计划妥当</font>

---
