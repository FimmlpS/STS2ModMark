---
title: 卡牌
type: page
layout: default
cover: /images/card/sunken_statue.png
---

## 初始化

### 基本定义

打击（最基本的卡牌）定义如下：

每张卡牌包括一些基本要素：
- 数值：攻击值（DamageVar）、格挡值（BlockVar）等
- 构造：耗能、类型、稀有度、目标类型
- 打出效果
- 升级效果
- *标签* ：别忘了给你的打击和防御添加Strike/Defend标签，涉及一系列先古事件和遗物

``` C#
namespace Chun.Scripts.Cards.Attack;

[Pool(typeof(ChunCardPool))]
public class Strike : AbstractChunCard
{
    //标签
    protected override HashSet<CardTag> CanonicalTags => [
        CardTag.Strike
    ];

    //数值
    protected override IEnumerable<DynamicVar> CanonicalVars => [
        new DamageVar(6,ValueProp.Move)
    ];

    //构造
    public Strike() : base(1, CardType.Attack, CardRarity.Basic, TargetType.AnyEnemy)
    {
        
    }

    //打出时效果
    protected override async Task OnPlay(PlayerChoiceContext choiceContext, CardPlay cardPlay)
    {
        await DamageCmd.Attack(DynamicVars.Damage.BaseValue)
        .FromCard(this)
        .Targeting(cardPlay.Target)
        .Execute(choiceContext);
    }

    //升级时效果
    protected override void OnUpgrade()
    {
        DynamicVars.Damage.UpgradeValueBy(3);
    }
}
```

### 常用技巧

#### 抽象类

为你的卡牌添加一个通用的抽象类可以节省很多重复的代码量

``` C#
namespace Chun.Scripts.Cards;

public abstract class AbstractChunCard : CustomCardModel
{
    //通用卡图位置，在BaseLib前置环境下，卡图命名形如：chun-strike.png
    public override string PortraitPath => $"res://Chun/images/cards/{Id.Entry.ToLowerInvariant()}.png";

    public AbstractChunCard(int baseCost, CardType type, CardRarity rarity, TargetType target) 
    : base(baseCost,type,rarity,target,true,true)
    {
        
    }

    public AbstractChunCard(int baseCost, CardType type, CardRarity rarity, TargetType target, bool showInCardLibrary, bool autoAdd) 
    : base(baseCost,type,rarity,target,showInCardLibrary,autoAdd)
    {
        
    }
}
```

#### VSCode编辑

VSCode的Explorer默认浏览所有文件，但是在godot中会自动为每一个读入的文件生成一个.uid文件，这就使得Explorer非常繁杂。
![处理前](/source/images/card/VSBefore.png)

