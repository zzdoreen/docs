## useContext 状态管理类似于eventBus

1. 公共状态存储文件 `createContent.tsx`

```typescript
import { createContext } from "react";

const myContext = createContext(null)

export default myContext;
```

2. 父组件

```typescript
import { Button } from 'antd';
import React, { createContext, useState } from 'react';
import myContext from './createContext';
import ChildPage from './components/ChildPage'

export default () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <h1>父组件</h1>
      <Button onClick={() => setCount(count + 1)}>点击 {count}</Button>

      <hr />

      // 提供器
      <myContext.Provider value={count}>
        <ChildPage />
      </myContext.Provider>
    </div>
  );
};

```

3. 子组件

```typescript
import React, { useContext } from "react"
import myContext from "../createContext"

const ChildPage: React.FC<any> = () => {

    const count = useContext(myContext) // 通过useContext直接获取到context数据

    return (<h1>子组件：{count}</h1>)
}

export default ChildPage
```

## useReducer 需要逻辑处理state

```typescript
// 初始值
  const initialState = { count: 0 }
// 数据操作
  const reducer = (state: { count: number; }, action: { type: string; }) => {
    switch (action.type) {
      case "add": return { count: state.count + 1 };
      case "del": return { count: state.count - 1 };
      default: throw new Error()
    }
  }

// 数据声明  
 const [state, dispatch] = useReducer(reducer, initialState)


// 使用

    <h1>Count:{state.count}</h1>
    <Button onClick={() => dispatch({ type: 'add' })}>reducer add</Button>
    <Button onClick={() => dispatch({ type: 'del' })}>reducer del</Button>
```

### useEffect & useMemo

```javascript
  const dom = useRef()
  const state = useReactive({ num: 1, childInfo: 'hello' })

  useEffect(() => {
    // mounted 的时候执行 模板已经挂在到页面上，dom可以获取到
    console.log('render effect', dom, state.num)
    // dom -> { current:HTMLElement }
  }, [state.num])

  useMemo(() => {
    // 相当于create 的时候执行 模板没有挂在到页面上，dom获取不到
    console.log('render memo', dom, state.num)
    // dom -> { current:undefined }
  }, [state.num])

```

### useReactive 响应式数据，直接修改属性可以刷新视图

```javascript
 const state = useReactive(initialState: Record<string,any>) // 参数为一个对象
```
