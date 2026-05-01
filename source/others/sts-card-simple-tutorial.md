---
title: STS卡牌简化标签教程
date: 2026-05-02 00:00:00
---

# STS卡牌简化标签教程

本教程展示如何使用简化的 `<sts-card>` 标签格式来渲染卡牌！

---

## 基础用法

### 单卡展示

```html
<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害]
</sts-card>
```

### 效果预览

<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害]
</sts-card>

---

## 升级对比展示

只要添加任意 `u-` 开头的属性，就会自动渲染升级对比！

```html
<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害]
[u-description=造成[blue]9[/blue]点伤害]
</sts-card>
```

### 效果预览

<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害]
[u-description=造成[blue]9[/blue]点伤害]
</sts-card>

---

## 可用属性

### 基础属性

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `name` | 卡牌名称 | 必填 |
| `cost` | 耗能 | 0 |
| `type` | 卡牌类型 | 攻击 |
| `description` | 卡牌描述 | 必填 |

### 升级属性

| 属性 | 说明 | 缺省值 |
|------|------|--------|
| `u-name` | 升级后卡牌名称 | `name` + `+` |
| `u-cost` | 升级后耗能 | `cost` |
| `u-type` | 升级后卡牌类型 | `type` |
| `u-description` | 升级后描述 | `description` |

---

## 详细示例

### 示例1：狩猎（铁卫者）

```html
<sts-card>
[name=狩猎]
[cost=1]
[type=攻击]
[description=[blue]狩猎[/blue]。造成[blue]6[/blue]点伤害。若目标拥有[blue]虚弱[/blue]，额外造成一次伤害。]
[u-description=[blue]狩猎[/blue]。造成[blue]9[/blue]点伤害。若目标拥有[blue]虚弱[/blue]，额外造成一次伤害。]
</sts-card>
```

<sts-card>
[name=狩猎]
[cost=1]
[type=攻击]
[description=[blue]狩猎[/blue]。造成[blue]6[/blue]点伤害。若目标拥有[blue]虚弱[/blue]，额外造成一次伤害。]
[u-description=[blue]狩猎[/blue]。造成[blue]9[/blue]点伤害。若目标拥有[blue]虚弱[/blue]，额外造成一次伤害。]
</sts-card>

---

### 示例2：防御

```html
<sts-card>
[name=防御]
[cost=1]
[type=技能]
[description=获得[blue]5[/blue]点[blue]格挡[/blue]。]
[u-description=获得[blue]8[/blue]点[blue]格挡[/blue]。]
</sts-card>
```

<sts-card>
[name=防御]
[cost=1]
[type=技能]
[description=获得[blue]5[/blue]点[blue]格挡[/blue]。]
[u-description=获得[blue]8[/blue]点[blue]格挡[/blue]。]
</sts-card>

---

### 示例3：能力卡牌

```html
<sts-card>
[name=强化]
[cost=1]
[type=能力]
[description=获得[blue]1[/blue]点[blue]力量[/blue]。]
[u-description=获得[blue]2[/blue]点[blue]力量[/blue]。]
</sts-card>
```

<sts-card>
[name=强化]
[cost=1]
[type=能力]
[description=获得[blue]1[/blue]点[blue]力量[/blue]。]
[u-description=获得[blue]2[/blue]点[blue]力量[/blue]。]
</sts-card>

---

## 卡牌类型

| 类型 | 说明 |
|------|------|
| `攻击` | 红色边框 |
| `技能` | 绿色边框 |
| `能力` | 蓝色边框 |
| `诅咒` | 紫色边框 |

---

## 关键字高亮

支持五种颜色的关键字高亮！

| 标签 | 颜色 |
|------|------|
| `[red]` | 红色 |
| `[green]` | 绿色 |
| `[blue]` | 蓝色 |
| `[yellow]` | 黄色 |
| `[purple]` | 紫色 |

### 使用示例

```html
[description=造成[red]6[/red]点伤害。获得[green]5[/green]点[blue]格挡[/blue]。抽[yellow]1[/yellow]张牌。获得[purple]1[/purple]点力量。]
```

