import { useState, FormEvent, useEffect } from 'react'
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd'
import CreatableSelect from 'react-select/creatable'
import fileDownload from 'js-file-download'
import { GetIcon } from './utils/GetIcon'
import { Resources } from './utils/options/Resources'
import { Techs } from './utils/options/Techs'
import { Intervals } from './utils/options/Intervals'
import * as S from './styles/styles'

type Props = {
  value: number
  label: string
  type: string
  extension?: string
}

export function App() {
  const [standardResources, setStandardResources] = useState<Props[]>(Resources)
  const [selectedResources, setSelectedResources] = useState<Props[]>([])
  const [scripts, setScripts] = useState<Props[]>([])
  const [tech, setTech] = useState<String>('')
  const [totalItem, setTotalItem] = useState<Number>(0)
  const [isDisabled, setIsDisabled] = useState<Boolean>(true)

  const handleDownload = () => {
    const script = JSON.stringify(scripts)
    console.log(script)
    console.log(JSON.parse(script))

    // fileDownload(JSON.stringify(script), `script.${tech}`)
    // setScripts([])
  }

  const handleGeneratorScript = (event: FormEvent) => {
    event.preventDefault()
  }

  const handleChangeItem = (selectedItem: any) => {
    setTech('')
    setScripts([...scripts, selectedItem])
    setTech(selectedItem?.extension)
    setIsDisabled(false)
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
    
    setSelectedResources(complete)
    setStandardResources(active)

    complete.map((c) => handleChangeItem(c))
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
                  options={Intervals}
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
            <S.Text>nenhum script gerado ...</S.Text> 

            {/* {selectedResources?.map((resource) => (
              <S.Text key={resource.id}>{GetNodeScript({ resourceId: resource.id })}</S.Text>
            ))} */}
          </S.ContainerScript>

          <S.Form 
            onSubmit={(event) => {
              handleGeneratorScript(event)
            }}
          >
            <S.Button type='submit' disabled={!isDisabled}>Gerar Script</S.Button>

            {tech && (
              <S.Download onClick={() => handleDownload()}>Baixar scripts</S.Download>
            )}
          </S.Form>
        </S.ContainerRight>
      </S.Wrapper>
    </DragDropContext>
  )
}
