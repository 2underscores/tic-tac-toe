import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameHistory from './GameHistory';

const BOARD_SIZE = 3;
const BLANK = 0; // TODO: change to null
const players = [{val: 1, rep: 'X',}, {val: -1, rep: 'O',}]

type BoardType = ReadonlyArray<number>;
type GameType = ReadonlyArray<BoardType>;
type GameOutcome = 'WIN P1' | 'WIN P2' | 'DRAW' | 'ONGOING';

function App() {
  const starter_board: BoardType = new Array(BOARD_SIZE*BOARD_SIZE).fill(BLANK);
  const [game, setGame] = useState<GameType>([starter_board])
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [msg, setMsg] = useState('')

  function turnClickHandler(clickIndex: number) {
    const new_board = game[historyIndex].slice();
    // If game complete, exit
    const oldGameState = evaluateGameState(new_board);
    setMsg(oldGameState);
    if (oldGameState != 'ONGOING') {return}
    // If move in illegal box, return
    if (new_board[clickIndex] !== BLANK) {return}
    // Make move
    const playerChar = historyIndex % 2 ? players[1].val : players[0].val;
    new_board[clickIndex] = playerChar;
    setGame([...game.slice(0,historyIndex+1), new_board]); // TODO: Slice game up to history index
    setHistoryIndex(historyIndex+1);
    // Check if game done
    let newGameState = evaluateGameState(new_board);
    console.log(newGameState);
    if (newGameState != 'ONGOING') {
      setMsg(newGameState);
    }
  }

  function historyClickHandler(clickIndex: number) {
    setHistoryIndex(clickIndex)    
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
    setHistoryIndex(0);
  }

  return (
    <>
      <div>{msg}</div>
      <Board board={game[historyIndex]} turnHandler={turnClickHandler}/>
      <button onClick={resetBoard}>Reset</button>
      <GameHistory selectedIndex={historyIndex} latestIndex={game.length-1} clickHandler={historyClickHandler}/>
    </>
  )
}

export default App
