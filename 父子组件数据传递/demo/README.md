
### 父子组件之间的通信

**父组件传递给子组件**

> props

```js
// 父组件传递数据过去
<ComChild id={data.id} />

```

```js
// 子组件接收
{this.props.id}
```

**父组件传递给子组件**

> 通过调用props传过来的事件函数

```js
// 子组件触发父组件传递过来的事件函数
<input type="text" onChange={this.props.handleChange} />
```

```js
// 父组件先定义这个事件函数
handleChange(event) {
        this.setState({
            number: event.target.value
        })
    }

// 再传给子组件(注意this的绑定问题)

<ComChild id={data.id} handleChange={this.handleChange.bind(this)} />
```