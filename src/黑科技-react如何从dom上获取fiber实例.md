## 黑科技-react如何获取父元素

前一篇讲了如何从获取父元素实例方法，本篇来介绍下如何从dom上获取fiber实例。
```jsx

import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    };
  }
  add = () => {
    this.setState({
      a: this.state.a + 1
    });
  };
  render() {
    return (
      <div>
        <div>{this.state.a}</div>
        <Child />
      </div>
    );
  }
}

class Child extends React.Component {
  onClick = e => {
    let internalKey = Object.keys(e.target).filter(
      key => key.indexOf("__reactInternalInstance") >= 0
    );
    let fiber = e.target[internalKey];
    let childFiber = getParentClassComponent(fiber);
    let parentFiber = getParentClassComponent(childFiber);
    parentFiber.stateNode.add();
  };
  render() {
    return <button onClick={this.onClick}>点我调用父组件</button>;
  }
}

function getParentClassComponent(fiber) {
  let parent = fiber.return;
  if (parent.tag === 2) {
    return parent;
  } else {
    return getParentClassComponent(parent);
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



```


[在线调试](https://codesandbox.io/s/ll39p3yo8z)