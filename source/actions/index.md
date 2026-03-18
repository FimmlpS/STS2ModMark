---
title: 行为
type: page
layout: default
cover: /images/action/doors_of_light_and_dark.png
---

在塔一中，我们将它称作GameAction，不过塔二现在通过异步（async）和等待（await）实现，无需再自定义一系列GameAction。

## 伤害类

### 构造

常用于攻击牌，核心命令为DamageCmd

``` C#
    protected override async Task OnPlay(PlayerChoiceContext choiceContext, CardPlay cardPlay)
    {
        //通过卡牌造成伤害
        await DamageCmd.Attack(DynamicVars.Damage.BaseValue)
        .FromCard(this)
        .Targeting(cardPlay.Target)
        .Execute(choiceContext);
    }

```

PlayerChoiceContext是一个上下文类，用于存储一系列已发生的逻辑，无需深入理解（其实我也不懂）。
DamageCmd.Attack是固定返回AttackCommand的搭配，需要传入伤害值。
让我们看看AttackCommand的每一个方法和优先级：

### 来源

``` C#
//来源类型：卡牌
public AttackCommand FromCard(CardModel card){...}

//来源类型：卡牌
public AttackCommand FromOsty(Creature osty, CardModel card){...}

//来源类型：怪物
public AttackCommand FromMonster(MonsterModel monster){...}

```

### 目标

``` C#
//目标类型：单体生物
public AttackCommand Targeting(Creature creature){...}

//目标类型：所有敌对生物
public AttackCommand TargetingAllOpponents(CombatState combatState){...}

//目标类型：随机敌对生物
public AttackCommand TargetingRandomOpponents(CombatState combatState, bool allowDuplicates=true){...}

```

### 拓展（非必要）

#### 固定数值

``` C#
//固定伤害值，添加该属性后将忽略所有Power的伤害修正
public AttackCommand Unpowered(){...}

```

<details>
<summary>（实际上这只是一个行为规范，以力量为例）</summary>

``` C#
//我们在自定义Power/Relic时要注意进行Unpowered判断，除非你写了（无视无视Power）的无视霸体行为
//StrengthPower
public override decimal ModifyDamageAdditive(Creature? target, decimal amount, ValueProp props, Creature? dealer, CardModel? cardSource)
{
    if (base.Owner != dealer)
    {
        return 0m;
    }
    if (!props.IsPoweredAttack())
    {
        return 0m;
    }
    return base.Amount;
}

//ValueProp
public static bool IsPoweredAttack(this ValueProp props)
{
    if (props.HasFlag(ValueProp.Move))
    {
        return !props.HasFlag(ValueProp.Unpowered);
    }
    return false;
}

```
</details>

#### 攻击次数

``` C#
//设置攻击次数
public AttackCommand WithHitCount(int hitCount){...}

```

#### 动画/特效设置

``` C#
//设置攻击者动画（需注意的是默认动画为"Attack"且默认执行）
public AttackCommand WithAttackerAnim(string? animName, float delay, Creature? visualAttacker = null){...}

//设置无动画（需额外设置）
public AttackCommand WithNoAttackerAnim(){...}

//设置攻击者特效/音效
public AttackCommand WithAttackerFx(string? vfx = null, string? sfx = null, string? tmpSfx = null){...}

//设置等待时间（加速模式开启与否）
public AttackCommand WithWaitBeforeHit(float fastSeconds, float standardSeconds){...}

//设置命中特效/音效
public AttackCommand WithHitFx(string? vfx = null, string? sfx = null, string? tmpSfx = null){...}

//设置每个目标都生成命中特效
public AttackCommand SpawningHitVfxOnEachCreature(){...}

//设置命中特效生成在目标中央位置
public AttackCommand WithHitVfxSpawnedAtBase(){...}

//设置仅播放一次攻击动画
public AttackCommand OnlyPlayAnimOnce(){...}

//还有一些就不列举了（

```

#### 关联Task

``` C#
//攻击者动画执行后的Task
public AttackCommand AfterAttackerAnim(Func<Task> afterAttackerAnim){...}

//伤害执行前的Task
public AttackCommand BeforeDamage(Func<Task> beforeDamage){...}

//通常会用到 AttackCommand.CreateContextAsync
public static async Task<AttackContext> CreateContextAsync(CombatState combatState, CardModel cardSource){...}

```

### 执行

在执行前，可以任意搭配属性/时机方法，执行必须放在最后一位

``` C#
//执行伤害
public async Task<AttackCommand> Execute(PlayerChoiceContext? choiceContext){...}

```

以旋风斩为例（多段对群）

