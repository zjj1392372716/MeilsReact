## 表单

> React中表单组件不同于其他组件，因为它们会缓存用户的录入信息和录入状态，由此也带来了React对表单处理的一些特殊性。

### 受控组件

**什么是受控组件?**

1. 让我们在每次 onChange 事件发生时控制它们的数据，而不是一次性地获取表单数据（例如用户点提交按钮时）,“被控制“ 的表单数据保存在 state 中.

2. 受控组件的展示数据是其父组件通过 props 传递下来的。

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
    class FormName extends React.Component{
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {value: ''};
      }

      // 通过state来保存表单数据
      handleChange (e) {
        this.setState({
          value: e.target.value
        })
      }
      
      handleSubmit(e) {
        alert('submit...'+ this.state.value);
        //阻止默认跳转的事件
        e.preventDefault();
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
      }
    }

    ReactDOM.render(
      <FormName />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

> 使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。例如，我们如果想限制输入全部是大写字母，我们可以将handleChange 写为如下：

```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

### textarea

> 在React中，<textarea>会用value属性来代替。这样的话，表单中的<textarea> 非常类似于使用单行输入的表单

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
    class FormName extends React.Component{
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {value: 'Please write an essay about your favorite DOM element.'};
      }

      // 通过state来保存表单数据
      handleChange (e) {
        this.setState({
          value: e.target.value
        })
      }
      
      handleSubmit(e) {
        alert('submit...'+ this.state.value);
        //阻止默认跳转的事件
        e.preventDefault();
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <textarea name="text"  cols="30" rows="10" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
      }
    }

    ReactDOM.render(
      <FormName />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

* 注意this.state.value是在构造函数中初始化，这样文本区域就能获取到其中的文本。

### Select

> 在React中，会在根select标签上而不是在当前的option属性上使用value属性。

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
    class FormName extends React.Component{
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {value: '2'};
      }

      // 通过state来保存表单数据
      handleChange (e) {
        this.setState({
          value: e.target.value
        })
      }
      
      handleSubmit(e) {
        alert('submit...'+ this.state.value);
        //阻止默认跳转的事件
        e.preventDefault();
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              请选择：
              <select name="select" value={this.state.value} onChange={this.handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
      }
    }

    ReactDOM.render(
      <FormName />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

**总之，`<input type="text">`, `<textarea>`, 和 `<select>` 都十分类似 - 他们都通过传入一个value属性来实现对组件的控制。**

### 多个输入的解决方法

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
    class FormName extends React.Component{
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          isGoing: false,
          numberOf: 2
        };
      }



      // 通过state来保存表单数据
      handleChange (e) {
        const target = e.target;

        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name
        this.setState({
          [name]: value
        })
      }
      
      handleSubmit(e) {
        alert('submit...'+ this.state.isGoing + '---' + this.state.numberOf);
        //阻止默认跳转的事件
        e.preventDefault();
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              isGoing:
              <input type="checkbox"
                     name="isGoing"
                     checked={this.state.isGoing}
                     onChange={this.handleChange}/>
            </label>
            <label htmlFor="">
              Number of :
              <input type="number" 
                     name="numberOf"
                     value={this.state.numberOf}
                     onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
      }
    }

    ReactDOM.render(
      <FormName />,
      document.getElementById('app')
    );
  </script>
</body>
</html>
```

* 使用ES6当中的计算属性名语法

```js
this.setState({
  [name]: value
});

// 相当于

var partialState = {};
partialState[name] = value;
this.setState(partialState);
```