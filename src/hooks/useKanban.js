    import { useState, useEffect, useRef } from "react";
    
    export default function useKanban(initialBoard){
    const [column, setColumn] = useState(() => {
        const localData = localStorage.getItem('kanban-state');
            if (localData && localData !== "undefined") { 
                try{
                    return JSON.parse(localData)
                } catch {
                    console.error("Parsin error: ", e);
                    return initialBoard 
                }
            } else return initialBoard

    }); 
    const [draggedItem, setDragged] = useState(null);

    useEffect(() => {
        const savedData = JSON.stringify(column);
        localStorage.setItem('kanban-state', savedData);
    },[column]);

    const addTask = (columnId) => {
        const text = prompt("Текст задачи: ")
        if (!text) return;

        setColumn(prev => prev.map(col => 
            col.id === columnId
            ? {...col, cards:[ ...col.cards, {id: Date.now(), text}] } 
            : col
        ))
    }

    const deleteTask = (columnId, cardId) => {
        setColumn(prev => prev.map(col =>
            col.id === columnId
            ? {...col, cards: col.cards.filter(card => card.id !== cardId)}
            : col
        ))
    }

    const moveTask = (columnId) => {
        if (!draggedItem || draggedItem.sourceColumnId === columnId) return;
        setColumn(prev => prev.map(col => {
            if (col.id === draggedItem.sourceColumnId) {
                return {...col, cards: col.cards.filter(card => card.id !== draggedItem.card.id)}
            }
            if (col.id === columnId) {
                return {...col, cards: [...col.cards, draggedItem.card]}
            }
            return col;
        }
    ))
    }
    
    return {
        column,
        addTask,
        deleteTask,
        moveTask,
        setDragged
    }
}