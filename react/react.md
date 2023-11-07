![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0598330567c146dd99ffb819efb8cc62~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
# [react 上](https://juejin.cn/post/6941546135827775525)

# [react 下](https://juejin.cn/post/6940942549305524238)

# [react 新版](https://juejin.cn/post/7258071726227849277)
# 组件基础

## React事件机制

```javascript
<div onClick={this.handleClick.bind(this)}>点我</div>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e969caa9fc647cf8985c4c841a01f60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 `document` 上。这样的方式不仅减少了内存消耗，还能在组件**挂载销毁时统一订阅和移除事件**。
另外冒泡到 `document` 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 `event.stopPropagation()` 是无效的，而应该调用 `event.preventDefault()`。

### 实现合成事件的目的如下：

+ 合成事件首先抹平了浏览器之间的**兼容问题**，另外这是一个跨浏览器原生事件包装器，赋予了**跨浏览器开发的能力**；
+ 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次**复用**事件对象。 (**统一管理**、**减少内存消耗**)

## React的事件和普通的HTML事件有什么不同

### 区别：

+ 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
+ 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
+ react 事件不能采用` return false `的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

### 合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

+ **兼容**所有浏览器，更好的跨平台；
+ 将事件统一存放在一个数组，**避免频繁的新增与删除**（垃圾回收）。
+ 方便 react **统一管理和事务机制**。

> 事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

## React 组件中怎么做事件代理？它的原理是什么？
React基于Virtual DOM实现了一个SyntheticEvent层（合成事件层），定义的事件处理器会接收到一个合成事件对象的实例，它符合W3C标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。
在React底层，主要对合成事件做了两件事：

+ **事件委派**： React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
+ **自动绑定**： React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。

## React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代

### 目前react解决代码复用的主要方式：

+ **高阶组件(HOC)** 是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
+ **render props** 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
+ 通常，render props 和高阶组件只渲染一个子节点。让 **Hook** 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

### (1) HOC 官方解释

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简言之，HOC是一种组件的设计模式，HOC接受一个组件和额外的参数（如果需要），返回一个新的组件。HOC 是纯函数，没有副作用。
```javascript
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));
```
HOC的优缺点∶

+ 优点∶ **逻辑复用**、不影响被包裹组件的内部逻辑。
+ 缺点∶ hoc传递给被包裹组件的props容易和被包裹后的组件**重名**，进而被**覆盖**

### (2) Render props 官方解释

> "render prop"是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有render prop 的组件接受一个返回React元素的函数，将render的渲染逻辑注入到组件内部。在这里，"render"的命名可以是任何其他有效的标识符。

```javascript
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
     state = {
    name: 'Tom'
  }

    render() {
    return (
        <div>
          <p>共享数据组件自己内部的渲染逻辑</p>
          { this.props.render(this.state) }
      </div>
    );
  }
}

