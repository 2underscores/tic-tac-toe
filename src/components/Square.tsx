import React from "react"

// interface SquareProps {
//     index: number,
//     value: number
// }

export default function Square({index, value, clickHandler}: any) {
    return (
        <div>
            <button onClick={()=>{clickHandler(index)}}>
                {value}
            </button>
        </div>
    )
}