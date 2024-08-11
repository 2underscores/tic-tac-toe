// import React from "react"; // React 17+ no longer requires in jsx. automatic JSX runtime autoimports
import './GameHistory.css'

interface HistoryButtonProps {
    index: number;
    clickHandler: (index: number) => void;
    status: 'selected' | 'played' | 'unplayed';
}

function HistoryButton({ index, clickHandler, status}: HistoryButtonProps) {
    clickHandler = status === 'unplayed' ?  () => {} : clickHandler;
    return (
        <button className={`HistoryButton ${status}`} onClick={() => { clickHandler(index) }}></button>
    )
}

export default function GameHistory({ selectedIndex, latestIndex, clickHandler }: any) {
    const buttons = Array.from({ length: 10 }).map((_, idx) => 
         <HistoryButton index={idx} clickHandler={clickHandler} status={selectedIndex===idx ? 'selected' : (idx<=latestIndex ? 'played' : 'unplayed')}/>
)
    return (
        <>
            <div className="GameHistory">
                <div>
                    {buttons}
                </div>
            </div>
        </>
    )
}