// 调用方式
<DataProvider render={data => (
  <h1>Hello {data.name}</h1>
)}/>
```
Render props的优缺点：

+ 优点：**数据共享、代码复用**，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
+ 缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

### (3) Hooks 官方解释

> Hook是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义hook，可以复用代码逻辑

```javascript
// 自定义一个获取订阅数据的hook
function useSubscription() {
  const data = DataSource.getComments();
  return [data];
}
// 
function CommentList(props) {
  const {data} = props;
  const [subData] = useSubscription();
    ...
}
// 使用
<CommentList data='hello' />
```

以上可以看出，hook解决了hoc的prop覆盖的问题，同时使用的方式解决了render props的嵌套地狱的问题。

**hook**的优点如下∶

+ 使用直观；
+ 解决hoc的prop 重名问题；
+ 解决render props 因共享数据 而出现嵌套地狱的问题；
+ 能在return之外使用数据的问题。

需要注意的是：hook只能在组件顶层使用，不可在分支语句中使用。

**总结∶**
Hoc、render props和hook都是为了解决代码复用的问题，但是hoc和render props都有特定的使用场景和明显的缺点。hook是react16.8更新的新的API，让组件逻辑复用更简洁明了，同时也解决了hoc和render props的一些缺点。

## 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

### 哪些方法会触发 react 重新渲染?

  + **setState()** 方法被调用
  `setState` 是 `React` 中最常用的命令，通常情况下，执行 `setState` 会触发 `render`。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 `setState` 传入 `null` 时，`并不会触发 render`。

  + 父组件重新渲染
  只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

### 重新渲染 render 会做些什么

+ 会对新旧 `VNode` 进行对比，也就是我们所说的Diff算法。
+ 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
+ 遍历差异对象，根据差异的类型，根据对应对规则更新VNode

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

## React声明组件有哪几种方法，有什么不同？

### React 声明组件的三种方式：

  + 函数式定义的`无状态组件`
  + ES5原生方式`React.createClass`定义的组件
  + ES6形式的`extends React.Component`定义的组件

  1. **无状态函数式组件**
  它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到state状态的操作
  组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法

  2. **ES5 原生方式 React.createClass // RFC**
  React.createClass会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。

  3. **E6继承形式 React.Component // RCC**
  目前极为推荐的创建有状态组件的方式，最终会取代React.createClass形式；相对于 React.createClass可以更好实现代码复用。

### 无状态组件相对于于后者的区别：

与无状态组件相比，React.createClass和React.Component都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。

### React.createClass与React.Component区别：

  1. **函数this自绑定**

  `React.createClass`创建的组件，其每一个成员函数的this都有React自动绑定，函数中的this会被正确设置。
  `React.Component`创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。

  2. **组件属性类型propTypes及其默认props属性defaultProps配置不同**

  `React.createClass`在创建组件时，有关组件props的属性类型及组件默认的属性会作为组件实例的属性来配置，其中`defaultProps`是使用`getDefaultProp`s的方法来获取默认组件属性的
  `React.Component`在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的。

  3. **组件初始状态state的配置不同**

  `React.createClass`创建的组件，其状态state是通过getInitialState方法来配置组件相关的状态；
  `React.Component`创建的组件，其状态state是在constructor中像初始化组件属性一样声明的。

## 有状态组件和无状态组件的理解及使用场景

### 1. 有状态组件

#### 特点：

+ 是类组件
+ 有继承
+ 可以使用this
+ 可以使用react的生命周期
+ 使用较多，容易频繁触发生命周期钩子函数，影响性能
+ 内部使用 state，维护自身状态的变化，有状态组件根据外部组件传入的 props 和自身的 state进行渲染。

#### 使用场景：

+ 需要使用到状态的。
+ 需要使用状态操作组件的（无状态组件的也可以实现新版本react hooks也可实现）

**总结：**
类组件可以维护自身的状态变量，即组件的 state ，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。类组件则既可以充当无状态组件，也可以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件。

### 2. 无状态组件

#### 特点：

+ 不依赖自身的状态state
+ 可以是类组件或者函数组件。
+ 可以完全避免使用 this 关键字。（由于使用的是箭头函数事件无需绑定）
+ 有更高的性能。当不需要使用生命周期钩子时，应该首先使用无状态函数组件
+ 组件内部不维护 state ，只根据外部组件传入的 props 进行渲染的组件，当 props 改变时，组件重新渲染。

#### 使用场景：

组件不需要管理 state，纯展示

#### 优点：

+ 简化代码、专注于 render
+ 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
+ 视图和数据的解耦分离

#### 缺点：

+ 无法使用 ref
+ 无生命周期方法
+ 无法控制组件的重渲染，因为无法使用shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染

**总结：**
组件内部状态且与外部无关的组件，可以考虑用状态组件，这样状态树就不会过于复杂，易于理解和管理。当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。比如自定义的` <Button/>`、 `<Input />` 等组件。

## 类组件与函数组件有什么异同？

### 相同点：

组件是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 React 元素。也正因为组件是 React 的最小编码单位，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。
我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。

### 不同点：

+ 它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点。
+ 之前，在使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
+ 性能优化上，类组件主要依靠 `shouldComponentUpdate` 阻断渲染来提升性能，而函数组件依靠 `React.memo` 缓存渲染结果来提升性能。
+ 从上手程度而言，类组件更容易上手，从未来趋势上看，由于React Hooks 的推出，函数组件成了社区未来主推的方案。
+ 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。

# 数据管理

## React setState 调用的原理

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e15b888f3bd4a1db8b72259331a4747~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 具体的执行过程如下（源码级解析）：

+ 首先调用了 `setState` 入口函数，入口函数在这里就是充当一个分发器的角色，根据入参的不同，将其分发到不同的功能函数中去；

```javascript
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
```
+ `enqueueSetState` 方法将新的 `state` 放进组件的状态队列里，并调用 `enqueueUpdate` 来处理将要更新的实例对象；

```javascript
enqueueSetState: function (publicInstance, partialState) {
  // 根据 this 拿到对应的组件实例
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
  // 这个 queue 对应的就是一个组件实例的 state 数组
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  queue.push(partialState);
  //  enqueueUpdate 用来处理当前的组件实例
  enqueueUpdate(internalInstance);
}
```

+ 在 `enqueueUpdate` 方法中引出了一个关键的对象——`batchingStrategy`，该对象所具备的 `isBatchingUpdates` 属性直接决定了当下是要走更新流程，还是应该排队等待；如果轮到执行，就调用 `batchedUpdates` 方法来直接发起更新流程。由此可以推测， `batchingStrategy` 或许正是 `React` 内部专门用于管控批量更新的对象。

```javascript
function enqueueUpdate(component) {
  ensureInjected();
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```

**注意：** `batchingStrategy` 对象可以理解为“锁管理器”。这里的“锁”，是指 `React` 全局唯一的 `isBatchingUpdates` 变量，`isBatchingUpdates` 的初始值是 `false`，意味着“当前并未进行任何批量更新操作”。每当 `React` 调用 `batchedUpdate` 去执行更新动作时，会先把这个锁给“锁上”（置为 `true`），表明“现在正处于批量更新过程中”。当锁被“锁上”的时候，任何需要更新的组件都只能暂时进入 `dirtyComponents` 里排队等候下一次的批量更新，而不能随意“插队”。此处体现的“任务锁”的思想，是 `React` 面对大量状态仍然能够实现有序分批处理的基石。

## React setState 调用之后发生了什么？是同步还是异步？

### （1）React中setState后发生了什么

在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。
在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。
如果在短时间内频繁setState。React会将state的改变压入栈中，在合适的时机，批量更新state和视图，达到提高性能的效果。

### （2）setState 是同步还是异步的

假如所有setState是同步的，意味着每执行一次setState时（有可能一个同步代码中，多次setState），都重新vnode diff + dom修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个setState合并成一次组件更新。所以默认是异步的，但是在一些情况下是同步的。
setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同。在源码中，通过 isBatchingUpdates 来判断setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新。

+ **异步：** 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
+ **同步：** 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

一般认为，做异步设计是为了性能优化、减少渲染次数：

+ setState设计为异步，可以显著的提升性能。如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
+ 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步。state和props不能保持一致性，会在开发中产生很多的问题；

## React中的setState批量更新的过程是什么？

调用 setState 时，组件的 state 并不会立即改变， setState 只是把要修改的 state 放入一个队列， React 会优化真正的执行时机，并出于性能原因，会将 React 事件处理程序中的多次React 事件处理程序中的多次 setState 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要。

```javascript
this.setState({
  count: this.state.count + 1    // ===>    入队，[count+1的任务]
});
this.setState({
  count: this.state.count + 1    // ===>    入队，[count+1的任务，count+1的任务]
});
                                 //          ↓
                                 //         合并 state，[count+1的任务]
                                 //          ↓
                                 //         执行 count+1的任务
```

需要注意的是，只要同步代码还在执行，“攒起来”这个动作就不会停止。（注：这里之所以多次 +1 最终只有一次生效，是因为在同一个方法中多次 setState 的合并动作不是单纯地将更新累加。比如这里对于相同属性的设置，React 只会为其保留最后一次的更新）。

## React组件的state和props有什么区别？

### （1）props

props是一个从**外部传进组件的参数**，主要作为就是从父组件向子组件传递数据，它具有**可读性**和**不变性**，只能通过外部组件主动传入新的props来重新渲染子组件，否则子组件的props以及展现形式不会改变。

### （2）state

state的主要作用是用于组件**保存、控制以及修改自己的状态**，它只能在constructor中初始化，它算是组件的私有属性，不可通过外部访问和修改，只能通过组件内部的this.setState来修改，修改state属性会导致组件的重新渲染。

### （3）区别

+ `props` 是`传递给组件`的（类似于函数的形参），而`state `是在组件内被组件`自己管理`的（类似于在一个函数内声明的变量）。
+ `props` 是`不可修改`的，所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
+ `state` 是在组件中创建的，一般在 constructor中初始化 state。state 是`多变的、可以修改`，每次`setState都异步更新的`。

# 生命周期

## React的生命周期有哪些？

React 通常将组件生命周期分为三个阶段：

+ **挂载阶段（Mount）**，组件第一次在DOM树中被渲染的过程；
+ **更新过程（Update）**，组件状态发生变化，重新更新渲染的过程；
+ **卸载过程（Unmount）**，组件从DOM树中被移除的过程；
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1570030fdd4a49f2ad8cfd01a24f80d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### React常见生命周期的过程大致如下：

1. 挂载阶段，首先执行constructor构造方法，来创建组件
2. 创建完成之后，就会执行render方法，该方法会返回需要渲染的内容
3. 随后，React会将需要渲染的内容挂载到DOM树上
4. 挂载完成之后就会执行componentDidMount生命周期函数
5. 如果我们给组件创建一个props（用于组件通信）、调用setState（更改state中的数据）、调用forceUpdate（强制更新组件）时，都会重新调用render函数
6. render函数重新执行之后，就会重新进行DOM树的挂载
7. 挂载完成之后就会执行componentDidUpdate生命周期函数
8. 当移除组件时，就会执行componentWillUnmount生命周期函数

### React主要生命周期总结：

1. getDefaultProps：这个函数会在组件创建之前被调用一次（有且仅有一次），它被用来初始化组件的 Props；
2. getInitialState：用于初始化组件的 state 值；
3. componentWillMount：在组件创建后、render 之前，会走到 componentWillMount 阶段。这个阶段我个人一直没用过、非常鸡肋。后来React 官方已经不推荐大家在 componentWillMount 里做任何事情、到现在 React16 直接废弃了这个生命周期，足见其鸡肋程度了；
4. render：这是所有生命周期中唯一一个你必须要实现的方法。一般来说需要返回一个 jsx 元素，这时 React 会根据 props 和 state 来把组件渲染到界面上；不过有时，你可能不想渲染任何东西，这种情况下让它返回 null 或者 false 即可；
5. componentDidMount：会在组件挂载后（插入 DOM 树中后）立即调用，标志着组件挂载完成。一些操作如果依赖获取到 DOM 节点信息，我们就会放在这个阶段来做。此外，这还是 React 官方推荐的发起 ajax 请求的时机。该方法和 componentWillMount 一样，有且仅有一次调用。

# 组件通信

## 父子组件的通信方式

### 父组件向子组件通信

> 父组件通过 props 向子组件传递需要的信息

```javascript
// 子组件: Child
const Child = props =>{
  return <p>{props.name}</p>
}
// 父组件 Parent
const Parent = ()=>{
    return <Child name="react"></Child>
}
```
### 子组件向父组件通信

> props+回调的方式

```javascript
// 子组件: Child
const Child = props =>{
  const cb = msg =>{
      return ()=>{
          props.callback(msg)
      }
  }
  return (
      <button onClick={cb("你好!")}>你好</button>
  )
}
// 父组件 Parent
class Parent extends Component {
    callback(msg){
        console.log(msg)
    }
    render(){
        return <Child callback={this.callback.bind(this)}></Child>    
    }
}
```

## 跨级组件的通信方式

父组件向子组件的子组件通信，向更深层子组件通信：

+ 使用`props`，利用中间组件层层传递,但是如果父组件结构较深，那么中间每一层组件都要去传递props，增加了复杂度，并且这些props并不是中间组件自己需要的。
+ 使用`context`，context相当于一个大容器，可以把要通信的内容放在这个容器中，这样不管嵌套多深，都可以随意取用，对于跨越多层的全局数据可以使用context实现。

```javascript
// context方式实现跨级组件通信 
// Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
const BatteryContext = createContext();
//  子组件的子组件 
class GrandChild extends Component {
    render(){
        return (
            <BatteryContext.Consumer>
                {
                    color => <h1 style={{"color":color}}>我是红色的:{color}</h1>
                }
            </BatteryContext.Consumer>
        )
    }
}
//  子组件
const Child = () => <GrandChild/>

// 父组件
class Parent extends Component {
      state = { color:"red" }

      render(){
          const {color} = this.state
          return (
          <BatteryContext.Provider value={color}>
              <Child></Child>
          </BatteryContext.Provider>
          )
      }
      }
}
```
## 非嵌套关系组件的通信方式

即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。

+ 可以使用自定义事件通信（`发布订阅模式`）
+ 可以通过redux等进行全局`状态管理`
+ 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信
