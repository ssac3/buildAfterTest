import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const CheckBox = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid black;
  border: ${(props) => (props.checked ? 'none' : 'solid 0.1rem #dddddd')};
  background: ${(props) => (props.checked ? 'skyblue' : 'white')};
  border-radius: 5px;
  transition: all 150ms;
  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippatch: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const style = {
  Container,
  Icon,
  CheckBox,
  HiddenCheckBox,
};