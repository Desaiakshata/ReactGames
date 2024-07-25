import { useState } from "react";

function Square({value,onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

function Board({turn, currSquares, onBoardClick}) {
  let winner,title;
  function handleClick(i,t) {
    const nextSquares = currSquares.slice();
    if (nextSquares[i]==null) {
      if (t==1 || t==null) nextSquares[i] = "X";
      else nextSquares[i] = "O";
      onBoardClick(t,nextSquares);
    }
  }

  winner = calculateWinner(currSquares);
  if (winner) title = "WINNER: "+winner;
  else {
    if (turn==2) title = "NEXT PLAYER: O";
    else title = "NEXT PLAYER: X";
  }

  return (
    <div>
      <p>{title}</p>
      <div className="board-row">
        <Square value={currSquares[0]} onSquareClick={() => handleClick(0,turn)} />
        <Square value={currSquares[1]} onSquareClick={() => handleClick(1,turn)} />
        <Square value={currSquares[2]} onSquareClick={() => handleClick(2,turn)} />
      </div>
      <div className="board-row">
        <Square value={currSquares[3]} onSquareClick={() => handleClick(3,turn)} />
        <Square value={currSquares[4]} onSquareClick={() => handleClick(4,turn)} />
        <Square value={currSquares[5]} onSquareClick={() => handleClick(5,turn)} />
      </div>
      <div className="board-row">
        <Square value={currSquares[6]} onSquareClick={() => handleClick(6,turn)} />
        <Square value={currSquares[7]} onSquareClick={() => handleClick(7,turn)} />
        <Square value={currSquares[8]} onSquareClick={() => handleClick(8,turn)} />
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i=0; i<lines.length; i++) {
    if (squares[lines[i][0]] && (squares[lines[i][0]]===squares[lines[i][1]]) && (squares[lines[i][1]]===squares[lines[i][2]])) {
      return squares[lines[i][0]];
    }
  }
  return null;
}

export default function layout() {
  const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [turn, setTurn] = useState(1);
  const [move,setMove] = useState(0);
  let title = "Welcome to TIC-TAC-TOE";
  function handleClick(turn,nextSquares) {
    if (turn==1 || turn==null) setTurn(2);
    else setTurn(1);
    setMove(move+1);
    setSquares([...squares.slice(0, move + 1), nextSquares]);
  }

  function jumpTo(move) {
    const originalSquares = [...squares.slice(0,1)];
    setMove(0);
    return setSquares(originalSquares);
  }

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={() => jumpTo(0)}>Return to Start</button>
      <Board turn={turn} currSquares={squares[move]} onBoardClick={handleClick}/>
    </div>
  )
}