你可以打开设置（Settings）在上方搜索框输入 <b>files:exclude</b> ，找到图示，<b>选中上方的Workspace</b>，然后添加 <b>**/*.uid</b> 到排除列表中。

![处理](/source/images/card/VSIn.png)

然后就可以忽略掉这些uid文件，更便捷地开发了（可以直接让你的Explorer缩短一半）。

![处理后](/source/images/card/VSAfter.png)



#### 卡图命名规则（BaseLib）



### 卡图命名规则（BaseLib）

如果你按照下方的规则来命名卡图，要注意你的域（namespace）的第一段名（我的示例是Chun）
这张卡牌的实际ID为： **{第一段域名}** + **{-}** + **{卡牌类名规则化大写}**
规则化大写：除了第一个字母，在每个大写字母前插入 **{下划线}** ，然后把所有字母改成大写
- 类名 -> 实际ID -> 卡图命名 （示例）
- Strike -> CHUN-STRIKE -> chun-strike.png
- PerfectStrike -> CHUN-PERFECT_STRIKE -> chun-perfect_strike.png
- DoOrDie -> CHUN-DO_OR_DIE -> chun-do_or_die.png

``` C#
namespace Chun.Scripts.Cards.Attack;
...
//通用卡图位置，在BaseLib前置环境下，卡图命名形如：chun-strike.png
public override string PortraitPath => $"res://Chun/images/cards/{Id.Entry.ToLowerInvariant()}.png";
```

---

## 数值

与塔一亘古不变的攻击值/格挡值/魔法值不同，塔二添加了大量新的数值类型（同时也使你能更方便的自定义）
~~再也不用用魔法值冒充攻击值了~~

``` C#
protected override IEnumerable<DynamicVar> CanonicalVars => [
    new DamageVar(6,ValueProp.Move)
];
```

### 常见数值类型

在卡牌类（CardModel）中有一个数值管理器DynamicVars（DynamicVarSet类型），它根据上述的CanonicalVars来进行初始化，在使用时可以直接通过DynamicVars来访问这些定义好的数值，下面给出一些类型及其在DynamicVars中的属性名对应

- 攻击值（DamageVar）：DynamicVars.Damage
- 格挡值（BlockVar）：DynamicVars.Block
- 抽牌值（CardsVar）：DynamicVars.Cards
- 能量值（EnergyVar）：DynamicVars.Energy
- 额外伤害值（ExtraDamageVar）：DynamicVars.ExtraDamage
- 金币值（GoldVar）：DynamicVars.Gold
- 治疗值（HealVar）：DynamicVars.Heal
- 生命流失值（HpLossVar）：DynamicVars.HpLoss
- 最大生命值（MaxHpVar）：DynamicVars.MaxHp
- 奥斯提伤害值（OstyDamageVar）：DynamicVars.OstyDamage
- 召唤值（SummonVar）：DynamicVars.Summon
- 重放值（RepeatVar）：DynamicVars.Repeat
- 储君星星值（StarsVar）：DynamicVars.Stars

此外对于能力类型的数值，它由泛型定义，例如：

``` C#
//能力数值一般不会受升级以外的效果而变化，所以构造时只需要传入其基础数值
protected override IEnumerable<DynamicVar> CanonicalVars => [
    new PowerVar<WeakPower>(2)
];

```

因此，你可以为每一种卡牌涉及到的能力单独制定一种数值类型，原版提供并支持了以下能力类型的数值：
- 敏捷（DexterityPower）：DynamicVars.Dexterity
- 力量（StrengthPower）：DynamicVars.Strength
- 灾厄（DoomPower）：DynamicVars.Doom
- 毒（PoisonPower）：DynamicVars.Poison
- 易伤（VulnerablePower）：DynamicVars.Vulnerable
- 虚弱（WeakPower）：DynamicVars.Weak

### 使用数值

todo

### 自定义数值类型

以群星之子这张牌为例，它的自定义了数值类型：BlockForStars（每次花费星星时获得的格挡值）
``` C#
protected override IEnumerable<DynamicVar> CanonicalVars => [new DynamicVar("BlockForStars", 2m)];

```

用法（要保证命名一致）

``` C#
await PowerCmd.Apply<ChildOfTheStarsPower>(
    Owner.Creature, DynamicVars["BlockForStars"].BaseValue, Owner.Creature, this);

```

卡牌描述

``` json
"CHILD_OF_THE_STARS.description": "每当你花费{singleStarIcon}时，每花费一点{singleStarIcon}，获得{BlockForStars:diff()}点[gold]格挡[/gold]。"

```

---

## 描述

一般卡牌会用到卡牌/关键词/效果/直接Tip提示的描述文本，你的文本文件统一放在

``` C#
//{MOD_ID}/localization/{语言}/
//以我的MOD为例
Chun/localization/zhs/cards.json                //卡牌
Chun/localization/zhs/card_keywords.json        //卡牌关键词（暂时用不到）
Chun/localization/zhs/powers.json               //效果
Chun/localization/zhs/static_hover_tips.json    //直接Tip提示（比如：格挡）

```

塔二区别于塔一，可以在卡牌中自定义Tip显示，这就不需要你再在card_keywords.json中手动定义，不过现在你需要手动添加Tip提示，因为不会自动识别并解析关键词了（比如：Block）
**所以如果你的防御牌用到格挡，要记得手动添加，参考自定义Tip展示**

### 卡牌（cards）

参考下方打击和防御的命名规则，把CHUN改成你的MOD_ID，具体可以看[**卡牌类名规则化大写**](#卡图命名规则baselib)
``` json
{
	"CHUN-STRIKE.title":"打击",
	"CHUN-STRIKE.description":"造成{Damage:diff()}点伤害。",

	"CHUN-DEFEND.title":"防御",
	"CHUN-DEFEND.description":"获得{Block:diff()}点[gold]格挡[/gold]。"
}

```
注意：数字用{数值类型：方法}表示，它会调用卡牌方法来获取实际值；关键词/效果用\[gold][/gold]涵括~~，它会自动解析为额外注释~~

{数值类型}请参考[**数值类型**](#常见数值类型)最右侧的变量名

{方法}有以下几种：
- diff()：实际数值，默认情况下都用这个
- energyIcons()：能量图标，一般用于{Energy:energyIcons()}
- 特殊：
  - 战斗内/外显示：{InCombat:\n<u>（造成{CalculatedDamage:diff()}点伤害）</u>|}
    <font color=MediumTurquoise>下划线部分是可替换的</font>
    <font color=Medium>卡牌-全身撞击</font>
  - 升级是/否显示：{IfUpgraded:show:仆从打击+|仆从打击}
    <font color=MediumTurquoise>注意到有个|，它分隔升级前/后的显示内容</font>
    <font color=Medium>卡牌-冲锋！！</font>

### 关键词（card_keywords）

原版关键词有：
- Eternal：永恒
- Ethereal：虚无
- Exhaust：消耗
- Innate：固有
- Retain：保留
- Sly：奇巧
- Unplayable：不能被打出

原版提供的关键词不再通过卡牌描述添加，而是通过初始化定义实现，不再需要你在文本文件里添加 虚无 这样的描述。
``` C#
//以回响形态为例
public override IEnumerable<CardKeyword> CanonicalKeywords => [CardKeyword.Ethereal];

//移除
protected override void OnUpgrade()
{
    RemoveKeyword(CardKeyword.Ethereal);
}

```

自定义关键词todo

### 效果（powers）

自定义效果todo

### 静态直接Tip提示（static_hover_tips）

这时候你可能想问，像**格挡**这样在塔一原本属于keyword的词怎么处理？
在static_hover_tips.json中如此描述：
``` json
{
    "BLOCK.title": "格挡",
    "BLOCK.description": "在下个回合前，阻挡伤害。",
    "CHUN-DIANRAN.title":"点染",                                        //静态描述法
    "CHUN-DIANRAN.description":"将一种正面或负面效果变化为特殊的效果。",    //静态描述法
    "SUMMON_DYNAMIC.title": "召唤{Summon}",                             //动态描述法
    "SUMMON_DYNAMIC.description": "以[blue]{Summon}[/blue]生命值召唤[gold]奥斯提[/gold]。\n如果已经召唤，则在本场战斗中将其最大生命值提升[blue]{Summon}[/blue]点。",

}

```

使用请参考下文的[**自定义Tip展示**](#自定义Tip展示)

### 自定义Tip展示

为你用到的的Power/Potion/Orb/Relic/Card/Keyword/StaticHoverTip作如下定义

``` C#
//写在你的CardModel类中，具体到单卡
protected override IEnumerable<IHoverTip> ExtraHoverTips => [
    HoverTipFactory.FromPower<StrengthPower>(),
    HoverTipFactory.FromPotion<StrengthPotion>(),
    HoverTipFactory.FromOrb<DarkOrb>(),
    HoverTipFactory.FromRelic<BurningBlood>().First(),  //遗物通常有多个tip，须取第一个（它本身描述）
    HoverTipFactory.FromCard<StrikeIronclad>(),         //会直接展示一张卡牌
    HoverTipFactory.FromKeyword(CardKeyword.Innate),
    HoverTipFactory.Static(StaticHoverTip.Block),                             //静态
    HoverTipFactory.Static(StaticHoverTip.SummonDynamic, DynamicVars.Summon)  //动态
];

//主要讲动态描述法
//title JSON
"SUMMON_DYNAMIC.title": "召唤{Summon}",
//description JSON
"SUMMON_DYNAMIC.description": "以[blue]{Summon}[/blue]生命值召唤[gold]奥斯提[/gold]。"

//须确保你传入的DynamicVars的值与{Summon}一致，支持传入多个DynamicVar的值，在参数后面添加即可
HoverTipFactory.Static(StaticHoverTip.SummonDynamic, DynamicVars.Summon)

```

在写下这部分时，StaticHoverTip仅提供了一小部分支持，如果你想实现自己的IHoverTip，请如下定义Helper

``` C#
//TipHelper.cs
public class TipHelper
{
    public static string MOD_ID = "CHUN-";
    public static string DIAN_RAN = ModdedID("DIAN_RAN");
    public static string TA_YIN = ModdedID("TA_YIN");

    public static string ModdedID (string id)
    {
        return MOD_ID + id;
    }

    public static IHoverTip Static(string tipId, params DynamicVar[] vars)
    {
        LocString locString = L10NStatic(tipId + ".title");
        LocString locString2 = L10NStatic(tipId + ".description");
        foreach (DynamicVar dynamicVar in vars)
        {
            locString.Add(dynamicVar);
            locString2.Add(dynamicVar);
        }

        return new HoverTip(locString, locString2);
    }

    private static LocString L10NStatic(string entry)
    {
        return new LocString("static_hover_tips", entry);
    }
}

//用法
protected override IEnumerable<IHoverTip> ExtraHoverTips => [
    TipHelper.Static(TipHelper.DIAN_RAN),
    TipHelper.Static(TipHelper.TA_YIN, DynamicVars["TaYin"])
];

```

**作业**：
<div class="kira-note kira-note-tip">
  <span class="kira-note-title">请实现描述和效果（别忘了Tip）</span>
  <div class="kira-note-content">
    给予1层<b>创伤</b>。
    <br>对所有敌人<b>侵蚀</b>5。
    将一张<b>治疗</b>加入手牌。
  </div>
</div>

---
