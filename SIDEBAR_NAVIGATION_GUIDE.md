# 侧边栏导航配置指南

本文档用于指导如何为游戏的各个语言版本添加侧边栏导航菜单。

## 文件结构概览

```
partygames/
├── css/
│   └── gameheader.css          # 侧边栏导航的主要样式（所有语言共用）
├── js/
│   ├── game-navigation.js      # 英文版本导航脚本
│   ├── game-navigation-zh.js   # 中文版本导航脚本
│   ├── game-navigation-de.js   # 德文版本导航脚本
│   ├── game-navigation-fr.js   # 法文版本导航脚本
│   ├── game-navigation-pt.js   # 葡萄牙文版本导航脚本
│   └── game-navigation-id.js   # 印尼文版本导航脚本
├── games/
│   └── [gamename]/
│       ├── [gamename].html     # 英文版本
│       └── [gamename].css
├── zh/games/
│   └── [gamename]/
│       ├── [gamename].html     # 中文版本
│       └── [gamename].css
├── de/games/
│   └── [gamename]/
│       ├── [gamename].html     # 德文版本
│       └── [gamename].css
├── fr/games/
│   └── [gamename]/
│       ├── [gamename].html     # 法文版本
│       └── [gamename].css
├── pt/games/
│   └── [gamename]/
│       ├── [gamename].html     # 葡萄牙文版本
│       └── [gamename].css
└── id/games/
    └── [gamename]/
        ├── [gamename].html     # 印尼文版本
        └── [gamename].css
```

## 步骤 1：HTML 文件中的 CSS 链接

### 对于英文版本 (`games/[gamename]/[gamename].html`)
```html
<link rel="stylesheet" href="../../css/gameheader.css">
```

### 对于语言版本 (`[lang]/games/[gamename]/[gamename].html`)
**重要：使用 `../../../css/gameheader.css` (三个 ../ 而不是两个)**

例如，中文版本 (`zh/games/[gamename]/[gamename].html`)：
```html
<link rel="stylesheet" href="../../../css/gameheader.css">
```

这同样适用于：
- `/de/games/[gamename]/[gamename].html`
- `/fr/games/[gamename]/[gamename].html`
- `/pt/games/[gamename]/[gamename].html`
- `/id/games/[gamename]/[gamename].html`

## 步骤 2：HTML 文件中的 JavaScript 脚本

### 对于英文版本 (`games/[gamename]/[gamename].html`)
```html
<script src="../../js/game-navigation.js"></script>
```

### 对于各语言版本 - 使用正确的语言脚本

**中文版本** (`zh/games/[gamename]/[gamename].html`)：
```html
<script src="../../js/game-navigation-zh.js"></script>
```

**德文版本** (`de/games/[gamename]/[gamename].html`)：
```html
<script src="../../js/game-navigation-de.js"></script>
```

**法文版本** (`fr/games/[gamename]/[gamename].html`)：
```html
<script src="../../js/game-navigation-fr.js"></script>
```

**葡萄牙文版本** (`pt/games/[gamename]/[gamename].html`)：
```html
<script src="../../js/game-navigation-pt.js"></script>
```

**印尼文版本** (`id/games/[gamename]/[gamename].html`)：
```html
<script src="../../js/game-navigation-id.js"></script>
```

## 步骤 3：游戏 CSS 文件中的修复规则

在游戏的 CSS 文件末尾添加以下规则（`[gamename].css`）：

```css
/* Fix for floating navigation menu z-index */
.floating-nav {
    z-index: 1000 !important;
}

.nav-toggle {
    z-index: 1001 !important;
}

body {
    min-height: 100vh;
}
```

**为什么需要这个修复？**
- `.floating-nav` 和 `.nav-toggle` 的 z-index 确保导航菜单在所有其他内容之上
- `body { min-height: 100vh; }` 确保页面始终占据完整视口高度

## CSS 文件说明

### gameheader.css (`css/gameheader.css`)
这是侧边栏导航的主样式文件，包含：
- `.floating-nav` - 浮动导航容器
- `.nav-toggle` - 导航切换按钮
- `.nav-menu` - 导航菜单
- `.nav-actions` - 导航操作按钮
- `.game-links` - 游戏链接列表
- `.language-dropdown` - 语言选择下拉菜单
- 所有悬停效果和响应式设计

**重要：不要修改这个文件，所有样式更新都应该通过游戏特定的 CSS 文件来覆盖。**

## JavaScript 文件说明

### game-navigation.js (英文) 和 game-navigation-[lang].js (其他语言)

这些文件包含：
1. 游戏列表（带本地化名称）
2. 菜单创建逻辑
3. 事件处理（点击、悬停等）
4. 语言切换功能
5. 身份验证 UI 集成

**关键点：**
- 每个语言版本的脚本都包含对应语言的游戏名称翻译
- 所有链接都使用正确的语言前缀（如 `/zh/games/...`）
- 脚本自动初始化侧边栏导航，无需额外代码

## 常见问题排查

### 问题 1：侧边栏显示但没有样式
**原因：** CSS 路径错误
**解决方案：** 检查 gameheader.css 的路径
- 英文版本：`../../css/gameheader.css` ✓
- 语言版本：`../../../css/gameheader.css` ✓ (注意三个 ../)

### 问题 2：Hover 时侧边栏不展开
**原因：** CSS 冲突，通常是游戏 CSS 中的规则覆盖了导航样式
**解决方案：**
- 不要在游戏 CSS 中设置 `.floating-nav { width: ... }`
- 不要在游戏 CSS 中设置 `.nav-menu { width: ... }`
- 只使用提供的修复规则

