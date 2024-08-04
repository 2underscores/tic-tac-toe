import { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const board_size = 3;
  const starter_board: number[] = new Array(board_size*board_size).fill(0);
  const [game, setGame] = useState([starter_board])

  function turnClickHandler(clickIndex: number) {
    const new_board = game[game.length - 1].slice();
    new_board[clickIndex] = game.length % 2 ? -1 : 1;
    const new_game = [...game, new_board]; // Not a deep copy
    // game.push(new_board); // DOES NOT WORK
    setGame(new_game);
  }

  return (
    <>
      <Board board={game[game.length-1]} turnHandler={turnClickHandler}/>
    </>
  )
}

export default App
