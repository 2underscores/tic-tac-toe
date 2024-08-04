import './Board.css'
import Square from "./Square";


export default function Board({board, turnHandler}: any) {
    
    return (
        <div>
            <div className="row">
                <Square index={0} value={board[0]} clickHandler={turnHandler}/>
                <Square index={1} value={board[1]} clickHandler={turnHandler}/>
                <Square index={2} value={board[2]} clickHandler={turnHandler}/>
            </div>
            <div className="row">
                <Square index={3} value={board[3]} clickHandler={turnHandler}/>
                <Square index={4} value={board[4]} clickHandler={turnHandler}/>
                <Square index={5} value={board[5]} clickHandler={turnHandler}/>
            </div>
            <div className="row">
                <Square index={6} value={board[6]} clickHandler={turnHandler}/>
                <Square index={7} value={board[7]} clickHandler={turnHandler}/>
                <Square index={8} value={board[8]} clickHandler={turnHandler}/>
            </div>
        </div>
    )
}