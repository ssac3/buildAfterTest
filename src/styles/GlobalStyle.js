import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle` 
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        overflow:auto;
        min-width:1400px;
        /* min-height:800px; */
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        background-color: #CFCFCF;
        color: #000;
        height:100vh;
    }
    
    #root{
      height: 100%;
    }
    
    p{
      margin:0;
    }
    
    input, button {
        background-color: transparent;
        border: none;
        outline: none;
    }
    
    h2{
      font-weight: bold;
      font-size: 20px;
    }
    
    h3{
      font-weight: bold;
      font-size: 16px;
      color: #797979;
      margin:0;
    }
    
    h4{
      font-weight: normal;
      font-size: 15px;
      color: #797979;
    }
    
    
`;
