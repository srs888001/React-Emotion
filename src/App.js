
// ======>使用头文件方式(不建议)
// /** @jsx jsx */
// import { jsx } from '@emotion/core';

// function App() {
//   return <div css={{width: 200, height: 200, background: 'red'}}>App works</div>;
// }

// export default App;

// 2. ======>定义css
// import React from 'react';
// import { css } from '@emotion/core';

// // const style = css`
// //   width: 200px;
// //   height: 200px;
// //   background: red;
// // `;
// const style = css({
//   width: 200,
//   height: 200,
//   background: 'red',
// }); 

// function App() {
//   return <div css={ style }>App works</div>;
// }
// export default App;


// 3&4. ======>样式化组件
import React from 'react';
import { css, Global, keyframes, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: ${props => props.bgColor || 'skyblue'};
`;

// const Container = styled.div(props => ({
//   width: props.w || 1000,
//   background: 'red', 
//   // 居中
//   margin: '0 auto'
// }));
// ========》默认样式
const Container = styled.div({
  width: 1000,
  background: 'red', 
  // 居中
  margin: '0 auto'
}, props => ({
  width: props.w,
  background: props.bgColor, 
  margin: props.margin
}));


// 5. ======>给现有组件添加样式化
const Demo = ({ className }) => <div className={className}>Demo</div>

const NewDemo1 = styled(Demo)`
  color: red;
`;
const NewDemo2 = styled(Demo)({
  color: 'red',
});


// 6. ======>通过⽗组件设置⼦组件样式
// const Child = styled.div`
//   color: red
// `;
// const Parent = styled.div`
//   ${Child} {
//     color: green
//   }
// `;
const Child = styled.div({
  color: 'red'
})
const Parent = styled.div({
  [Child]: {
    color: 'green'
  }
})

// 7. ======>嵌套选择器 &   
// & 表示组件本身.
// & > span 代表当前组件下面的span标签(一层)
const ContainerSelector = styled.div`
  width: 100px;
  height: 100px;
  background: skyblue;
  color: pink;
  &:hover {
    background: pink;
  }
  & > span {
    color: yellow;
  }
`;

// 8. ======>as 属性
// 要使⽤组件中的样式, 但要更改呈现的元素, 可以使⽤ as 属性.
const AsButton = styled.button`
  color: red;
`;

// 9. ======>样式组合
// 在样式组合中, 后调⽤的样式优先级⾼于先调⽤的样式.
const combine1 = css`
  color: white;

`;  
const combine2 = css`
  color: red;
  background: black
`;  

// 10. =======>全局样式
const globalCss = css`
  body { 
    argin: 0;
  }
  a {
    text-decoration: none;
    color: blue;
  }
`;  

// 11. =======>关键帧动画
const move = keyframes`
  0% {
    background: skyblue;
    left: 0;
    top: 0;
  }
  100% {
    background: tomato;
    left: 600px;
    top: 300px;
  }
`;

const box = css`
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${move} 2s ease infinite;
`;


// 12. =======>主题
const primaryColor = props => css`
  color: ${props.colors.primary}
`

function App() {
  // w
  // 字符串需要添加px单位
  // 对象的话，就不需要添加px单位

  console.log('useTheme===>', useTheme());

  return <div>
    <Container w={1600}>
      <Button>我是按钮</Button>
    </Container>

    <NewDemo1></NewDemo1>
    <NewDemo2></NewDemo2>

    <Child>child</Child>
    <Parent><Child>parent-child</Child></Parent>

    <ContainerSelector>
      ContainerSelector
      <span>ContainerSelector-Span</span>    
    </ContainerSelector>

    <AsButton as="a" href="#">
      AsButton
    </AsButton>

    <div css={[combine1, combine2]}>
      combine css
    </div>

    <Global styles={globalCss}></Global>
    <a href='#'>全局样式 a 标签</a>

    <div css={box}> keyframes </div>

    <div css={primaryColor}> 主题用法1 </div>
    <div css={{color: useTheme().colors.primary}}> 主题用法2 </div>
  </div>;
}
export default App;
