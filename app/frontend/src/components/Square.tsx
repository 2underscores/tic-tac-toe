// import React from "react"; // React 17+ no longer requires in jsx. automatic JSX runtime autoimports
import './Square.css'

// interface SquareProps {
//     index: number,
//     value: number
// }

export default function Square({index, value, winner, clickHandler}: any) {
    function SymbolMapper(cellVal: number) {
        switch (cellVal) {
            case 1:
                return 'X'
            case -1:
                return 'O';
            case 0:
                return '';
        }
    }

    return (
        
            <button className={`GameCell col${index%3} row${Math.floor(index/3)} ${winner ? 'winner' : ''}`} onClick={()=>{clickHandler(index)}}>
                {SymbolMapper(value)}
            </button>
        
    )
}