<sts-card>
[name=多彩打击]
[cost=1]
[type=攻击]
[description=造成[red]6[/red]点伤害。获得[green]5[/green]点[blue]格挡[/blue]。抽[yellow]1[/yellow]张牌。获得[purple]1[/purple]点力量。]
</sts-card>

---

## 换行符支持

使用 `[NL]` 来在描述中添加换行符！

```html
[description=造成[red]6[/red]点伤害。[NL]获得[green]5[/green]点[blue]格挡[/blue]。[NL]抽[yellow]1[/yellow]张牌。]
```

<sts-card>
[name=换行打击]
[cost=1]
[type=攻击]
[description=造成[red]6[/red]点伤害。[NL]获得[green]5[/green]点[blue]格挡[/blue]。[NL]抽[yellow]1[/yellow]张牌。]
</sts-card>

---

## 升级后名称变为黄色

升级后的卡牌名称会自动显示为黄色！

<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害。]
[u-description=造成[blue]9[/blue]点伤害。]
</sts-card>

---

## 各种耗能类型

### X耗能

```html
<sts-card>
[name=毁灭]
[cost=X]
[type=攻击]
[description=消耗[blue]X[/blue]点能量。造成[blue]X[/blue]x[blue]8[/blue]点伤害。]
</sts-card>
```

<sts-card>
[name=毁灭]
[cost=X]
[type=攻击]
[description=消耗[blue]X[/blue]点能量。造成[blue]X[/blue]x[blue]8[/blue]点伤害。]
</sts-card>

### 零耗能

```html
<sts-card>
[name=灼伤]
[cost=0]
[type=诅咒]
[description=无法打出。在你的回合结束时受到[blue]2[/blue]点伤害。]
</sts-card>
```

<sts-card>
[name=灼伤]
[cost=0]
[type=诅咒]
[description=无法打出。在你的回合结束时受到[blue]2[/blue]点伤害。]
</sts-card>

---

## 只修改部分升级属性

### 只修改描述

```html
<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害。]
[u-description=造成[blue]9[/blue]点伤害。]
</sts-card>
```

### 只修改耗能

```html
<sts-card>
[name=打击]
[cost=2]
[type=攻击]
[description=造成[blue]12[/blue]点伤害。]
[u-cost=1]
</sts-card>
```

<sts-card>
[name=打击]
[cost=2]
[type=攻击]
[description=造成[blue]12[/blue]点伤害。]
[u-cost=1]
</sts-card>

---

## 快速复制模板

### 单卡模板

```html
<sts-card>
[name=卡牌名称]
[cost=1]
[type=攻击]
[description=卡牌描述]
</sts-card>
```

### 升级对比模板

```html
<sts-card>
[name=卡牌名称]
[cost=1]
[type=攻击]
[description=卡牌描述]
[u-description=升级后描述]
</sts-card>
```

---

## 完整示例集

### 铁卫者卡牌集

<sts-card>
[name=打击]
[cost=1]
[type=攻击]
[description=造成[blue]6[/blue]点伤害。]
[u-description=造成[blue]9[/blue]点伤害。]
</sts-card>

<sts-card>
[name=防御]
[cost=1]
[type=技能]
[description=获得[blue]5[/blue]点[blue]格挡[/blue]。]
[u-description=获得[blue]8[/blue]点[blue]格挡[/blue]。]
</sts-card>

<sts-card>
[name=铁壁]
[cost=1]
[type=技能]
[description=获得[blue]8[/blue]点[blue]格挡[/blue]。抽[blue]1[/blue]张牌。]
[u-description=获得[blue]12[/blue]点[blue]格挡[/blue]。抽[blue]1[/blue]张牌。]
</sts-card>

---

## 规则总结

1. ✅ **使用 `<sts-card>` 标签包裹**
2. ✅ **使用 `[属性=值]` 格式定义属性**
3. ✅ **使用 `[blue]` 和 `[/blue]` 高亮关键字**
4. ✅ **只要有 `u-` 开头的属性，就自动显示升级对比**
5. ✅ **升级属性自动从基础属性补全缺省值**
6. ✅ **升级后名称自动添加 `+`（如果没有的话）**

现在你可以使用这种超简洁的格式来写卡牌了！
