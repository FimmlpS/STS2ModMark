---
title: 高亮块使用教程
date: 2026-03-18 00:00:00
---

# 高亮块使用教程

本文档介绍如何在Hexo和Kira主题下使用高亮块功能。

## 基本用法

在Markdown文件中使用HTML标签来创建高亮块。

### 1. 信息提示

```html
<div class="kira-note kira-note-info">
  <span class="kira-note-title">信息</span>
  <div class="kira-note-content">
    这是一个信息提示框，用于显示一般信息。
  </div>
</div>
```

### 2. 小贴士

```html
<div class="kira-note kira-note-tip">
  <span class="kira-note-title">小贴士</span>
  <div class="kira-note-content">
    这是一个小贴士，用于显示有用的提示信息。
  </div>
</div>
```

### 3. 成功提示

```html
<div class="kira-note kira-note-success">
  <span class="kira-note-title">成功</span>
  <div class="kira-note-content">
    操作成功完成！
  </div>
</div>
```

### 4. 警告提示

```html
<div class="kira-note kira-note-warning">
  <span class="kira-note-title">警告</span>
  <div class="kira-note-content">
    这是一个警告信息，请注意！
  </div>
</div>
```

### 5. 错误提示

```html
<div class="kira-note kira-note-danger">
  <span class="kira-note-title">错误</span>
  <div class="kira-note-content">
    这是一个错误信息，请检查！
  </div>
</div>
```

### 6. 引用

```html
<div class="kira-note kira-note-quote">
  <span class="kira-note-title">引用</span>
  <div class="kira-note-content">
    这是一段引用内容。
  </div>
</div>
```

## 高级用法

### 包含代码块

```html
<div class="kira-note kira-note-info">
  <span class="kira-note-title">代码示例</span>
  <div class="kira-note-content">
    下面是一个代码示例：
    
    ```csharp
    public class Example {
        public void Method() {
            Console.WriteLine("Hello World");
        }
    }
    ```
  </div>
</div>
```

### 自定义标题

你可以自定义标题文本：

```html
<div class="kira-note kira-note-tip">
  <span class="kira-note-title">自定义标题</span>
  <div class="kira-note-content">
    内容区域
  </div>
</div>
```

### 省略标题

如果不需要标题，可以省略：

```html
<div class="kira-note kira-note-info">
  <div class="kira-note-content">
    没有标题的信息框
  </div>
</div>
```

## 可用类型

| 类型 | 类名 | 用途 | 图标 |
|------|------|------|------|
| 信息 | `kira-note-info` | 显示一般信息 | ℹ️ |
| 小贴士 | `kira-note-tip` | 显示有用的提示 | 💡 |
| 成功 | `kira-note-success` | 显示成功信息 | ✅ |
| 警告 | `kira-note-warning` | 显示警告信息 | ⚠️ |
| 错误 | `kira-note-danger` | 显示错误信息 | ❌ |
| 引用 | `kira-note-quote` | 显示引用内容 | 💬 |

## 实际效果展示

<div class="kira-note kira-note-info">
  <span class="kira-note-title">信息</span>
  <div class="kira-note-content">
    这是一个信息提示框，用于显示一般信息。
  </div>
</div>

<div class="kira-note kira-note-tip">
  <span class="kira-note-title">小贴士</span>
  <div class="kira-note-content">
    这是一个小贴士，用于显示有用的提示信息。
  </div>
</div>

<div class="kira-note kira-note-success">
  <span class="kira-note-title">成功</span>
  <div class="kira-note-content">
    操作成功完成！
  </div>
</div>

<div class="kira-note kira-note-warning">
  <span class="kira-note-title">警告</span>
  <div class="kira-note-content">
    这是一个警告信息，请注意！
  </div>
</div>

<div class="kira-note kira-note-danger">
  <span class="kira-note-title">错误</span>
  <div class="kira-note-content">
    这是一个错误信息，请检查！
  </div>
</div>

<div class="kira-note kira-note-quote">
  <span class="kira-note-title">引用</span>
  <div class="kira-note-content">
    这是一段引用内容。
  </div>
</div>
