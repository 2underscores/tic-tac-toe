import { useState } from 'react'
import './App.css'
import Board from './components/Board'

const BOARD_SIZE = 3;
const BLANK = 0; // TODO: change to null
const players = [{val: 1, rep: 'X',}, {val: -1, rep: 'O',}]

type BoardType = ReadonlyArray<number>;
type GameType = ReadonlyArray<BoardType>;
type GameOutcome = 'WIN P1' | 'WIN P2' | 'DRAW' | 'ONGOING';

function App() {
  const starter_board: BoardType = new Array(BOARD_SIZE*BOARD_SIZE).fill(BLANK);
  const [game, setGame] = useState<GameType>([starter_board])
  const [msg, setMsg] = useState('')

  function turnClickHandler(clickIndex: number) {
    const new_board = game[game.length - 1].slice();
    // If game complete, exit
    if (evaluateGameState(new_board) != 'ONGOING') {return}
    // If move in illegal box, return
    if (new_board[clickIndex] !== BLANK) {return}
    // Make move
    const playerChar = game.length % 2 ? players[0].val : players[1].val;
    new_board[clickIndex] = playerChar;
    setGame([...game, new_board]);
    // Check if game done
    let newGameState = evaluateGameState(new_board);
    console.log(newGameState);
    if (newGameState != 'ONGOING') {
      setMsg(newGameState);
    }
  }

  function evaluateGameState(board: BoardType): GameOutcome {
    const winLineIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (let winLine of winLineIndexes) {
      let sum = winLine.reduce((acc, idx)=>acc+board[idx], 0);
      if (sum === 3) {
        return 'WIN P1';
      } else if (sum === -3) {
        return 'WIN P2';
      }
    }
    if (!new Set(board).has(BLANK)) {
      return "DRAW";
    }
    return "ONGOING";
  }

  function resetBoard() {
    setMsg('');
    setGame([starter_board]);
  }

  return (
    <>
      <div>{msg}</div>
      <Board board={game[game.length-1]} turnHandler={turnClickHandler}/>
      <button onClick={resetBoard}>Reset</button>
    </>
  )
}

export default App
