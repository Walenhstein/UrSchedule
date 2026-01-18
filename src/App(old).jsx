import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button/Button'

const initialTaskBoard = [{
  id: 1,
  title: "Не начато",
  cards:[
    
  ] 
},
{
  id: 2,
  title: "В процессе",
  cards:[
    
  ]
},
{
  id: 3,
  title: "Готово",
  cards:[
    
  ]
}];



export default function App() {

  const [task, setTask] = useState(() => {
    const localData = localStorage.getItem('kanban-state');
    if (localData) {
      return JSON.parse(localData);
    }
    if (!localData) {
      return initialTaskBoard;
    }
  });
  const [draggedItem, setDraggedItem] = useState();
  
  useEffect(() => {
    const dataToSave = JSON.stringify(task);
    localStorage.setItem('kanban-state', dataToSave);
  }, [task]);

  function handleTaskAdd(column){
    const text = prompt("Введите текст");
    if (!text) return;
    setTask(task.map((t) => {
      if (t.id === column.id) {
        return {
          ...t,
          cards: [
            ...t.cards,
            {
              id: Date.now(),
              text: text
            }
          ]
        }
      } else return t;
    } 
    )
  );
}

function handleTaskDelete(data, id){
  setTask(task.map((t) => {
    if (t.id === data.id) { 
      return {
        ...t,
        cards: t.cards.filter((card) => card.id !== id)
      }
    } else return t;
  }))
}

// function moveRight(column, id, card){
//   setTask(task.map((t) => {
//     if (t.id === column.id) {
//       return {
//         ...t,
//         cards: t.cards.filter((card) => card.id !== id) 
//       }
//     }
//     if (t.id === (column.id + 1)) {
//       return {
//         ...t,
//         cards:[
//           ...t.cards,
//           card
//         ]
//       }
//     }
//     return t;
//   }))
// }

// function moveLeft(column, id, card){
//   setTask(task.map((t) => {
//     if (t.id === column.id) {
//       return {
//         ...t,
//         cards: t.cards.filter((card) => card.id !== id) 
//       }
//     }
//     if (t.id === (column.id - 1)) {
//       return {
//         ...t,
//         cards:[
//           ...t.cards,
//           card
//         ]
//       }
//     }
//     return t;
//   }))
// }

// function buttonUI(index, max, column, id, card) {
//   if (index === 0) {
//     return (
//       <button onClick={() => moveRight(column, id, card)}>
//         {'->'}
//       </button>
//     )
//   } else if (index === (max-1)){
//     return( 
//       <button onClick={() => moveLeft(column, id, card)}>
//         {'<-'}
//       </button>
//     )  
//   } else {
//     return(
//       <>
//         <button onClick={() => moveLeft(column, id, card)}>
//           {'<-'}
//         </button>
//         <button onClick={() => moveRight(column, id, card)}>
//           {'->'}
//         </button>
//       </>      
//     )
//   }
// }

function handleDrop(e, targetColumnId){
  e.preventDefault();
  const {sourceColumnId, card} = draggedItem;
  if (!draggedItem) return;
  if (sourceColumnId === targetColumnId) return;

  setTask(task.map((t) => {
    // Удаление из старой колонки
    if (t.id === sourceColumnId) {
      return {
        ...t,
        cards: t.cards.filter((tCard)=> tCard.id !== card.id)
      }
    }
    //добавление в новую колонку
    if (t.id === targetColumnId) {
      return {
        ...t,
        cards: [
          ...t.cards,
          card
        ]
      }
    }
    return t;
  }))
}

  return (
    <>
      <ul className='column'>
        {task.map((column, index) => (
            <li key={column.id} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, column.id)}>
              <h3>{column.title}</h3>
              <ul>
                {column.cards.map((card) =>(
                  <div className='card' draggable={true} onDragStart={() => setDraggedItem({card: card, sourceColumnId: column.id})}>
                    <li key={card.id}>
                      {card.text}
                      <button onClick={() => handleTaskDelete(column, card.id)}>
                        X
                      </button>
                      {/* <div className='directionButton'>
                        {buttonUI(index, task.length, column, card.id, card)}
                      </div> */}
                    </li>
                  </div>
                ))}
              </ul>
              <button onClick={() => handleTaskAdd(column)}>
                Добавить задачу
              </button>
            </li>

          )
        )}
      </ul>
    </>
  )
}
