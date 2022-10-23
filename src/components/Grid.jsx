import { useEffect } from 'react';

import "./Grid.css"

export const Grid = ({ chatMessages }) => {
    useEffect(() => {

    }, []);

    return (
        <div className="grid">
            <div className="square" onClick={() => console.log("hello")}>X</div>
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
        </div>
    );
}
