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

### 常用技巧（抽象类）

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

todo
