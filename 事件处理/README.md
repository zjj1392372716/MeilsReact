## 事件处理

> React元素的事件，和DOM事件处理有着相似之处，但是也有着不同之处。


* React事件绑定属性的命名采用驼峰命名
* 如果使用React你需要使用jsx语法，就需要传入一个函数作为事件处理函数，而不是像HTML中传入一个字符串

```
// 传统的HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

```
// React中
<button onClick={activeClass}>
点击
</button>
```

**另外React中不能使用`return false`来阻止默认行为，你必须明确使用preventDefault.**

```
function ActionClick () {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.')
  }

  return (
    <a href="#" onClick={handleClick}><点击我/a>
  )
}
```

> 使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器

* 当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。

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
    class Toggle extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          isToggle: false
        }

        this.handleClick = this.handleClick.bind(this)
      }

      handleClick () {
        this.setState((prevState) => {
          return {isToggle: !prevState.isToggle}
        })
        /**
          类的方法默认是不会绑定 this 的。
          如果你忘记绑定 this.handleClick 并把它传入 onClick, 
          当你调用这个函数的时候 this 的值会是 undefined。

          这就是为什么会报错setState未定义的原因了
        */
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.isToggle ? 'ON' : 'OFF'}
          </button>
        )
      }
    }


    ReactDOM.render(
      <Toggle />,
      document.getElementById('app')
    )
  </script>
</body>
</html>
```

> 类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

**除了bind之外还有两种方法**

* 一、属性初始化器语法, ES7的属性初始化语法（ property initializers ）

这个语法在 Create React App 中默认开启。
```
//代码4
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: 0};
  }

  handleClick = () => {
    this.setState({
      number: ++this.state.number
    });
  }
  
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={this.handleClick}>
          Click
        </button>
      </div>
    );
  }
}

```

> 这样一来，再也不用手动绑定this了。但是你需要知道，这个特性还处于试验阶段，默认是不支持的。如果你是使用官方脚手架Create React App 创建的应用，那么这个特性是默认支持的。你也可以自行在项目中引入babel的[transform-class-properties](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)插件获取这个特性支持。


* 二、回调函数中使用 箭头函数：

```
//代码5
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
    class Toggle extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          isToggle: false
        }
      }

      handleClick (){
        this.setState((prevState) => {
          return {isToggle: !prevState.isToggle}
        })
      }

      render() {
        return (
          <button onClick={(e) => this.handleClick(e)}>
            {this.state.isToggle ? 'ON' : 'OFF'}
          </button>
        )
      }
    }


    ReactDOM.render(
      <Toggle />,
      document.getElementById('app')
    )
  </script>
</body>
</html>

```

> 使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常【建议】【在构造函数中绑定或使用属性初始化器语法来避免这类性能问题】。

**向事件处理程序传递参数**

* `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`

```
// 1
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
    class Toggle extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          isToggle: false
        }
      }
      
      handleClick (id, e){
        console.log(id)
        this.setState((prevState) => {
          return {isToggle: !prevState.isToggle}
        })
      }

      render() {
        return (
          <button onClick={(e) => this.handleClick(1, e)}>
            {this.state.isToggle ? 'ON' : 'OFF'}
          </button>
        )
      }
    }


    ReactDOM.render(
      <Toggle />,
      document.getElementById('app')
    )
  </script>
</body>
</html>
```

* `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

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
    class Toggle extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          isToggle: false
        }
      }
      
      handleClick (id){
        console.log(id)
        this.setState((prevState) => {
          return {isToggle: !prevState.isToggle}
        })
      }

      render() {
        return (
          <button onClick={this.handleClick.bind(this, 1)}>
            {this.state.isToggle ? 'ON' : 'OFF'}
          </button>
        )
      }
    }


    ReactDOM.render(
      <Toggle />,
      document.getElementById('app')
    )
  </script>
</body>
</html>
```