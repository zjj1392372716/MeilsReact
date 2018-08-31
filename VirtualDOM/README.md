## 虚拟DOM

> react 的高速，离不开虚拟DOM结构

### JSX的背后 & 虚拟DOM到真实DOM

React开发人员编写组件的时候通常会使用一种被称为是JSX的语法。混合了HTML、js。但是浏览器只能识别js，因此必须将jsx转换为js。

```html
// 一段jsx代码
<div className="a">
  Content
</div>
```

将其转换为正经的js，其实就是一个带有参数的函数的调用。


```js
React.createElement(
  'div',
  {className: 'a'},
  'Content'
);
```

```
1. 第一个参数type：标签名称字符串
2. 第二个参数是一个包含所有元素属性的对象
3. 剩下的参数都是元素的子元素{children} ，文本也算是子元素
```

类比一下，如果有多个children呢？

```html
<div className="a">
  Content1
  <br />
  Conten2
</div>
```

```js
React.createElement(
  'div',
  {className: 'a'},
  'Content1',               // 1st child
  React.createElement('br'),// 2nd child
  'Conten2'                 // 3rd child
);
```

同样可以是
```
React.createElement(
  'div',
  { className: 'cn' },
  ['Content 1!', React.createElement('br'), 'Content 2!']
)
```

* 当然React 的厉害之处不仅是可以把HTML标签放入jsx使用，还可以使用我们自定义的组件

```js
function Table({ rows }) {
  return (
    <table>
      {rows.map(row => (
        <tr key={row.id}>
          <td>{row.title}</td>
        </tr>
      ))}
    </table>
  );
}
```

我们再声明一个组件的时候：

```html
<Table rows={rows}>
```

再浏览器内部，实际上是这样的：

```js
React.createElement(Table, {rows: rows});

// 第一个参数是一个引用，并不是html标签了
// 第二个参数为接收的props参数了
```

> 我们通过jsx、组件等得到了这些带参数的函数的调用，那么又是如何组成整个页面的DOM的呢？

**当我们再调用`ReactDOM.render`方法的时候，也就调用了`React.createElement()``,返回一个js对象。**

```js
function Table({ rows }) { /* ... */ } // defining a component

// rendering a component
ReactDOM.render(
  React.createElement(Table, { rows: rows }), // "creating" a component
  document.getElementById('#root') // inserting it on a page
);

```

```js
{
  type: 'Table',
  props: {
    rows: rows
  }
}
```

**这个对象，再React的角度上其实就是虚拟DOM了，它们将在进一步的渲染比较后，最终转换为真实的DOM**



```js
React.createElement(
  'div',
  { className: 'cn' },
  'Content 1!',
  'Content 2!',
);
```

```
{
  type: 'div',
  props: {
    className: 'a',
    children: [
      'Content1',
      'Content2'
    ]
  }
}
```


> 到这里我们就的到了虚拟dom对象了，React.render会按照一定的规则，将其转换为浏览器可以识别和展示的DOM

```
1. 如果type包含一个带有String类型的标签名称（tag name）—— 创建一个标签，附带上props下所有attributes。

2. 如果props下有children属性 —— 在父节点下，针对每个child重复以上过程。
```
-----------

### 认识虚拟DOM的好处

![](https://mc.qcloudimg.com/static/img/36d3aa5e1e519635ffe71ef4062be587/image.jpg)

传统 web app 和 DOM 直接交互，由App来控制DOM的构建和渲染、元素属性的读写、事件的注册和销毁等等。

当Dom操作变多之后：

![](https://mc.qcloudimg.com/static/img/3ab6045a2be4d7fa79eb43cadbac001a/image.jpg)

React的虚拟DOM和单项数据流就能很好的解决这个问题。

![](https://mc.qcloudimg.com/static/img/7e32f95b1620df34a9a77b7a6534f9b5/image.jpg)

虚拟DOM则是在DOM的基础上建立了一个抽象层，我们对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到DOM中。

> 使用虚拟DOM最突出的一点就是，她能改善性能，使得其速度更快，性能更优

我们都知道DOM慢，渲染一个空的DIV，需要生成很多的属性，但是如果是虚拟DOM，那么将会缩短时间。**所以说减少不必要的重排重绘以及DOM读写能够对页面渲染性能有大幅提升。**

![](https://mc.qcloudimg.com/static/img/f5f136d703ee9b6b858323815ad23b44/image.jpg)

> 分析上图，当我们的数据发生变化的时候，对新旧的虚拟DOM通过diff算法进行比较，我们就能找到更新和改变的地方，然后只更新变动的那一块。



**`React`会在内存中维护一个`虚拟DOM树`，当我们对这个树进行读或写的时候，实际上是对虚拟DOM进行的。当数据变化时，然后`React`会自动更新虚拟DOM，然后拿新的虚拟DOM和旧的虚拟DOM进行对比，找到有变更的部分，得出一个`Patch`，然后将这个`Patch`放到一个队列里，最终批量更新这些Patch到DOM中。**

---------------

### 组件的变更和重新渲染

**场景1 `type`是一个字符串，type在通话中保持不变，`props`也没有改变。**

```
// before update
{ type: 'div', props: { className: 'cn' } }

// after update
{ type: 'div', props: { className: 'cn' } }
```
这是最简单的情况：DOM保持不变。

**场景2：type仍然是相同的字符串，props是不同的。**

```
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'div', props: { className: 'cnn' } }
```
type仍然代表HTML元素，React知道如何通过标准DOM API调用来更改元素的属性，而无需从DOM树中删除一个节点。


**场景3：type已更改为不同的String或从String组件。**

```
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'span', props: { className: 'cn' } }
```

React看到的type是不同的，它甚至不会尝试更新我们的节点：old元素将和它的所有子节点一起被删除（unmounted卸载）.(这种情况很少发生);


**场景4：type是一个component。**

```
// before update:
{ type: Table, props: { rows: rows } }

