import './Board.css'
import Square from "./Square";


export default function Board({ board, turnHandler }: any) {

    function getWinline(board: any): number[] {
        // TODO: Duplicate code in Board.tsx, pass or define there or something
        const winLineIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for (let winLine of winLineIndexes) {
            let sum = winLine.reduce((acc, idx) => acc + board[idx], 0);
            if (Math.abs(sum) === 3) {
                return winLine;
            }
        }
        return [];
    }
    const winLine = getWinline(board);

    let squares = board.map((cell: number, idx: number) => <Square index={idx} value={cell} winner={getWinline(board).includes(idx)} clickHandler={turnHandler} />)

    return (
        <div>
            <div className="row">
                {squares.slice(0, 3)}
            </div>
            <div className="row">
                {squares.slice(3, 6)}
            </div>
            <div className="row">
                {squares.slice(6, 9)}
            </div>
        </div>
    )
}