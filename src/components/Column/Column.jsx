import TaskCard from '../TaskCard/TaskCard.jsx';
import Button from '../Button/Button.jsx';
import './Column.css'

export default function Column({deleteTask, column, addTask, onDragOver, onDragStart, onDrop}){

    return (
        <div className = 'column' onDrop={(e) => {
            e.preventDefault(); // forbid browser open the JSON forwarded while dragging cards waere dropped
            onDrop();
        }}
        onDragOver={onDragOver}> 
                <h3>{column.title}</h3>

                    {column.cards.map(card => {
                        return(
                            <TaskCard 
                            key={card.id}
                            draggable={true}
                            card={card}
                            fn={()=>deleteTask(card.id)}
                            onDragStart={()=> onDragStart(card)}
                            />
                            )
                    })}
                    <Button fn={addTask}>Добавить задачу</Button>
        </div>
    )
}