// after update:
{ type: Table, props: { rows: rows } }
```

如果type是对函数或类的引用（即常规的React组件），并且我们启动了tree diff的过程，则React每次都会去检查组件的内部逻辑，以确保render返回的值不会改变（类似对副作用的预防措施）。对树中的每个组件进行遍历和扫描 —— 是的，在复杂的渲染场景下，成本可能会非常昂贵！

###  Diff算法解析

> 在React中，构建UI界面的思路是由当前状态决定界面。前后两个状态就对应两套界面，然后由React来比较两个界面的区别，这就需要对DOM树进行Diff算法分析。

即给定任意两棵树，找到最少的转换步骤。但是标准的的`Diff`算法复杂度需要`O(n^3)`，这显然无法满足性能要求。而Facebook工程师却做到了，使用了`虚拟DOM`技术后，使得`Diff`算法复杂度直接降低到`O(n)`.

**不同节点类型的比较**

```
分为两种情况：
（1）节点类型不同 
（2）节点类型相同，但是属性不同
```

**1、节点类型不同**

当树中的同一位置前后输出了不同的节点，React直接删除原来的节点，然后创立新的节点，并插入。

```
renderA: <div />
renderB: <span />
=> [removeNode <div />], [insertNode <span />]
```

> 删除节点意味着彻底销毁该节点，而不是再后续的比较中再去看是否有另外一个节点等同于该删除的节点。如果该删除的节点之下有子节点，那么这些子节点也会被完全删除，它们也不会用于后面的比较。这也是算法复杂能够降低到O（n）的原因。


* 同样用在自定义组件中也类似

```
renderA: <Header />
renderB: <Content />
=> [removeNode <Header />], [insertNode <Content />]
```

> 也是简单的销毁第一个组件，而把新创建的组件加上去。这正是应用了第一个假设，不同的组件一般会产生不一样的DOM结构，与其浪费时间去比较它们基本上不会等价的DOM结构，还不如完全创建一个新的组件加上去。


**由这一React对不同类型的节点的处理逻辑我们很容易得到推论，那就是React的DOM Diff算法实际上只会对树进行逐层比较，如下所述。**

React中，树的算法其实非常简单，那就是两棵树只会对同一层次的节点进行比较

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909000.png)

React只会对相同颜色的框内的DOM节点进行比较，即相同父节点下的所有子节点，当发现节点已经被删除，则该节点及其子节点也会被完全删除，不会用进一步比较。这样只需对书进行一次遍历就能完成整个树的遍历。（这也是复杂度比较低的原因）


* 例如： 

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909001.png)

因为React只考虑同层节点的变化，不同层节点，只需要简单的创建和删除就可以，当发现A节点删除了，就直接销毁A，发现D下多了A，就创建A，放到D下面，再创建A的子节点放到A的下面。

```js
A.destroy();
A = new A();
A.append(new B());
A.append(new C());
D.append(A);
```

**由DOM Diff算法理解组件的生命周期**


[demo演示](https://supnate.github.io/react-dom-diff/index.html)


```
constructor: 构造函数，组件被创建时执行；
componentDidMount: 当组件添加到DOM树之后执行；
componentWillUnmount: 当组件从DOM树中移除之后执行，在React中可以认为组件被销毁；
componentDidUpdate: 当组件更新时执行。
```

* 例1：

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909002.png)

```
C will unmount
C is created
B is updated.
A is updated.
C did mount.
D is updated.
R is updated.
```


**2、相同类型，不同属性比较**

例如：

```js
renderA: <div id="before" />
renderB: <div id="after" />
=> [replaceAttribute id "after"]
```
React会调用API对属性进行重设从而实现节点的转换。

```js
renderA: <div style={{color: 'red'}} />
renderB: <div style={{fontWeight: 'bold'}} />
=> [removeStyle color], [addStyle font-weight 'bold']
```
虚拟DOM的style属性稍有不同，其值并不是一个简单字符串而必须为一个对象.


**列表节点的比较**

> 上面介绍了对于不在同一层的节点的比较，即使它们完全一样，也会销毁并重新创建。那么当它们在同一层时，又是如何处理的呢？

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909003.png)

我们大概都遇到过这个警告吧，意思就是再列表渲染的时候，我们并没有为其添加key值。列表节点的操作通常包括添加、删除和排序。

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909004.png)

* 如果没有标识

如果每个节点都没有唯一的标识，React无法识别每一个节点，那么更新过程会很低效，即，将C更新成F，D更新成C，E更新成D，最后再插入一个E节点。效果如下图所示：

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909005.png)

可以看到，React会逐个对节点进行更新，转换到目标节点。而最后插入新的节点E，涉及到的DOM操作非常多。而如果给每个节点唯一的标识（key），那么React能够找到正确的位置去插入新的节点，入下图所示

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909006.png)

* 树型的例子

![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909007.png)

如果未提供key，那么React认为B和C之后的对应位置组件类型不同，因此完全删除后重建，控制台输出如下：

```js
B is unmount.
C is unmount.
C is created.
B is created.
A is updated.
R is updated.
```

而如果提供了key，如下面的代码：

```js
C is updated.
B is updated.
A is updated.
R is updated.
```

可以看到，对于列表节点提供唯一的key属性可以帮助React定位到正确的节点进行比较，从而大幅减少DOM操作次数，提高了性能。




