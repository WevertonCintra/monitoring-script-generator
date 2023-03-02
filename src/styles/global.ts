import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    /* scrollbar-width: thin; */
    /* overflow-x: hidden; */
  }
/*   
  ::-webkit-scrollbar {
    height: 12px;
    width: 5px;
    background: #000;
  }

  ::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  } */
`
