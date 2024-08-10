import './Board.css'
import Square from "./Square";


export default function Board({board, turnHandler}: any) {
    
    
    let squares = board.map((cell: number, idx: number)=><Square index={idx} value={cell} clickHandler={turnHandler}/>)

    return (
        <div>
            <div className="row">
                {squares.slice(0,3)}
            </div>
            <div className="row">
                {squares.slice(3,6)}
            </div>
            <div className="row">
                {squares.slice(6,9)}
            </div>
        </div>
    )
}