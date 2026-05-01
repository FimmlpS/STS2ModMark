---
title: 杀戮尖塔卡牌展示模板
date: 2026-05-02 00:00:00
---

# 杀戮尖塔卡牌展示模板

本模板提供了规格化的杀戮尖塔卡牌展示效果，支持单卡展示和升级对比展示。

---

## 目录
1. [单卡展示](#单卡展示)
2. [升级对比展示](#升级对比展示)
3. [卡牌类型](#卡牌类型)
4. [耗能类型](#耗能类型)
5. [关键字高亮](#关键字高亮)
6. [完整示例](#完整示例)

---

## 单卡展示

### 基础模板

```html
<div class="sts-card-container">
	<div class="sts-card sts-attack">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">打击</div>
		</div>
		<div class="sts-card-type">攻击</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">
			造成 <span class="sts-keyword">6</span> 点伤害。
		</div>
	</div>
</div>
```

### 效果预览

<div class="sts-card-container">
	<div class="sts-card sts-attack">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">打击</div>
		</div>
		<div class="sts-card-type">攻击</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">
			造成 <span class="sts-keyword">6</span> 点伤害。
		</div>
	</div>
</div>

---

## 升级对比展示

### 基础模板

```html
<div class="sts-card-container">
	<div class="sts-card-compare">
		<div class="sts-card sts-attack">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">打击</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				造成 <span class="sts-keyword">6</span> 点伤害。
			</div>
		</div>
		<div class="sts-upgrade-arrow"></div>
		<div class="sts-card sts-attack sts-upgraded">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">打击+</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				造成 <span class="sts-keyword">9</span> 点伤害。
			</div>
		</div>
	</div>
</div>
```

### 效果预览

<div class="sts-card-container">
	<div class="sts-card-compare">
		<div class="sts-card sts-attack">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">打击</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				造成 <span class="sts-keyword">6</span> 点伤害。
			</div>
		</div>
		<div class="sts-upgrade-arrow"></div>
		<div class="sts-card sts-attack sts-upgraded">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">打击+</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				造成 <span class="sts-keyword">9</span> 点伤害。
			</div>
		</div>
	</div>
</div>

---

## 卡牌类型

### 攻击卡牌

```html
<div class="sts-card sts-attack">
```

### 技能卡牌

```html
<div class="sts-card sts-skill">
```

### 能力卡牌

```html
<div class="sts-card sts-power">
```

### 诅咒卡牌

```html
<div class="sts-card sts-curse">
```

<div class="sts-card-container">
	<div class="sts-card sts-attack">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">攻击卡</div>
		</div>
		<div class="sts-card-type">攻击</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">攻击卡牌演示</div>
	</div>
	<div class="sts-card sts-skill">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">技能卡</div>
		</div>
		<div class="sts-card-type">技能</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">技能卡牌演示</div>
	</div>
	<div class="sts-card sts-power">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">能力卡</div>
		</div>
		<div class="sts-card-type">能力</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">能力卡牌演示</div>
	</div>
	<div class="sts-card sts-curse">
		<div class="sts-card-cost sts-energy">0</div>
		<div class="sts-card-header">
			<div class="sts-card-name">诅咒卡</div>
		</div>
		<div class="sts-card-type">诅咒</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">诅咒卡牌演示</div>
	</div>
</div>

---

## 耗能类型

### 普通耗能（金色）

```html
<div class="sts-card-cost sts-energy">1</div>
```

### X耗能（橙色）

```html
<div class="sts-card-cost sts-x">X</div>
```

### 无耗能（灰色）

```html
<div class="sts-card-cost sts-unplayable">0</div>
```

### 零耗能（灰色）

```html
<div class="sts-card-cost sts-unplayable">0</div>
```

<div class="sts-card-container">
	<div class="sts-card sts-attack">
		<div class="sts-card-cost sts-energy">2</div>
		<div class="sts-card-header">
			<div class="sts-card-name">普通耗能</div>
		</div>
		<div class="sts-card-type">攻击</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">金色能量球</div>
	</div>
	<div class="sts-card sts-skill">
		<div class="sts-card-cost sts-x">X</div>
		<div class="sts-card-header">
			<div class="sts-card-name">X耗能</div>
		</div>
		<div class="sts-card-type">技能</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">橙色能量球</div>
	</div>
	<div class="sts-card sts-curse">
		<div class="sts-card-cost sts-unplayable">0</div>
		<div class="sts-card-header">
			<div class="sts-card-name">无耗能</div>
		</div>
		<div class="sts-card-type">诅咒</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">灰色能量球</div>
	</div>
</div>

---

## 关键字高亮

使用 `<span class="sts-keyword">文本</span>` 来高亮关键字：

```html
<div class="sts-card-description">
	获得 <span class="sts-keyword">5</span> 点 <span class="sts-keyword">格挡</span>。
	抽 <span class="sts-keyword">1</span> 张牌。
</div>
```

<div class="sts-card-container">
	<div class="sts-card sts-skill">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">防御</div>
		</div>
		<div class="sts-card-type">技能</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">
			获得 <span class="sts-keyword">5</span> 点 <span class="sts-keyword">格挡</span>。
		</div>
	</div>
</div>

---

## 完整示例

### 示例1：狩猎（铁卫者）

<div class="sts-card-container">
	<div class="sts-card-compare">
		<div class="sts-card sts-attack">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">狩猎</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				<span class="sts-keyword">狩猎</span>。
				造成 <span class="sts-keyword">6</span> 点伤害。
				若目标拥有 <span class="sts-keyword">虚弱</span>，额外造成一次伤害。
			</div>
		</div>
		<div class="sts-upgrade-arrow"></div>
		<div class="sts-card sts-attack sts-upgraded">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">狩猎+</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				<span class="sts-keyword">狩猎</span>。
				造成 <span class="sts-keyword">9</span> 点伤害。
				若目标拥有 <span class="sts-keyword">虚弱</span>，额外造成一次伤害。
			</div>
		</div>
	</div>
</div>

### 示例2：铁壁（铁卫者）

<div class="sts-card-container">
	<div class="sts-card-compare">
		<div class="sts-card sts-skill">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">铁壁</div>
			</div>
			<div class="sts-card-type">技能</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				获得 <span class="sts-keyword">8</span> 点 <span class="sts-keyword">格挡</span>。
				抽 <span class="sts-keyword">1</span> 张牌。
			</div>
		</div>
		<div class="sts-upgrade-arrow"></div>
		<div class="sts-card sts-skill sts-upgraded">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">铁壁+</div>
			</div>
			<div class="sts-card-type">技能</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				获得 <span class="sts-keyword">12</span> 点 <span class="sts-keyword">格挡</span>。
				抽 <span class="sts-keyword">1</span> 张牌。
			</div>
		</div>
	</div>
</div>

---

## 快速复制模板

### 单卡模板

```html
<div class="sts-card-container">
	<div class="sts-card sts-attack">
		<div class="sts-card-cost sts-energy">1</div>
		<div class="sts-card-header">
			<div class="sts-card-name">卡牌名称</div>
		</div>
		<div class="sts-card-type">攻击</div>
		<div class="sts-card-divider"></div>
		<div class="sts-card-description">
			卡牌描述
		</div>
	</div>
</div>
```

### 升级对比模板

```html
<div class="sts-card-container">
	<div class="sts-card-compare">
		<div class="sts-card sts-attack">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">卡牌名称</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				卡牌描述
			</div>
		</div>
		<div class="sts-upgrade-arrow"></div>
		<div class="sts-card sts-attack sts-upgraded">
			<div class="sts-card-cost sts-energy">1</div>
			<div class="sts-card-header">
				<div class="sts-card-name">卡牌名称+</div>
			</div>
			<div class="sts-card-type">攻击</div>
			<div class="sts-card-divider"></div>
			<div class="sts-card-description">
				卡牌描述
			</div>
		</div>
	</div>
</div>
```

---

## 卡牌类型对照表

| 卡牌类型 | 类名 | 边框颜色 | 背景色 |
|---------|------|---------|--------|
| 攻击 | `sts-attack` | 深红 | 深红渐变 |
| 技能 | `sts-skill` | 深绿 | 深绿渐变 |
| 能力 | `sts-power` | 深蓝 | 深蓝渐变 |
| 诅咒 | `sts-curse` | 深紫 | 深灰渐变 |

---

## 耗能类型对照表

| 耗能类型 | 类名 | 颜色 |
|---------|------|------|
| 普通耗能 | `sts-energy` | 金色 |
| X耗能 | `sts-x` | 橙色 |
| 无耗能 | `sts-unplayable` | 灰色 |

---

## 样式说明

- **升级卡牌**：添加 `sts-upgraded` 类，边框变为金色
- **关键字**：使用 `<span class="sts-keyword">` 包裹，显示金色加粗
- **升级箭头**：使用 `<div class="sts-upgrade-arrow">` 显示金色箭头

现在你可以直接复制这些模板，在你的Markdown文档中使用了！
