# 聊天模块 - 后端接口预留说明

## 临时会话标记

- **会话类型**：前端通过 `temp` 区分
  - `temp=1`：临时会话（从「临时会话」列表进入）
  - `temp=0`：好友会话（从「好友聊天」列表进入）
- **前端表现**：临时会话时，聊天详情页右上角展示「添加好友」入口；好友会话不展示。
- **建议后端**：会话列表与消息接口中增加 `conversationType` 或 `isTemp` 字段，与前端一致。

## 页面入参（聊天详情）

| 参数 | 说明 |
|------|------|
| conversationId | 会话 ID，列表点击时传入（原 id） |
| name | 对方昵称，用于标题展示 |
| temp | 1=临时会话，0=好友会话 |

## 建议后端接口

| 接口 | 说明 |
|------|------|
| 获取会话列表 | 返回项含 `id`、`name`、`preview`、`time`、`isTemp`（或 `conversationType: 'temp' \| 'friend'`） |
| 获取消息列表 | 入参 `conversationId`，返回消息列表 |
| 发送消息 | 入参 `conversationId`、`content`（及类型等） |
| 添加好友 | 仅临时会话使用；入参 `conversationId` 或 `targetUserId`，将当前临时会话对方加为好友 |

前端已在聊天列表跳转时传 `conversationId`，在详情页 `onAddFriend` 中预留加好友逻辑，待对接后端 `addFriend` 接口。
