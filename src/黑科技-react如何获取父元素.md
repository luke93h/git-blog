## 黑科技-react如何获取父元素

前段时间再学习react的源码，解决了自己的一些疑惑，也发现了一些黑科技操作方法，此处分享给大家。

通常父组件获得子组件的实例可以通过ref获取，那子组件如何获取父组件的实例呢？

这里提供一种黑科技思路供大家玩耍
```jsx
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      a: 1
    }
  }
  add = () => {
    this.setState({
      a: this.state.a + 1
    })
  }
  render() {
    return <div>
      <div>{this.state.a}</div>
      <Child />
    </div>
  }
}

class Child extends React.Component{
  onClick = () => {
    let parent = this._reactInternalFiber.return.return.stateNode
    parent.add()
  }
  render(){
    return <button onClick={this.onClick}>点我调用父组件</button>
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

此处需要注意的是：
1. this._reactInternalFiber返回的是fiber对象
2. Child的return是div，而child的return的return才是App
3. 通过fiber.stateNode获取组件实例

[在线调试](https://codesandbox.io/s/ll39p3yo8z)