import React from "react"
import './Square.css'

// interface SquareProps {
//     index: number,
//     value: number
// }

export default function Square({index, value, clickHandler}: any) {
    function SymbolMapper(cellVal: number) {
        switch (cellVal) {
            case 1:
                return 'X'
            case -1:
                return 'O';
            case 0:
                return '  ';
        }
    }

    return (
        <div>
            <button className="GameCell" onClick={()=>{clickHandler(index)}}>
                {SymbolMapper(value)}
            </button>
        </div>
    )
}