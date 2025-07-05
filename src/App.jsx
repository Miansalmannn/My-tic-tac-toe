import React, { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [status, setStatus] = useState('Turn for X');
  const [winVisible, setWinVisible] = useState(false);
  const [drawVisible, setDrawVisible] = useState(false);

  const playing = new Audio('playing.mp3');
  const winSound = new Audio('winSound.mp3');
  const clown = new Audio('clown.wav');

  const changeTurn = () => (turn === 'X' ? 'O' : 'X');

  const checkWin = (newBoard) => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let e of wins) {
      if (
        newBoard[e[0]] === newBoard[e[1]] &&
        newBoard[e[1]] === newBoard[e[2]] &&
        newBoard[e[0]] !== ''
      ) {
        setStatus(`${newBoard[e[0]]} Won!`);
        setIsGameOver(true);
        winSound.play();
        setWinVisible(true);
        return true;
      }
    }
    return false;
  };

  const checkDraw = (newBoard) => {
    if (newBoard.every((b) => b !== '')) {
      setStatus("It's a Draw!");
      setIsGameOver(true);
      clown.play();
      setDrawVisible(true);
      return true;
    }
    return false;
  };

  const handleClick = (index) => {
    if (board[index] !== '' || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    playing.play();

    if (checkWin(newBoard)) return;
    if (checkDraw(newBoard)) return;

    const nextTurn = changeTurn();
    setTurn(nextTurn);
    setStatus(`Turn for ${nextTurn}`);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setIsGameOver(false);
    setStatus('Turn for X');
    setWinVisible(false);
    setDrawVisible(false);
  };

  const getBorderStyle = (index) => {
    const style = {};
    if (index < 3) style.borderTop = 'none';
    if (index > 5) style.borderBottom = 'none';
    if (index % 3 === 0) style.borderLeft = 'none';
    if (index % 3 === 2) style.borderRight = 'none';
    return style;
  };

  return (
    <div
      style={{
        backgroundImage: `url('/tic-tac-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <nav
        style={{
          background: '#000',
          color: 'white',
          width: '100%',
          padding: '5px 0',
          textAlign: 'center',
          fontFamily: '"Saira", sans-serif',
          fontSize: '1.5rem',
          letterSpacing: '1px',
        }}
      >
        MyTicTacToe.com
      </nav>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '25px',
          padding: '20px',
          backgroundColor:'rgb(255, 255, 255)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(22, 21, 21, 0.1)',
        }}
      >
        <h1 style={{ marginBottom: '16px', color: '#333' }}>
          Welcome to Tic Tac Toe
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridTemplateRows: 'repeat(3, 100px)',
          }}
        >
          {board.map((val, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(idx)}
              style={{
                border: '2px solid #444',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                cursor: 'pointer',
                backgroundColor: '#fafafa',
                ...getBorderStyle(idx),
              }}
              onMouseOver={(e) => {
                if (!isGameOver && board[idx] === '') {
                  e.target.style.backgroundColor = '#e0e0e0';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#fafafa';
              }}
            >
              {val}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '13px', textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem', color: '#444' }}>{status}</span>
          <br />
          <button
            id="reset"
            onClick={handleReset}
            style={{
              color: 'white',
              backgroundColor: '#000',
              border: 'none',
              padding: '8px 20px',
              marginTop: '12px',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#000';
            }}
          >
            Reset
          </button>
        </div>

        {winVisible && (
          <img
            src="icegif-137.gif"
            alt="Win GIF"
            style={{ width: '150px', marginTop: '20px' }}
          />
        )}
        {drawVisible && (
          <img
            src="scribble.gif"
            alt="Draw GIF"
            style={{ width: '150px', marginTop: '20px' }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
