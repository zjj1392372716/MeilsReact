# 组件和props

> 组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

`react`中的组件就像是一个函数，他可以接收一个`props对象`，并返回一个`React`元素

**函数定义/类定义组件**

* 函数定义组件

```js
function welcome(props) {
  return <div>hello {props.name}</div>;
}
```
该函数返回一个react组件，它接收一个对象props，并返回一个React元素，我们将这种类型的组件成为是`函数定义组件`，是因为字面上看来，他就是一个javascript函数。

* 类组件定义

```js
class welcome extends React.Component{
  render() {
    return <div>hello {this.props.name}</div>;
  }
}
```
使用 ES6 class 来定义一个组件:

> 上面两种方法定义的组件是相同的。

**组件渲染**

我们之前遇到的react元素都是dom标签。然而react元素也可以是自定义的组件：

```
const element = <Welcome name="zjj" />;
```

当时一个自定义组件的时候，它会将jsx属性转换为一个`props`对象传递给该组件。

```
function Welcome (props) {
  return <h1>hi, {props.name}</h1>;
}


const element = <Welcome name="zjj">

ReactDOM.render(
  element,
  document.getElementById('app')
);
```

> 回顾一下上段代码发生了什么

```
1. 我们对<Welcome name="Sara" />元素调用了ReactDOM.render()方法。
2. React将{name: 'Sara'}作为props传入并调用Welcome组件。
3. Welcome组件将<h1>Hello, Sara</h1>元素作为结果返回。
4. React DOM将DOM更新为<h1>Hello, Sara</h1>。
```

> 注意： 组件名称必须以大写字母开头。

**组合组件**

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
  //组合组件
    function Welcome (props) {
      return <h1>hi, {props.name}!</h1>;
    }

    function App() {
      return (
        <div>
          <Welcome name="Sara" />
          <Welcome name="Cahal" />
          <Welcome name="Edite" />
        </div>
      );
    }

    var element = <App />;
    ReactDOM.render(
      element,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

> 注意： 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。

**提取组件**

```js
// 一个Comment组件：（头像、名字、评论内容、时间）
    function Comment (props) {
      return (
        <div>
          <div className="comment">
            <img className="userinfo" src={props.author.avatorurl} alt={props.author.name} />
            <div className="avator">
              {props.author.name}
            </div>
          </div>
          <div className="comment-text">{props.text}</div>
          <div className="comment-date">{formatDate(props.date)}</div>
        </div>
      )
    }

    function formatDate(date) {
      return date.toLocaleDateString();
    }

    const comment = {
      date: new Date(),
      text: 'I hope you enjoy learning React!',
      author: {
        name: 'Hello Kitty',
        avatorurl: 'http://placekitten.com/g/64/64'
      }
    };

    ReactDOM.render(
      <Comment date={comment.date} text={comment.text} author={comment.author} />,
      document.getElementById('app')
    );
```

这个组件由于嵌套，变得难以被修改，可复用的部分也难以被复用。所以让我们从这个组件中提取出一些小组件。

* Avator组件

```js
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}
```
这样就成了

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />  //这里使用提取出来的组件
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

我们还可以继续提取

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
这样我们的组件就是

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```


**props的可读性**

> 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。props只是可读的。

```js
function withdraw(account, amount) {
  account.total -= amount;
}

// 不允许props被这种方式再组件中修改
```
