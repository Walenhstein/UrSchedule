import Button from "../Button/Button";
import "./TaskCard.css";


export default function TaskCard({card, fn, onDragStart, draggable, ...props}){

    return (
    <>
        <div className="taskCard" 
        draggable={draggable}
        // This part of the code was written AI for fix my "safari issues"
        onDragStart={(e) => {e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", JSON.stringify(card));//
                onDragStart(card);}}>
            {card.text}
            <Button fn={fn} width={30} height={20}>×</Button>
        </div>
    </>
 )
}