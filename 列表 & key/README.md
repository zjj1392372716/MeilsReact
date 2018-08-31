## 列表渲染 && keys

**map()**

> map函数会对数组的每一个元素进行处理，然后返回一个新的数组

```js
const num = [1, 2, 4, 5];
const num1 = num.map((number) => {
  return number * 2;
})

console.log(num1); // [2, 4, 8, 10]
console.log(num); //  [1, 2, 4, 5]
```
**渲染多个组件**

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
   
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>{
    return <li>{number}</li>
  });

  ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('app')
  );
  </script>
</body>
</html>
```

**基础组件列表**

> 我们可以把前面的例子重构成一个组件。这个组件接收numbers数组作为参数，输出一个无序列表。

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
   
   function NumberList(props) {
    const numbers = props.numbers;
    // 【*】 如果不加key，将会有一个警告 a key should be provided for list items ,意思是当你创建一个元素时，必须包括一个特殊的 key 属性。
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('app')
  );
  </script>
</body>
</html>
```

**keys**

> Keys 可以在DOM中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key:

* 当元素没有确定的id时，你可以使用他的序列号索引index作为key

```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

**用keys提取组件**

> 比方说，如果你提取出一个ListItem组件，你应该把key保存在数组中的这个<ListItem />元素上，而不是放在ListItem组件中的<li>元素上。

```js
// 错误的示范
function ListItem(props) {
  const value = props.value;
  return (
    // 错啦！你不需要在这里指定key:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    //错啦！元素的key应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

```js
// 正确的示范
function ListItem(props) {
  // 对啦！这里不需要指定key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```


**元素的key在他的兄弟元素之间应该唯一**

> 数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键