``` C#
await DamageCmd.Attack(DynamicVars.Damage.BaseValue)
            .WithHitCount(num) //攻击次数
            .FromCard(this) 
			.TargetingAllOpponents(CombatState)
			.WithHitFx("vfx/vfx_giant_horizontal_slash") //命中特效
			.Execute(choiceContext);

```

### 特殊-直接伤害

不使用DamageCmd，而是直接调用生物的Damage方法：
以锁镰为例（随机对单，不受Power影响）

``` C#
//取随机可攻击到的敌人
Creature creature = Owner.RunState.Rng.CombatTargets.NextItem(Owner.Creature.CombatState.HittableEnemies);
if (creature != null)
{
    //这个是遗物状态更新，请参考遗物篇
    TaskHelper.RunSafely(DoActivateVisuals());
    await CreatureCmd.Damage(context, creature, DynamicVars.Damage, Owner.Creature);
}

```

---

## 卡牌类

### 牌堆操作（CardPileCmd）

牌组类型（PileType）有这几种：
- Hand（手牌）
- Deck（牌组）
- Draw（抽牌堆）
- Exhaust（消耗堆）
- Discard（弃牌堆）
- Play（执行堆）

#### 抽牌

``` C#
//抽牌，DynamicVars.Cards请参考数值篇
await CardPileCmd.Draw(choiceContext, DynamicVars.Cards.BaseValue, Owner);

```

#### 获得牌堆及其所有卡牌

``` C#
//获得手牌（其他牌堆同理，参考上文的PileType修改即可）
IEnumerable<CardModel> cards = PileType.Hand.GetPile(Owner).Cards;

```

#### 其他

自行查看CardPileCmd即可，这一部分和塔一比较类似

---

### 卡牌选择（CardSelectCmd）

#### 选择参数

选择参数（CardSelectorPrefs）：它的构造函数需要传入提示&限制
- 提示：（有以下几种内置，也可以自定义）
  - TransformSelectionPrompt
  - ExhaustSelectionPrompt
  - RemoveSelectionPrompt
  - EnchantSelectionPrompt
  - DiscardSelectionPrompt
  - UpgradeSelectionPrompt
- 限制：（倾斜部分不可定义）
  - MinSelect 最小选牌数
  - MaxSelect 最大选牌数
  - *RequireManualConfirmation 是否需要手动确认选择*
  - *Cancelable 是否可取消选择*
  - *UnpoweredPreviews 预览时是否置为未数值修正状态*
  - *PretendCardsCanBePlayed 是否假定选中的卡牌可以被打出*
  - ShouldGlowGold 是否高亮（因为是Func类型，可以为每张卡牌单独定义）


#### 范围定义

定义选择范围，形如：CardSelectCmd.FromHand

``` C#
//自定义卡牌列表（单行，例如飞溅）
public static async Task<CardModel?> FromChooseACardScreen
(PlayerChoiceContext context, IReadOnlyList<CardModel> cards, Player player, bool canSkip = false){...}

//自定义卡牌列表（多行）
public static async Task<IEnumerable<CardModel>> FromSimpleGrid
(PlayerChoiceContext context, IReadOnlyList<CardModel> cardsIn, Player player, CardSelectorPrefs prefs){...}

//从牌组选择（会预览升级效果）
public static async Task<IEnumerable<CardModel>> FromDeckForUpgrade
(Player player, CardSelectorPrefs prefs){...}

//从牌组选择（会预览附魔效果）它还有两个多态，有需要的可以自行查看CardSelectCmd
public static async Task<IEnumerable<CardModel>> FromDeckForEnchantment
(Player player, EnchantmentModel enchantment, int amount, CardSelectorPrefs prefs){...}

//从手牌选择
public static async Task<IEnumerable<CardModel>> FromHand
(PlayerChoiceContext context, Player player, CardSelectorPrefs prefs, Func<CardModel, bool>? filter, AbstractModel source){...}

//其中有个FromHandForDiscard，区别于上面的FromHand，它会自动高亮具有Sly效果的卡牌

//从手牌选择（会预览升级效果）
public static async Task<CardModel?> FromHandForUpgrade
(PlayerChoiceContext context, Player player, AbstractModel source){...}

```

#### 多结果处理（IEnumerable\<CardModel>）

注意到范围定义中有的方法返回的是IEnumerable\<CardModel>，而不是CardModel。这是为了支持多选。

给出几个常见的用法：（如果需要更多请自查IEnumerable\<>的方法）
- **取出第一张**：FirstOrDefault() -> 返回第一张选中的卡牌，如果为空则返回null
- **取出最后一张**：LastOrDefault() -> 返回最后一张选中的卡牌，如果为空则返回null
- **取出所有**：ToList() -> 返回一个List\<CardModel>，包含所有选中的卡牌

---

### 卡牌处理

