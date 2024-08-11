import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameHistory from './GameHistory';

const BOARD_SIZE = 3;
const BLANK = 0; // TODO: change to null
const players = [{ val: 1, rep: 'X', }, { val: -1, rep: 'O', }]

type BoardType = ReadonlyArray<number>;
type GameType = ReadonlyArray<BoardType>;
type GameStatus = 'WIN_X' | 'WIN_O' | 'DRAW' | 'ONGOING';
type GameScores = { x: number, o: number, draw: number };

function App() {
  const starter_board: BoardType = new Array(BOARD_SIZE * BOARD_SIZE).fill(BLANK);
  const [game, setGame] = useState<GameType>([starter_board])
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [scores, setScores] = useState<GameScores>({ x: 0, o: 0, draw: 0 });

  function turnClickHandler(clickIndex: number) {
    const new_board = game[historyIndex].slice();
    const oldGameState = gameState(new_board);
    // If game complete, exit
    if (oldGameState != 'ONGOING') {
      scoreGame(oldGameState);
      resetBoard();
      return;
    }
    // If move in illegal box, return
    if (new_board[clickIndex] !== BLANK) {
      return
    }
    // Make move
    const playerChar = historyIndex % 2 ? players[1].val : players[0].val;
    new_board[clickIndex] = playerChar;
    setGame([...game.slice(0, historyIndex + 1), new_board]);
    setHistoryIndex(historyIndex + 1);
  }

  function historyClickHandler(clickIndex: number) {
    setHistoryIndex(clickIndex)
  }

  function gameState(board: BoardType): GameStatus {
    const winLine = getWinline(board);
    if (winLine) {
      return board[winLine[0]] === 1 ? 'WIN_X' : 'WIN_O';
    }
    if (!new Set(board).has(BLANK)) {
      return "DRAW";
    }
    return "ONGOING";
  }

  function getWinline(board: BoardType): number[] | null {
    // TODO: Duplicate code in Board.tsx, pass or define there or something
    const winLineIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let winLine of winLineIndexes) {
      let sum = winLine.reduce((acc, idx) => acc + board[idx], 0);
      if (Math.abs(sum) === 3) {
        return winLine;
      }
    }
    return null;
  }

  function scoreGame(state: GameStatus): void {
    if (state === 'WIN_X') {
      setScores({ ...scores, x: scores.x + 1 });
    } else if (state === 'WIN_O') {
      setScores({ ...scores, o: scores.o + 1 });
    } else if (state === 'DRAW') {
      setScores({ ...scores, draw: scores.draw + 1 });
    }
  }

  function resetBoard() {
    setGame([starter_board]);
    setHistoryIndex(0);
  }

  function highlightPlayerTurn(player: 'X' | 'O'): boolean {
    if (gameState(game[historyIndex]) !== 'ONGOING') {
      return false;
    }
    const playerTurn = historyIndex % 2 ? 'O' : 'X';
    if(player !== playerTurn) {
      return false;
    }
    return true;
  }

  function gameStateToText(state: GameStatus): string {
    if (state === 'WIN_X') {
      return "Player X wins!";
    } else if (state === 'WIN_O') {
      return "Player O wins!";
    } else if (state === 'DRAW') {
      return "It's a draw!";
    }
    return "Game in progress";
  }

  return (
    <>
      <div className={`game-status ${gameState(game[historyIndex])}`}>{gameStateToText(gameState(game[historyIndex]))}</div>
      <Board board={game[historyIndex]} turnHandler={turnClickHandler} />
      <GameHistory selectedIndex={historyIndex} latestIndex={game.length - 1} clickHandler={historyClickHandler} />
      <div className="scores-container">
      <div className={`score-item ${highlightPlayerTurn('X') ? 'highlighted' : 'dimmed'}`}>
          <div>Player X</div>
          <div>{scores.x}</div>
        </div>
        <div className="score-item dimmed">
          <div>Draw</div>
          <div>{scores.draw}</div>
        </div>
        <div className={`score-item ${highlightPlayerTurn('O') ? 'highlighted' : 'dimmed'}`}>
          <div>Player O</div>
          <div>{scores.o}</div>
        </div>
      </div>
      {/* <button onClick={resetBoard}>Reset</button> */}
    </>
  )
}

export default App
