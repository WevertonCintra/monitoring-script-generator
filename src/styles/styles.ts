import styled from 'styled-components'

type Props = {
  structure?: boolean
  text?: boolean
  sub?: boolean
}

export const Wrapper = styled.div`
  background: rgb(0, 221, 236);
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 20px;
`

export const ContainerLeft = styled.div`
  width: 100%;
  height: 100%;
  display: column;
  font-family: 'Neucha', cursive;
`

export const BlockTop = styled.div`
  height: 50%;
  display: flex;
  padding: 35px 0;
`

export const BlockTopLeft = styled.div`
  flex: 1;
  margin-right: 2.5px;
`

export const BlockTopRight = styled.div`
  flex: 1;
  margin-left: 2.5px;
`

export const BlockText = styled.div<Props>`
  display: ${props => props.text ? 'flex' : ''};
  justify-content: ${props => props.text ? 'center' : ''};
  align-items: ${props => props.text ? 'center' : ''};
  padding-left: ${props => props.text ? '' : '6px'};
  margin-top: 5px;
`

export const Text = styled.span<Props>`
  color: #fff;
  font-size: ${props => props.text ? '18px' : '25px'};
  font-weight: ${props => props.text ? '' : 'bold'};
  margin-left: ${props => props.sub ? '10px' : '0'};
`

export const Block = styled.div<Props>`
  background: ${props => props.structure ? 'rgb(0, 200, 230)' : ''};
  width: 100%;
  height: 88%;
  padding: 15px 15px 0 0;
  border: ${props => props.structure ? 'dashed 1px' : ''};
`

export const BlockResource = styled.div`
  width: 100%;
  height: 100%;
`

export const Resource = styled.div`
  background: #fad643;
  width: 175px;
  padding: 5px;
  margin: 5px;
  border-radius: 12px;
  border: 1.5px solid black;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.03);
  }
`

export const TextResource = styled.span`
  padding-left: 15px;
  font-size: 22px;
  font-weight: bold;
`

export const BlockDown = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: 50px;
`

export const BlockSelects = styled.div`
  width: 100%;
`

export const SelectLeft = styled.form`
  margin: 20px 10px 0 10px;
`

export const SelectRight = styled.form`
  margin: 20px 30px 0 0;
`

export const ContainerRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Neucha', cursive;
  font-size: 20px;
`

export const ContainerScript = styled.div`
  /* background: #ede7e3; */
  width: 90%;
  height: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed 1px ;
`