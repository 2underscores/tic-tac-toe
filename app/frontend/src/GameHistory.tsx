// import React from "react"; // React 17+ no longer requires in jsx. automatic JSX runtime autoimports

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
    return (
        <>
            <div className="GameHistory">
                2 Game History ({selectedIndex} selected)
                <div>
                    {buttons}
                </div>
            </div>
        </>
    )
}