在这里默认你已经得到了一张卡牌，现在是对它的处理部分，命令类为CardCmd
**注意，这一部分含有大量示例**

#### 自动打出（AutoPlay）

``` C#
//CardCmd.AutoPlay
public static async Task AutoPlay(
    PlayerChoiceContext choiceContext,
    CardModel card, 
    Creature? target, 
    AutoPlayType type = AutoPlayType.Default, 
    bool skipXCapture = false, 
    bool skipCardPileVisuals = false){...}

//示例-抉择，抉择
for (int i = 0; i < DynamicVars.Repeat.IntValue; i++)
{
    //target为null时自动选择随机敌人作为目标
    await CardCmd.AutoPlay(choiceContext, card, null);
}

```

#### 弃牌（Discard/DiscardAndDraw）

``` C#
//CardCmd.DiscardAndDraw 其中Discard的两个多态方法均为调用本方法
public static async Task DiscardAndDraw(
    PlayerChoiceContext choiceContext, 
    IEnumerable<CardModel> cardsToDiscard, 
    int cardsToDraw){...}

//示例-计算下注
IEnumerable<CardModel> cards = PileType.Hand.GetPile(Owner).Cards;
int cardsToDraw = cards.Count();
await CardCmd.DiscardAndDraw(choiceContext, cards, cardsToDraw);

```

#### 消耗（Exhaust）

``` C#
//CardCmd.Exhaust
public static async Task Exhaust(
    PlayerChoiceContext choiceContext, 
    CardModel card, 
    bool causedByEthereal = false, 
    bool skipVisuals = false){...}

//示例-坚毅
CardPile pile = PileType.Hand.GetPile(Owner);
CardModel cardModel2 = Owner.RunState.Rng.CombatCardSelection.NextItem(pile.Cards);
if (cardModel2 != null)
{
    await CardCmd.Exhaust(choiceContext, cardModel2);
}

```

#### 升级/降级（Upgrade/Downgrade）

``` C#
//CardCmd.Upgrade 须搭配ForUpgrade的范围定义方法
public static void Upgrade(
    IEnumerable<CardModel> cards, 
    CardPreviewStyle style){...}

//CardCmd.Downgrade 降级的本质是复制一张未升级的牌，将它的数值/描述等属性赋值给当前牌
public static void Downgrade(CardModel card){...}

//示例-武装
CardModel cardModel = await CardSelectCmd.FromHandForUpgrade(choiceContext, base.Owner, this);
if (cardModel != null)
{
    CardCmd.Upgrade(cardModel);
}

```

#### 变化（Transform）

``` C#
//CardCmd.Transform 另有TranformToRandom/TransformTo<T>/Transform调用本方法，可自行查看
public static async Task<IEnumerable<CardPileAddResult>> Transform(
    IEnumerable<CardTransformation> transformations, 
    Rng? rng, 
    CardPreviewStyle style = CardPreviewStyle.HorizontalLayout){...}

//示例-降灵（这不是我们SQL吗）
List<CardModel> cardsIn = (
    from c in PileType.Draw.GetPile(base.Owner).Cards
    orderby c.Rarity, c.Id
    select c).ToList();
List<CardModel> list = (await CardSelectCmd.FromSimpleGrid(choiceContext, cardsIn, base.Owner, new CardSelectorPrefs(CardSelectorPrefs.TransformSelectionPrompt, base.DynamicVars.Cards.IntValue))).ToList();
foreach (CardModel item in list)
{
    //重点是这里，CardCmd.Transform返回的是CardPileAddResult，而不是Void
    CardPileAddResult? cardPileAddResult = await CardCmd.TransformTo<Soul>(item);
    if (base.IsUpgraded && cardPileAddResult.HasValue)
    {
        CardCmd.Upgrade(cardPileAddResult.Value.cardAdded);
    }
}

```

#### 附魔（Enchant）

``` C#
//CardCmd.Enchant
public static EnchantmentModel? Enchant(
    EnchantmentModel enchantment, 
    CardModel card, 
    decimal amount){...}

//示例-放电异虾
CardSelectorPrefs prefs = new CardSelectorPrefs(CardSelectorPrefs.EnchantSelectionPrompt, 1);
Imbued canonicalMomentum = ModelDb.Enchantment<Imbued>();
foreach (CardModel item in await CardSelectCmd.FromDeckForEnchantment.Owner, canonicalMomentum, 1, prefs))
{
    //ToMutable()用于复制canonicalMomentum，避免修改原始对象
    CardCmd.Enchant(canonicalMomentum.ToMutable(), item, 1m);
    CardCmd.Preview(item);
}

```

写到这里只介绍了一半的常见卡牌处理方法，还有半部分需要你在使用过程中自己探索了（

---









