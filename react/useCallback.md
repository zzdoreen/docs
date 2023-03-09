## useCallback

### 案例一
1. 子组件不依赖该项数据
2. 父组件该数据更新不会导致子组件重复渲染
   
+ 父组件

```javascript

import { useCallback, useState } from "react"
import Child from "./Child"

const Login = () => {
  const [string, setString] = useState('hello world')

  const handleStringChange = useCallback((e) => {
    setString(e.target.value) // 子组件不依赖string 不触发子组件更新
  }, [])
  
  const handleStringChange = (e) => {
    setString(e.target.value)  // string 变化触发所有子组件更新
  }

  return <div style={{ padding: 100 }}>
    {string}
    <br />
    <button onClick={() => setString(v => v?.split('').reverse().join(''))}>reverse</button>
    <br />
    <Child  handleStringChange={handleStringChange} />
    <Child  handleStringChange={handleStringChange} />
  </div>
}

export default Login

```

+ 子组件

```javascript
import React from "react"

const Child = ({ handleStringChange }: any) => {
    return <>
        <input onBlur={handleStringChange} />
    </>
}

export default React.memo(Child)

```
