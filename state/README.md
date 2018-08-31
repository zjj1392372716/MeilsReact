# state & 生命周期

## state

> 我们之前实现的时钟，实现方式是每个一秒进行一次渲染dom，但是这种方法并不合理。我们想要通过一种状态来控制组件，实现更优的渲染。

**state**

**React 把组件看成是一个状态机`（State Machines）`。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。**

> 原生方法

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../react/react.js"></script>
  <script src="../react/react-dom.js"></script>
  <script src="https://cdn.bootcss.com/babel-core/5.8.35/browser.js"></script>
  <script type="text/babel">
    // 原生的方法
    var InputBoxCom = React.createClass({
      // getInitialState函数必须有返回值，可以是null,false,一个对象。
      getInitialState: function() {
        return {enable: false}
      },
      handleClick: function(event) {
        this.setState({enable: !this.state.enable})
      },
      render: function() {
        return (
          <p>
            <input type="text" disabled={this.state.enable} />
            <button type="button" onClick={this.handleClick}>点击更改文本框状态</button>
          </p>
        )
      }
    });

    ReactDOM.render(
      <InputBoxCom />,
      document.getElementById('app')
    )
  </script>
</body>
</html>
```

> 类

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../react/react.js"></script>
  <script src="../react/react-dom.js"></script>
  <script src="https://cdn.bootcss.com/babel-core/5.8.35/browser.js"></script>
  <script type="text/babel">
    class Clock extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          date: new Date()
        }
      };

      render() {
        return (
          <div className="box">
            <h1>hello component!</h1>
            <h2>it is {this.state.date.toLocaleTimeString()}</h2>
          </div>
        )
      }
    };

    ReactDOM.render(
      <Clock />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

**props与state的区别**

```
props不能被其所在的组件修改，从父组件传递进来的属性不会在组件内部更改；
state只能在所在组件内部更改，或在外部调用setState函数对状态进行间接修改。
```

**render成员函数**

```
首先说render是一个函数，它对于组件来说，render成员函数是必需的。render函数的主要流程是检测this.props和this.state,再返回一个单一组件实例。
render函数应该是纯粹的，也就是说，在render函数内不应该修改组件state，不读写DOM信息，也不与浏览器交互。如果需要交互，应该在生命周期中进行交互。
```


## 生命周期

过程中涉及三个主要的动作术语：

`mounting`:表示正在挂接虚拟DOM到真实DOM。每当Clock组件第一次加载到DOM中的时候，我们都想生成定时器，
`updating`:表示正在被重新渲染。
`unmounting`:表示正在将虚拟DOM移除真实DOM。每当Clock生成的这个DOM被移除的时候，我们也会想要清除定时器，


```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../react/react.js"></script>
  <script src="../react/react-dom.js"></script>
  <script src="https://cdn.bootcss.com/babel-core/5.8.35/browser.js"></script>
  <script type="text/babel">
    class Add extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          count: 1
        }
      }
      // 组件将要绑定
      componentWillMount () {
        console.log('1...componentWillMount');
      }
      // 组件绑定完成
      componentDidMount () {
        console.log('2...componentDidMount');
      }
      // 组件将要更新
      componentWillUpdate () {
        console.log('3...componentWillUpdate');
      }
      // 组件更新完毕
      componentDidUpdate () {
        console.log('4...componentDidUpdate');
      }

      // 渲染函数
      render() {
        return (
          <div className="box">
            {this.state.count}
            <button>add</button>
          </div>
        )
      }
    };

    ReactDOM.render(
      <Add />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

* 再来一个例子

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../react/react.js"></script>
  <script src="../react/react-dom.js"></script>
  <script src="https://cdn.bootcss.com/babel-core/5.8.35/browser.js"></script>
  <script type="text/babel">
    class Clock extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          date: new Date()
        }
      }

      componentWillMount() {
        this.timter = setInterval(() => {
          this.tick()
        },1000)
      }

      componentDidMount() {
        clearInterval(this.timer)
      }
      tick() {
        this.setState({
          date: new Date()
        });
      }
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        )
      }

    }

    ReactDOM.render(
      <Clock />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

```
1. 当 <Clock /> 被传入 ReactDOM.render() 时, React 会调用 Clock组件的构造函数。 因为 Clock 要显示的是当前时间，所以它将使用包含当前时间的对象来初始化 this.state 。我们稍后会更新此状态。
2. 然后 React 调用了 Clock 组件的 render() 方法。 React 从该方法返回内容中得到要显示在屏幕上的内容。然后，React 然后更新 DOM 以匹配 Clock 的渲染输出。
3. 当 Clock 输出被插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。在该方法中，Clock 组件请求浏览器设置一个定时器来一次调用 tick()。
4. 浏览器会每隔一秒调用一次 tick()方法。在该方法中， Clock 组件通过 setState() 方法并传递一个包含当前时间的对象来安排一个 UI 的更新。通过 setState(), React 得知了组件 state(状态)的变化, 随即再次调用 render() 方法，获取了当前应该显示的内容。 这次，render() 方法中的 this.state.date 的值已经发生了改变， 从而，其输出的内容也随之改变。React 于是据此对 DOM 进行更新。
5. 如果通过其他操作将 Clock 组件从 DOM 中移除了, React 会调用 componentWillUnmount() 生命周期钩子, 所以计时器也会被停止。
```


## 正确使用状态State

**1.不要直接更新状态**

```
this.state.comment = 'hello';
```

应当使用`setState()`

```
this.setState({
  comment: 'hello
})
```

* 构造函数是唯一初始化this.state的地方

**2.状态可能是异步的**

`this.state` `this.props`可能是异步的，我们不能依靠她们的值来计算下一个状态。

```
// 例如： 此代码可能无法计算新的值
this.setState({
  counter: this.state.count + this.props.increament
})
```

* 为了解决这个问题，我们应该使用setState的第二种形式来处理。

```
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.insertment 
  }
})
```

```
// 使用箭头函数
this.setState((prevState, props) => ({
  counter: prevState.counter + props.insertment
}))
```
**3.状态更新合并**

```
// 例如： 你的状态可能包含一些独立的变量
constructor(props) {
  super(props);
  this.state = { 
    posts: [],
    comments: []
  };
}
```

```
// 我们可以独立的更新

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```
> 这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。

**3.数据自顶向下流动**

父子组件都不知道某一个组件是否有状态，并且它们不应该关心某一个组件的状态，因为每一个状态除了拥有它并且设置它的组件之外，其他的组件是无法访问到的。

* 组件可以选择将其状态作为属性传递给其子组件：

```
<FormattedDate date={this.state.date} />
```

**这通常被称为是`自顶向下`或者是`单项数据流`.任何状态始终由某一个特定的组件所拥有，并且改状态导出的任何数据只能影响树中下方的组件**

如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

**4.组件是真正隔离的**

```
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

每一个clock都会建立自己的定时器，并独立的更新。



