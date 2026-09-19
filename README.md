# dsh-harness-ui

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

DeepSeek Harness Web 的全页控制台插件：把会话、插件、市场、MCP、技能与用量收进一个外壳。

## 行为

- 在侧栏新增一个 **Harness 控制台** 入口，点开后在主区打开一个整页面板。
- 面板顶部是视图切换器，含 7 个视图。**每个视图读取 DSH 运行时的真实数据源**，源不可用时显示明确的空状态，不填充占位数据：

| 视图 | 数据源 |
| --- | --- |
| **总览** | `ctx.sessions.list` 快照 + `remote.pluginInventory` |
| **会话管理** | `ctx.sessions.list`（标题、目录、运行状态、更新时间） |
| **插件管理** | `remote.pluginInventory.list()` + `remote.pluginManager.listBundles()` / `listPlugins()`；开关调用 `setBundleEnabled` |
| **插件市场** | GitHub 搜索 API `topic:dsh-plugin`（公开、无需凭据） |
| **技能浏览** | `remote.skills.list({ sessionId })`，按活动会话解析 |
| **MCP 管理** | 本构建无客户端接口 → 空状态 |
| **用量与模型** | 本构建无客户端 Remote → 空状态 |

- 主题（浅/深）与界面密度（宽松/紧凑）保存在浏览器 `localStorage`。

### 关于降级

插件通过 `ctx.get(name)` 探测服务，未挂载的服务不会让面板崩溃：

- 缺 `sessions` → 会话视图显示「sessions 服务不可用」
- 缺 `pluginInventory` → 插件视图显示不可用
- 缺 `skills` 或没有活动会话 → 技能视图显示对应提示
- MCP 与用量：DSH 当前只在宿主侧暴露相关能力，浏览器端没有对应 Remote 命名空间，因此这两个视图**明确说明**无法读取，而不是展示假数据。

## 开发

```powershell
npm run build
npm test
npm pack --dry-run
```

`src/client.js` 是唯一手写源，`npm run build` 把它复制为 `lib/client.js`（`build:check` 校验二者一致）。
`tests/preview.html` 是渲染验证挂具：模拟 DSH 的 `ModuleLoader` 与 `ctx` 服务，可在浏览器里离线查看各视图与降级路径。

## 安装

```powershell
dsh plugin --profile web add dsh-harness-ui
```

安装后重启 DeepSeek Harness Web。

本地开发版可以直接安装目录：

```powershell
node D:\deepseek-harness\apps\cli\lib\bin.js plugin --profile web add E:\.weixincodex\dsh-harness-ui
```

## 说明

`sidebar` / `rightbar` / `root` 是 DSH 的 `single` 槽位，由官方 `ui-layout` 与 `ui-sidebar` 占用，插件不可替换。本插件因此注册一个 `main` 整页面板（DSH 允许的做法）并从 `sidebar.panellist` 提供入口，而不是替换整个应用外壳。
