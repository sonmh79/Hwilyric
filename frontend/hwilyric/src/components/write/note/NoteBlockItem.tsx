import { useCallback, useRef } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useRecoilState } from "recoil"
import { blockListState } from "../../../atoms/noteAtoms"
import { BlockItemStyle } from "../../../styles/writeNoteStyle"
import { ILyricBlockTypes } from "../../../types/writingType"
import styled from "styled-components"

interface BlockItemProps {
    block: ILyricBlockTypes
    index: number
}

interface IContainer {
    isDragging: boolean;
}

const Container = styled.div<IContainer>`
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;


function BlockItem({ block, index}: BlockItemProps) {

    const [blockList, setBlockList] = useRecoilState(blockListState)

    const ref = useRef<HTMLTextAreaElement>(null)

    const onEditBlockType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let newType: string = event.target.value

        const newBlockList = blockList.map((it) => it.blockId === block.blockId ? {
            ...it,
            type: newType
        } : it)
        
        setBlockList(() => newBlockList)
    }

    const onEditLyrics = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newLyrics: string = event.target.value
        newLyrics = newLyrics.replaceAll("<br>", "\r\n")

        const newBlockList = blockList.map((it) => it.blockId === block.blockId ? {
            ...it,
            lyrics: newLyrics
        } : it)
        
        setBlockList(newBlockList)
    }

    const onDeleteBlock = () => {
        const newBlockList = blockList.filter((item) => item.blockId !== block.blockId)
        setBlockList(newBlockList)
    }

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return
        }
        ref.current.style.height = '30px'
        ref.current.style.height = ref.current.scrollHeight + 'px'
    }, [])

    return (
        <Draggable draggableId={block.blockId.toString()} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}>
                    <BlockItemStyle>
                        <select
                            defaultValue={block.type}
                            onChange={onEditBlockType}>
                            <option value={"verse"}>verse</option>
                            <option value={"bridge"}>bridge</option>
                            <option value={"hook"}>hook</option>
                            <option value={"etc"}>etc</option>
                        </select>
                        <textarea
                            className="writeLyric"
                            value={block.lyrics}
                            ref={ref}
                            onChange={onEditLyrics}
                            onInput={handleResizeHeight}
                        />
                        <button onClick={onDeleteBlock}>-</button>
                    </BlockItemStyle>
                </Container>
            )}
        </Draggable>
    )
}

export default BlockItem
