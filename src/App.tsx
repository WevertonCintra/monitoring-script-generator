import { useState } from 'react'
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd'
import CreatableSelect from 'react-select/creatable'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import fileDownload from 'js-file-download'
import { GetIcon } from './utils/GetIcon'
import { Resources } from './utils/options/Resources'
import { Techs } from './utils/options/Techs'
import { Time } from './utils/options/Time'
import { GetNodeScript } from './utils/scripts/GetNodeScript'
import { GetPythonScript } from './utils/scripts/GetPythonScript'
import { GetBashScript } from './utils/scripts/GetBashScript'
import * as S from './styles/styles'

type Props = {
  value: number
  label: string
  type: string
  extension?: string
  loop?: number
}

export function App() {
  const [standardResources, setStandardResources] = useState<Props[]>(Resources)
  const [selectedResources, setSelectedResources] = useState<Props[]>([])
  // const [resource, setResource] = useState<string>('')
  const [tech, setTech] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [codeString, setCodeString] = useState<string>('')
  // const [totalItem, setTotalItem] = useState<number>(0)
  // const [isDisabled, setIsDisabled] = useState<boolean>(false)
  // const [generateScript, setGenerateScript] = useState<boolean>(false)

  // const handleDownload = () => {
  //   // fileDownload(JSON.stringify(script), `script.${tech}`)
  //   // setScripts([])
  // }

  // const handleGeneratorScript = () => {
  //   setGenerateScript(true)
  // }

  const handleChangeItem = (selectedItem: any) => {
    if (selectedItem?.type === 'tech' && selectedItem?.label !== tech) {
      setTech('')
      setTech(selectedItem?.extension)
    }

    if (selectedItem?.type === 'time' && selectedItem?.loop !== time) {
      console.log('aqui', selectedItem?.loop)
      setTime(0)
      setTime(selectedItem?.loop)
    }

    if (tech === 'js') {
      setCodeString(GetNodeScript({ resources: selectedResources, time }))
    }

    if (tech === 'py') {
      setCodeString(GetPythonScript({ resources: selectedResources, time }))
    }

    if (tech === 'bash') {
      setCodeString(GetBashScript({ resources: selectedResources, time }))
    }

    // setScripts([...scripts, selectedItem])

    // if (totalItem >= 3 ) {
      // setIsDisabled(true)
    // }
  }

  const onDragEnd = ({ source, destination }: DropResult) => {  
    if (!destination) {
      return
    } 
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let add
    let active = standardResources
    let complete = selectedResources

    if (source.droppableId === 'drag') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'drag') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    complete.map((c) => handleChangeItem(c))
    
    setSelectedResources(complete)
    setStandardResources(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.Wrapper>
        <S.ContainerLeft>
          <S.ContainerBlockTop>
            <S.BlockTop marginRight={true}>
              <S.Block>
                <S.BlockText>
                  <S.Text text={true}>RECURSOS</S.Text>
                </S.BlockText>

                <Droppable droppableId='drag'>
                  {(provided) => (
                    <S.BlockResource
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                    >
                      {standardResources?.map((resource, index) => (
                        <Draggable 
                          key={resource.value.toString()} 
                          draggableId={resource.value.toString()} 
                          index={index}
                        >
                          {(provided) => (
                            <S.Resource
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef} 
                            >
                              <S.Text text={false}>{GetIcon(resource.label)} {resource.label}</S.Text>
                            </S.Resource>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </S.BlockResource>
                  )}
                </Droppable>
              </S.Block>
            </S.BlockTop>

            <S.BlockTop>
              <S.BlockText>
                <S.Text text={true}>TECNOLOGIA</S.Text>
              </S.BlockText>

              <S.BlockSelects>
                <CreatableSelect
                  isClearable
                  options={Techs}
                  onChange={handleChangeItem}
                />
              </S.BlockSelects>
            </S.BlockTop>

            <S.BlockTop marginLeft={true}>
              <S.BlockText>
                <S.Text text={true}>INTERVALO</S.Text>
              </S.BlockText>

              <S.BlockSelects>
                <CreatableSelect
                  isClearable
                  options={Time}
                  onChange={handleChangeItem}
                />
              </S.BlockSelects>
            </S.BlockTop>
          </S.ContainerBlockTop>

          <S.ContainerBlockCenter>
            <Droppable droppableId='drops'>
              {(provided) => (
                <S.BlockCenterItems
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {selectedResources.length ? (selectedResources?.map((resource, index) => (
                    <Draggable key={resource.value.toString()} draggableId={resource.value.toString()} index={index}>
                      {(provided) => (
                        <S.Resource
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        > 
                          <S.Text text={false}>{GetIcon(resource.label)} {resource.label}</S.Text>
                        </S.Resource>
                      )}
                    </Draggable>
                  ))) : (
                    <S.BlockCenterText>
                      <S.Text>Arraste aqui o recursos para gerar os scripts</S.Text>
                    </S.BlockCenterText>
                  )}
                  {provided.placeholder}                    
                </S.BlockCenterItems>
              )}
            </Droppable>
          </S.ContainerBlockCenter>

          <S.ContainerBlockBottom>
            <S.Ol>
              <S.Li>Selecione os recursos</S.Li>
              <S.Li>Selecione a tecnologia</S.Li>
              <S.Li>Selecione o intervalo de execução</S.Li>
            </S.Ol>   
          </S.ContainerBlockBottom>
        </S.ContainerLeft>

        <S.ContainerRight>
          <S.ContainerScript>
            {codeString 
              ? (
                <S.ContainerSyntaxHighlighter>
                  <SyntaxHighlighter 
                    showLineNumbers
                    startingLineNumber={1}
                    style={darcula} 
                    customStyle={{ 
                      position: 'static',
                      width: '100%', 
                      height: '100%',
                      border: '5px solid #fff' 
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </S.ContainerSyntaxHighlighter>
              ) : (
                <S.ContainerScriptText>
                  <S.Text>nenhum script gerado ...</S.Text> 
                </S.ContainerScriptText>
              )}
          </S.ContainerScript>

          <S.ContainerButtons>
            {/* <S.GenerateScriptButton disabled={false} onClick={() => {handleGeneratorScript()}}>Gerar Script</S.GenerateScriptButton> */}
            {/* <S.DownloadButton disabled={true} onClick={() => {}}>Baixar Scripts</S.DownloadButton> */}
          </S.ContainerButtons>
        </S.ContainerRight>
      </S.Wrapper>
    </DragDropContext>
  )
}
