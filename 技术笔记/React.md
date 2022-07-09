## 注意

1. 此处使用了 onClick={() => console.log('click')} 的方式向 onClick 这个 prop 传入一个函数。 React 将在单击时调用此函数。但很多人经常忘记编写 () =>，而写成了 onClick={console.log('click')}，这种常见的错误会导致**每次这个组件渲染的时候都会触发控制台输出**。
   1. 所以使用函数的时候不是onClick={buttonClick(data)}，而是onClick={() => buttonClick(data)}，**前边的写法会直接出发点击事件**
2. 在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。
3. 在组件里的return中，当使用多行时，为什么要用小括号()包起来
   1. **如果不加小括号，js会自动在return后边添加;**
4. **不可变性在 React 中非常重要**
   1. 不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。**总的来说就是由开发自己决定何时重新渲染组件**

      ```js
      handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});  // 此时重新渲染
      }
      ```

5. react 不能直接更改state，要用setState
6. 不能通过 this.props.key 来获取 key。React 会通过 key 来自动判断哪些组件需要更新。组件是不能访问到它的 key 的。
7. State 的更新可能是异步的。**出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。**

      ```js
      // 此代码可能会无法更新计数器
      this.setState({
      counter: this.state.counter + this.props.increment,
      });
      ```

      要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

      ```
      ```



