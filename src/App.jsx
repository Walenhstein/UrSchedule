
import './App.css'
import { initialTaskBoard } from './initialTaskBoard.js';
import useKanban from './hooks/useKanban.js';
import Column from './components/Column/Column.jsx';




export default function App(){

    const { column, addTask, deleteTask, moveTask, setDragged } = useKanban(initialTaskBoard);

    return (
        <div className='board'>
            {column.map(col => {
                return(
                        <Column 
                        key={col.id}
                        // When dragging start the used element forward their data at the state
                        onDragStart = {(cardsId) => setDragged({sourceColumnId: col.id, card: cardsId})}
                        
                        deleteTask={(cardId)=>deleteTask(col.id, cardId)}
                        column={col}
                        addTask={()=>addTask(col.id)}
                        onDragOver = {(e) => e.preventDefault()}
                        onDrop = {() => moveTask(col.id)}
                        />
                )
            })}
        </div>
    )
}

