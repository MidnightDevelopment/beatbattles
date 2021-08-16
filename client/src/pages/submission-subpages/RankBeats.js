import React, { Component } from "react";
import Player from "./player/Player"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Typography } from 'antd';
const { Title } = Typography;
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: <Player client_id="c5a171200f3a0a73a523bba14a1e0a29" audio_id="193179003" title="Easyfun - Fanta"/>,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nice
    userSelect: "none",
    margin: `0 0 ${grid}px 0`,
    borderRadius: "2px",
    zIndex: "50",
    border: "1px solid rgba(255,255,255,0.85)",

    // change background colour if dragging
    background: isDragging ? "black" : "black",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0)",
    padding: grid,
    width: "auto",
    borderRadius: "2px"
});

class RankBeats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(5)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        this.setState({
            items
        });
    }

    render() {
        return (
            <>
                <Title level={5}> Rank by placing the best beat cards at the top and the worst at the bottom </Title>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}

                                                style={
                                                    getItemStyle(snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                            >
                                                <div{...provided.dragHandleProps} style={{
                                                    height: "20px", background: "rgba(255, 255, 255, 0.15)"
                                                }}>

                                                </div>
                                                <div style={{
                                                    margin: `0 0`,
                                                    width: "99%",
                                                }}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
        );
    }
}

export default RankBeats;