# react 概述

> React是一款构建用户界面的js库,如果你熟悉MVC的话react 就是 其中的`view`。可以简单的理解为是React将帮助我们将界面分为一个一个独立的小块，每一块都是一个组件，这些组件可以组合、嵌套、就完成了我们的整个页面。

**React是一个库，并不是一个框架，它只提供UI层面的解决方案。在实际开发中可能需要借助其他库，如： `Redux`、`react-router`等来协作完成任务。**


**React的特点**

* `虚拟DOM`: React也是以数据驱动的，每当数据发生变化的时候，React就会扫描整个虚拟DOM树，自动计算与上次的虚拟DOM的差异，然后针对需要改动的地方进行重新渲染。（这一点跟Vue即为类似）

* `组件化`: React将整个功能界面，进行UI分解，得到不同的组件，个组件独立封装，，整个UI就是由一个一个的小组件来实现的一个大组件，每个组件只关系自身的逻辑，彼此独立又存在一定的联系。（这一点跟Vue即为类似） 

* `单项数据流`: React的设计里面跟Vue的双向数据绑定不同，采用的是单项数据流（从父节点传递到子节点）。


---------------------

# react下载

[Downloads](http://react-cn.github.io/react/downloads.html)

# 入门helloworld实例

**一、下载两个文件**

* 1.react.js： 实现React核心逻辑，且于具体的渲染引擎无关，从而可以跨平台公用。

* 2. react-dom.js：包含了具体的DOM渲染更新逻辑，以及服务端渲染的逻辑，这部分就是与浏览器相关的部分了。

**二、引入这两个文件**

```html
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
  <script>
    //  React.createClass 注册一个组件类
    var helloworldComponent = React.createClass({
      render: function() {
        // 通过React.createElement创建html内容
        return React.createElement('h1', null, 'helloworld');
      }
    })

    // ReactDOM.render 用于将模板转换为html语言，并插入dom节点
    ReactDOM.render(
      React.createElement(helloworldComponent, null),
      document.getElementById('app')
    )
  </script>
</body>
</html>
```

# jsx

```js
const element = <h1>Hello, world!</h1>;
```

> 这一段看起来怪怪的标签语法既不是html，也不是模板字符串，它被成为是 `jsx`。 这事一种js的扩展语法，我们推荐使用jsx来描述用户界面。

## jsx的基本使用方法

**javascript表达式**


```html
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
      // 【1】 这里如果使用babel转换，必须设置 type = "text/babel"
      function formatName(user) {
        return user.firstName + ' ' + user.lastName;
      }
      
      const user = {
        firstName: 'Harper',
        lastName: 'Perez'
      };
      // jsx
      const element = (
        <h1>
          Hello, {formatName(user)}!
        </h1>
      );
      
      ReactDOM.render(
        element,
        document.getElementById('app')
      );
    </script>
</body>
</html>
```
```js
var HelloComponent =React.createClass({
    render:function(){
        return <h1>Hello {this.props.name?this.props.name:'world'}</h1>;
    }
});
 
ReactDOM.render(
    <HelloComponent name="jspang"/>,
    document.getElementById('reactContainer')
)
```

你可以任意地在 `JSX `当中使用 `JavaScript 表达式`，在` JSX `当中的表达式要包含在`大括号里`。

例如 `2 + 2`， `user.firstName`， 以及 `formatName(user)` 都是可以使用的。

**jsx其实也是一种js表达式**

> 这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以：

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```


**jsx属性**

* 可以使用双引号来定义以字符串位置的属性

```js
const element = (<h2 tabIndex="0">hello</h2>)
```

* 可以使用大括号来定义javascript表达式为值的属性

```js
const element = (<img src={user.avatorUrl} />)
```

**JSX 嵌套**

如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 就好像 XML/HTML 一样：

```js
const element = (<img src={user.avatorUrl} />)
```

标签的嵌套

```js
const element = (<div>
  <h1>hhhh</h1>
  <p>pppppppppppp</p>
<div/>);
```

> 因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。例如，class 变成了 className，而 tabindex 则对应着 tabIndex。


**JSX 防注入攻击**

```
React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
```

**JSX 代表 Objects**

```js
// jsx语法
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
//  Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'hello,world!'
)
```

* React.createElement() 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：

```js
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```
React 通过读取这些对象来构建 DOM 并保持数据内容一致。



**JSX进阶**

在循环渲染中，新版本的React需要使用key，如果没有key虽然会出来效果，但是控制台会包错。key的作用是生成虚拟DOM时，需要使用key来进行标记,DOM更新时进行比较。

```html
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
    // 循环遍历
    let names = ['JSPang','技术胖','React']; 
    var HelloComponent = React.createClass({ 
      render:function(){ 
        return <div>
                { 
                  names.map(function(name){ 
                    return <div key={name}>Hello,{name}!</div>
                  }) 
                }
            </div>
    }});

    ReactDOM.render(
      <HelloComponent/>, 
      document.getElementById('app') 
    )

  </script>
</body>

</html>
```

```html
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
    // 循环遍历
    let names = [
      <h1 key="zjj">zjj</h1>,
      <h1 key="meils">meils</h1>,
      <h1 key="zmf">zmf</h1>
    ]; 
   
    ReactDOM.render(
      <div>{names}</div>,
      document.getElementById('app') 
    )

  </script>
</body>

</html>
```

# 元素渲染

> 元素是构成react应用的最小单位。

```js
const element = <h1>Hello, world</h1>;
```

> 与浏览器DOM元素不同，react元素其实就是一个一个的对象，ReactDOM确保浏览器DOM与react元素保持一致。（元素其实就是虚拟DOM树，类型仍是一个对象，是DOM树的一种抽象形式，ReactDOM会将其解释渲染为真正的浏览器DOM元素）


**将元素渲染到 DOM 中**

```html
<div id="root"></div>
```

首先我们会在页面中添加一个根节点`root`。要将元素渲染进根dom节点中，就需要使用`ReactDOM.render()`来将其渲染进去。

```js
<div id="app"></div>

<script type="text/babel">
  ReactDOM.render(
  <h1>hello world</h1>, document.getElementById("app") )
</script>
```

**更新元素渲染**

> 根据我们现阶段了解的有关 React 知识，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法

```html
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
    function tick () {
      var element = (
        <div>
          <h1>helloworld</h1>
          <p>it is now {new Date().toLocaleTimeString()}</p>
        </div>
      );
      ReactDOM.render(
        element,
        document.getElementById('app')
      );
    }

    setInterval(tick, 1000);
  </script>
</body>
</html>
```

>在实际生产开发中，大多数React应用只会调用一次 ReactDOM.render() 。在下一个章节中我们将会详细介绍 有状态组件 实现 DOM 更新方式。

**React 只会更新必要的部分**


React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

![](https://doc.react-china.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

# 组件 & prop