### 问题 3：侧边栏被游戏内容覆盖
**原因：** z-index 不足或被其他元素覆盖
**解决方案：** 确保添加了修复规则中的 z-index 设置

### 问题 4：游戏名称显示错误或为空
**原因：** 使用了错误的导航脚本版本
**解决方案：** 确保游戏 HTML 引入了正确语言版本的脚本
- 中文页面必须使用 `game-navigation-zh.js`
- 德文页面必须使用 `game-navigation-de.js`
- 等等...

## 快速检查清单

添加新游戏时，确保：

- [ ] 英文版本 HTML：`<link rel="stylesheet" href="../../css/gameheader.css">`
- [ ] 英文版本 HTML：`<script src="../../js/game-navigation.js"></script>`
- [ ] 英文版本 CSS 末尾：添加了修复规则

- [ ] 中文版本 HTML：`<link rel="stylesheet" href="../../../css/gameheader.css">`
- [ ] 中文版本 HTML：`<script src="../../js/game-navigation-zh.js"></script>`
- [ ] 中文版本 CSS 末尾：添加了修复规则

- [ ] 德文版本 HTML：`<link rel="stylesheet" href="../../../css/gameheader.css">`
- [ ] 德文版本 HTML：`<script src="../../js/game-navigation-de.js"></script>`
- [ ] 德文版本 CSS 末尾：添加了修复规则

- [ ] 法文版本 HTML：`<link rel="stylesheet" href="../../../css/gameheader.css">`
- [ ] 法文版本 HTML：`<script src="../../js/game-navigation-fr.js"></script>`
- [ ] 法文版本 CSS 末尾：添加了修复规则

- [ ] 葡萄牙文版本 HTML：`<link rel="stylesheet" href="../../../css/gameheader.css">`
- [ ] 葡萄牙文版本 HTML：`<script src="../../js/game-navigation-pt.js"></script>`
- [ ] 葡萄牙文版本 CSS 末尾：添加了修复规则

- [ ] 印尼文版本 HTML：`<link rel="stylesheet" href="../../../css/gameheader.css">`
- [ ] 印尼文版本 HTML：`<script src="../../js/game-navigation-id.js"></script>`
- [ ] 印尼文版本 CSS 末尾：添加了修复规则

## CSS 修复规则模板

复制粘贴到游戏的 CSS 文件末尾：

```css
/* Fix for floating navigation menu z-index */
.floating-nav {
    z-index: 1000 !important;
}

.nav-toggle {
    z-index: 1001 !important;
}

body {
    min-height: 100vh;
}
```

## 相关文件列表

| 文件 | 用途 | 修改频率 |
|------|------|--------|
| `css/gameheader.css` | 侧边栏样式 | 很少（只有大的改进） |
| `js/game-navigation.js` | 英文导航脚本 | 很少（只有新游戏或功能） |
| `js/game-navigation-zh.js` | 中文导航脚本 | 很少（只有新游戏或功能） |
| `js/game-navigation-de.js` | 德文导航脚本 | 很少（只有新游戏或功能） |
| `js/game-navigation-fr.js` | 法文导航脚本 | 很少（只有新游戏或功能） |
| `js/game-navigation-pt.js` | 葡萄牙文导航脚本 | 很少（只有新游戏或功能） |
| `js/game-navigation-id.js` | 印尼文导航脚本 | 很少（只有新游戏或功能） |
| `games/[gamename]/[gamename].html` | 游戏 HTML | 经常（添加新功能） |
| `games/[gamename]/[gamename].css` | 游戏样式 | 经常（样式调整） |
| `[lang]/games/[gamename]/[gamename].html` | 翻译版本 HTML | 经常（添加新功能） |
| `[lang]/games/[gamename]/[gamename].css` | 翻译版本样式 | 经常（样式调整） |

## 示例：为新游戏添加侧边栏

假设你要为新游戏 "MyGame" 添加侧边栏导航：

### 1. 英文版本 (`games/mygame/mygame.html`)
```html
<head>
    ...
    <link rel="stylesheet" href="../../css/gameheader.css">
    <link rel="stylesheet" href="mygame.css">
</head>
<body>
    ...
    <script src="../../js/game-navigation.js"></script>
</body>
```

### 2. 英文版本 CSS (`games/mygame/mygame.css`)
```css
/* 你的游戏样式 */
...

/* Fix for floating navigation menu z-index */
.floating-nav {
    z-index: 1000 !important;
}

.nav-toggle {
    z-index: 1001 !important;
}

body {
    min-height: 100vh;
}
```

### 3. 中文版本 (`zh/games/mygame/mygame.html`)
```html
<head>
    ...
    <link rel="stylesheet" href="../../../css/gameheader.css">
    <link rel="stylesheet" href="mygame.css">
</head>
<body>
    ...
    <script src="../../js/game-navigation-zh.js"></script>
</body>
```

### 4. 其他语言版本类似，只改变脚本名称：
- 德文：`<script src="../../js/game-navigation-de.js"></script>`
- 法文：`<script src="../../js/game-navigation-fr.js"></script>`
- 葡萄牙文：`<script src="../../js/game-navigation-pt.js"></script>`
- 印尼文：`<script src="../../js/game-navigation-id.js"></script>`

---

**最后更新：** 2024年11月
**适用游戏：** Hedbanz 及以后的所有游戏
