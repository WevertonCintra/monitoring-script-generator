import { useState } from 'react'
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd'
import Select, { StylesConfig } from 'react-select'
import { GetIcon } from './utils/GetIcon'
import { Resources } from './utils/Resources'
import { Techs } from './utils/Techs'
import { Times } from './utils/Times'
import * as S from './styles/styles'

type Props = {
  id: number
  title: string
}

export function App() {
  const [standardResources, setStandardResources] = useState<Props[]>(Resources)
  const [selectedResources, setSelectedResources] = useState<Props[]>([])

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

    if (source.droppableId === 'FirstColumn') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'FirstColumn') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }
    
    setSelectedResources(complete)
    setStandardResources(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.Wrapper>
        <S.ContainerLeft>
          <S.BlockTop>
            <S.BlockTopLeft>
              <S.BlockText text={false}>
                <S.Text text={false}>RECURSOS</S.Text>
              </S.BlockText>

              <S.Block structure={false}>
                <Droppable droppableId='FirstColumn'>
                  {(provided) => (
                    <S.BlockResource
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                    >
                      {standardResources?.map((resource, index) => (
                        <Draggable 
                          key={resource.id.toString()} 
                          draggableId={resource.id.toString()} 
                          index={index}
                        >
                          {(provided) => (
                            <S.Resource
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <S.TextResource>{GetIcon(resource.title)} {resource.title}</S.TextResource>
                            </S.Resource>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </S.BlockResource>
                  )}
                </Droppable>
              </S.Block>
            </S.BlockTopLeft>

            <S.BlockTopRight>
              <S.Block structure={true}>
                <Droppable droppableId='SecondColumn'>
                  {(provided) => (
                    <S.BlockResource 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                    >
                      {selectedResources?.map((resource, index) => (
                        <Draggable key={resource.id.toString()} draggableId={resource.id.toString()} index={index}>
                          {(provided) => (
                            <S.Resource
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <S.TextResource>{GetIcon(resource.title)} {resource.title}</S.TextResource>
                            </S.Resource>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </S.BlockResource>
                  )}
                </Droppable>
              </S.Block>

              <S.BlockText text={true}>
                <S.Text text={true}>Jogue aqui os recurso para gerar o script</S.Text>
              </S.BlockText>
            </S.BlockTopRight>
          </S.BlockTop>

          <S.BlockDown>
            <S.BlockSelects>
              <S.Text sub={true}>TECNOLOGIA</S.Text>

              <S.SelectLeft onSubmit={() => {}}>
                <Select
                  defaultValue={Techs[0]}
                  options={Techs}
                />
              </S.SelectLeft>
            </S.BlockSelects>

            <S.BlockSelects>
              <S.Text>TEMPO</S.Text>

              <S.SelectRight onSubmit={() => {}}>
                <Select
                  defaultValue={Times[0]}
                  options={Times}
                />
              </S.SelectRight>
            </S.BlockSelects>
          </S.BlockDown>
        </S.ContainerLeft>

        <S.ContainerRight>
          <S.ContainerScript>
            <span>nenhum script gerado ...</span> 
          </S.ContainerScript>
        </S.ContainerRight>
      </S.Wrapper>
    </DragDropContext>
  )
}
