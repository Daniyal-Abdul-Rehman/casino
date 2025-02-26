Frontend

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [winRate, setWinRate] = useState(50);
  const [lines, setLines] = useState(1); // Anzahl der aktiven Linien (1 bis 10)
  const [spinResult, setSpinResult] = useState(null);

  const handleSpin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/spin', { winRate, lines });
      setSpinResult(response.data);
    } catch (error) {
      console.error('Error during spin:', error);
    }
  };
  return (
    <div className="app">
      <h1>Slot Machine</h1>
      <div className="controls">
        <label>Set WinRate (0-100%):</label>
        <input
          type="number"
          value={winRate}
          min="0"
          max="100"
          onChange={(e) => setWinRate(Number(e.target.value))}
        />
        <label>Select Lines (1-10):</label>
        <input
          type="number"
          value={lines}
          min="1"
          max="10"
          onChange={(e) => setLines(Number(e.target.value))}
        />
        <button onClick={handleSpin}>Spin</button>
      </div>
      {spinResult && (
        <div className="results">
          <h2>Spin Result:</h2>
          <div className="grid">
            {spinResult.spin.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((symbol, colIndex) => (
                  <span key={colIndex} className="cell">{symbol}</span>
                ))}
              </div>
            ))}
          </div>
          <h3>{spinResult.win ? 'You Won!' : 'You Lost!'}</h3>
          {spinResult.jackpot && <h3>🎉 Jackpot! 🎉</h3>}
          <h3>Total Points: {spinResult.points}</h3>
        </div>
      )}
    </div>
  );
};
export default App;




Bacxkend
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Slot Game Configuration
const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const SYMBOL_VALUES = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'E': 5,
  'F': 6,
  'G': 7,
  'H': 8,
  'I': 9,
  'J': 10,
  'K': 11,
};
const PAYLINES = 10;

// Adjusted payout multipliers based on the user's concept
const PAYOUT_MULTIPLIERS = {
  low: { 3: 0.75, 4: 1.5, 5: 3.75 },    // Low-value symbols: A, B, C
  medium: { 3: 1.5, 4: 3.75, 5: 7.5 },  // Medium-value symbols: D, E, F
  high: { 3: 3, 4: 7.5, 5: 22.5 },      // High-value symbols: G, H, I, J, K
};

// Function to determine the category of a symbol
function getSymbolCategory(symbol) {
  if (['A', 'B', 'C'].includes(symbol)) return 'low';
  if (['D', 'E', 'F'].includes(symbol)) return 'medium';
  if (['G', 'H', 'I', 'J', 'K'].includes(symbol)) return 'high';
  return null;
}

// Function to generate a random spin (randomly pick symbols for each position)
function generateSpin() {
  const spin = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      row.push(randomSymbol);
    }
    spin.push(row);
  }
  return spin;
}

// Adjusted win chance based on winRate and number of lines
function calculateWinChance(winRate, lines) {
  const linePenalty = 1 - (lines - 1) * 0.05; // Reduces win rate by 5% per additional line
  const adjustedWinRate = winRate / 100 * linePenalty;
  return Math.random() < adjustedWinRate;
}

// Updated function to check winning lines and calculate points
function checkWinningLines(spin, winRate, lines) {
  const winLines = [
    [0, 0, 0, 0, 0], // Top row
    [1, 1, 1, 1, 1], // Middle row
    [2, 2, 2, 2, 2], // Bottom row
    [0, 1, 2, 1, 0], // Diagonal \
    [2, 1, 0, 1, 2], // Diagonal /
    [0, 0, 1, 0, 0], // Column 1
    [0, 1, 1, 1, 2], // Column 2
    [1, 0, 1, 2, 2], // Column 3
    [2, 0, 0, 1, 2], // Column 4
    [2, 1, 0, 1, 1], // Column 5
  ];

  const win = calculateWinChance(winRate, lines);
  let jackpot = false;
  let points = 0;

  if (win) {
    for (let i = 0; i < lines; i++) {
      const line = winLines[i];
      const firstSymbol = spin[line[0]][0]; // The first symbol in the line
      const category = getSymbolCategory(firstSymbol);
      const count = line.filter((col, index) => spin[line[index]][index] === firstSymbol).length;

      if (count >= 3 && category) {
        // Add points based on payout multipliers
        points += PAYOUT_MULTIPLIERS[category][count] || 0;

        // Check if it's a jackpot (all 5 symbols match in the line)
        if (count === 5) jackpot = true;
      }
    }
  }

  return { win, jackpot, points };
}

app.post('/spin', (req, res) => {
  const { winRate, lines } = req.body;
  const spin = generateSpin();
  const result = checkWinningLines(spin, winRate, lines);
  res.json({ spin, ...result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
