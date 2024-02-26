# git分支规范

合并有风险，操作需谨慎。
合并之前要问一遍自己：当前操作分支，要合并到哪里去，是否确认合并。参考[`指差确认`](https://enochgao.github.io/chore/pointing-and-calling.html)规避操作失误。

## 分支说明

| 分支        | 分支说明                                              |
| ----------- | ----------------------------------------------------- |
| feature     | 功能分支，最小的操作单元（以下成为自己的分支）        |
| dev         | 开发发布分支（Development）                           |
| fat         | 测试发布分支: 工厂验收测试（Factory Acceptance Test） |
| pet         | 性能测试（Performance Evaluation Test）               |
| uat         | 用户验收分支：用户验收测试（User Acceptance Test）    |
| pre         | 预发布分支（pre-release）                             |
| pro         | 生产发布分支（Production）                            |
| master/main | 主分支，一般用来打 tag 版本                           |

**
注意：
除了 feature 分支外，禁止在其他的分支上直接进行修改提交。
**

## 分支规范

从对应版本 dev 分支迁出自己的分支，如本期版本为 v1.0.0：

```ts
dev-v1.0.0---->feature/xxx-v1.0.0
```

- 在自己的分支开发
- 开发完成一个功能后，提交到自己分支（一天至少提交一次）
- 功能完成后，将自己的分支（确保自己相关功能无报错能运行）合并到 dev-v1.0.0 提交并推送（合并有冲突要和冲突方协商不要擅自解决冲突）

分支操作要看清分支后再操作，代码的修改只能在自己的分支上进行

提交代码时，建议添加钩子函数检测代码规范以及提交的 git message 信息规范，进行代码风格校验，两者通过后通过后才能提交成功，否则会被拒绝提交

## git message 规范

```ts
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

| 类型     | 说明                                                    |
| -------- | ------------------------------------------------------- |
| feat     | 新增功能                                                |
| fix      | 修复 bug                                                |
| ci       | 更改 CI/CD 相关配置（npm run build 编译发布）           |
| style    | 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑      |
| refactor | 代码重构，没有加新功能或者修复 bug                      |
| perf     | 优化相关，比如提升性能、体验                            |
| build    | 更改编译相关配置（angular.cli.json,package.json）       |
| chore    | 改变构建流程或者增加依赖库、工具等(杂项)                |
| revert   | 回滚到上一个版本                                        |
| docs     | 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等 |
| test     | 测试用例，包括单元测试、集成测试等                      |

例如：

```ts
feat(发票管理): 添加新增发票功能;
```

```ts
fix: 修复翻页页脚无效bug;
```

[详见](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
