"use client";

import React, { useState, useEffect, useRef } from 'react';

type Clue = {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
};

const CLUES: Clue[] = [
  { number: 1, clue: "Estado con enorme historia minera, famoso por su plata.", answer: "ZACATECAS", row: 1, col: 1, direction: 'across' },
  { number: 2, clue: "Elemento esencial para el cableado eléctrico; abundante en Sonora.", answer: "COBRE", row: 1, col: 3, direction: 'down' },
  { number: 3, clue: "El elemento más abundante en la corteza terrestre.", answer: "OXIGENO", row: 5, col: 3, direction: 'across' },
  { number: 4, clue: "Estado líder en minería de cobre y oro en México.", answer: "SONORA", row: 4, col: 9, direction: 'down' },
  { number: 5, clue: "Elemento líder de producción en México, usado en joyería.", answer: "PLATA", row: 0, col: 2, direction: 'down' },
  { number: 6, clue: "Metal fundamental para la industria siderúrgica y construcción.", answer: "HIERRO", row: 9, col: 4, direction: 'across' },
];

const GRID_SIZE = 11;

export default function Crossword() {
  const [grid, setGrid] = useState<string[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')));
  const [userGrid, setUserGrid] = useState<string[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')));
  const [cellStatus, setCellStatus] = useState<string[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    CLUES.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'across' ? clue.row : clue.row + i;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        newGrid[r][c] = clue.answer[i];
      }
    });
    setGrid(newGrid);
  }, []);

  const handleChange = (r: number, c: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newUserGrid = [...userGrid];
    newUserGrid[r][c] = val.toUpperCase();
    setUserGrid(newUserGrid);

    // Auto-focus next cell
    if (val !== '') {
      // Find current word direction
      const currentClue = CLUES.find(clue => 
        (clue.direction === 'across' && clue.row === r && c >= clue.col && c < clue.col + clue.answer.length) ||
        (clue.direction === 'down' && clue.col === c && r >= clue.row && r < clue.row + clue.answer.length)
      );
      
      if (currentClue) {
        let nextR = r;
        let nextC = c;
        if (currentClue.direction === 'across' && c < currentClue.col + currentClue.answer.length - 1) nextC++;
        else if (currentClue.direction === 'down' && r < currentClue.row + currentClue.answer.length - 1) nextR++;
        
        if (nextR !== r || nextC !== c) {
          const nextInput = document.getElementById(`cell-${nextR}-${nextC}`);
          nextInput?.focus();
        }
      }
    }
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && userGrid[r][c] === '') {
      // Move back logic
    }
  };

  const checkAnswers = () => {
    const newStatus = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    let allCorrect = true;
    
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] !== '') {
          if (userGrid[r][c] === grid[r][c]) {
            newStatus[r][c] = 'correct';
          } else if (userGrid[r][c] !== '') {
            newStatus[r][c] = 'incorrect';
            allCorrect = false;
          } else {
            allCorrect = false;
          }
        }
      }
    }
    setCellStatus(newStatus);
    if (allCorrect) alert("¡Felicidades! Has completado el crucigrama correctamente.");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center p-4 relative">
      <div className="box-simple rounded-lg">
        <div className="grid grid-cols-11 gap-1">
          {Array.from({ length: GRID_SIZE }).map((_, r) => (
            Array.from({ length: GRID_SIZE }).map((_, c) => {
              const isCell = grid[r][c] !== '';
              const clueNumber = CLUES.find(cl => cl.row === r && cl.col === c)?.number;
              
              return (
                <div key={`${r}-${c}`} className="relative w-8 h-8 md:w-12 md:h-12">
                  {isCell ? (
                    <>
                      {clueNumber && (
                        <span className="absolute top-0.5 left-1 text-[8px] md:text-[10px] text-gray-400 z-10 pointer-events-none">
                          {clueNumber}
                        </span>
                      )}
                      <input
                        id={`cell-${r}-${c}`}
                        type="text"
                        value={userGrid[r][c]}
                        onChange={(e) => handleChange(r, c, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(r, c, e)}
                        className={`w-full h-full text-center text-lg md:text-xl font-medium uppercase crossword-cell
                          ${cellStatus[r][c] === 'correct' ? 'bg-green-50' : 
                            cellStatus[r][c] === 'incorrect' ? 'bg-red-50' : ''}`}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-sm" />
                  )}
                </div>
              );
            })
          ))}
        </div>
        
        <div className="mt-8 flex justify-center no-print">
          <button 
            onClick={checkAnswers}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Verificar Respuestas
          </button>
        </div>
      </div>

      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="box-simple rounded-lg">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">
            Horizontales
          </h2>
          <ul className="space-y-3">
            {CLUES.filter(c => c.direction === 'across').map(clue => (
              <li key={clue.number} className="text-sm text-gray-700">
                <span className="font-bold mr-2">{clue.number}.</span> {clue.clue}
              </li>
            ))}
          </ul>
        </div>

        <div className="box-simple rounded-lg">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">
            Verticales
          </h2>
          <ul className="space-y-3">
            {CLUES.filter(c => c.direction === 'down').map(clue => (
              <li key={clue.number} className="text-sm text-gray-700">
                <span className="font-bold mr-2">{clue.number}.</span> {clue.clue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
