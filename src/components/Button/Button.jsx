import "./Button.css"

export default function Button({ children, fn, ...props }){
    return(
        <button className="button" onClick={fn} style={{
            width: props.width,
            height: props.height
        }}>{ children }</button>
    )
}