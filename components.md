# 组件封装

## 什么时候需要封装

> 需要复用的内容

## 怎么封装

组件包含：模板、样式、逻辑

模板和样式基本不需要修改
1. 展示的`数据`通过`参数`的形式传进来
2. `逻辑分支`/`不同展示效果`，也需要用`参数`的形式进行控制


## 封装原则

1. 单一原则：负责单一的页面渲染
2. 多重职责：负责多重职责，获取数据，复用逻辑，页面渲染等
3. 明确接受参数：必选、非必选，参数尽量以_开头，避免变量重复
4. 可扩展：需求变动能及时调整，不影响之前的代码