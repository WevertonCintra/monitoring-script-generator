import styled from 'styled-components'

type Props = {
  marginLeft?: boolean
  marginRight?: boolean
  text?: boolean
  structure?: boolean
}

export const Wrapper = styled.div`
  background: rgb(0, 221, 236);
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 50px;
  font-family: 'Neucha', cursive;
`

/**
 * TEXT
 */

export const Text = styled.span<Props>`
  color: ${props => props.text ? '#fff' : '#000'};
  padding-left: ${props => props.text ? '0px' : '15px'};
  font-size: ${props => props.text ? '25px' : '20px'};
  font-weight: bold;
`

/**
 * CONTAINER LEFT
 */

export const ContainerLeft = styled.div`
  width: 100%;
  height: 100%;
  display: column;
`

/**
 * CONTAINER BLOCK TOP
 */

export const ContainerBlockTop = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
`

export const BlockTop = styled.div<Props>`
  flex: 1;
  margin-right: ${props => props.marginRight && '5px'};
  margin-left: ${props => props.marginLeft && '5px'};
`

export const Block = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`

export const BlockText = styled.div`
  height: 20%;
`

export const BlockResource = styled.div`
  height: 80%;
`

export const Resource = styled.div`
  background: #fad643;
  width: 175px;
  padding: 5px;
  border-radius: 12px;
  border: 1.5px solid black;
  transition: 0.2s;

  &+& {
    margin-top: 5px;
  }

  &:hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.03);
  }
`

export const BlockSelects = styled.div`
  width: 100%;
`

/**
 * CONTAINER BLOCK CENTER
 */

export const ContainerBlockCenter = styled.div`
  background: rgb(0, 200, 230);
  width: 100%;
  height: 50%;
  display: flex;
  border: 1px dashed;
`

export const BlockCenterItems = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

export const BlockCenterText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

/**
 * CONTAINER CONTAINER BOTTOM
 */

export const ContainerBlockBottom = styled.div`
  width: 100%;
  height: 10%;  
`

export const Ol = styled.ol`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 15px;
`

export const Li = styled.li`
  color: #fff;
  font-size: 15px;
`

/**
 * CONTAINER RIGHT
 */

export const ContainerRight = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
`

export const ContainerScript = styled.div`
  width: 100%;
  height: 90%;
  border: 1px dashed;
`

export const ContainerScriptText = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

export const ContainerSyntaxHighlighter = styled.div`
  width: 100%; 
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

/**
 * BUTTONS
 */

export const ContainerButtons = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export const Form = styled.form``

export const GenerateScriptButton = styled.button`
  background: #fad643;
  color: #000;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  border: 1px solid #000;
  font-size: 1.3rem;
  font-weight: bold;
  transition: filter 0.2s;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    filter: ${props => props.disabled ? 'brightness(0.9)' : ''};
  }
`

export const DownloadButton = styled.button`
  background: transparent;
  color: #FF0037;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  border: 1.2px solid red;
  font-size: 1.3rem;
  font-weight: bold;
  transition: filter 0.2s;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background: ${props => props.disabled ? '' : '#FF0037'};
    color: ${props => props.disabled ? '' : '#fff'};
    filter: ${props => props.disabled ? '' : 'brightness(0.9)'};
  }
`