import React from "react";

function HistoryButton({index, clickHandler}: any) {
    return (
        <div>
            <button className="HistoryButton" onClick={()=>{clickHandler(index)}}>
                Move {index}
            </button>
        </div>
    )
}

export default function GameHistory({selectedIndex, latestIndex, clickHandler}: any) {
    const buttons = Array.from({length: latestIndex+1}).map((_, idx)=><HistoryButton index={idx} clickHandler={clickHandler}/>)
    // console.log(buttons);
    return (
        <>
            <div className="GameHistory">
                Game History
                <div>
                    {buttons}
                </div>
            </div>
        </>
    )
}