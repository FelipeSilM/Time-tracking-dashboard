import React from 'react'

import './TaskCard.css'

export default function TaskCard(props) {

    return (
        <div className={`container-card ${props.task}`} >
            <img src={props.taskImage} alt="exercicio" id="task-image" />
            <section className="card">
                <div className="hours-task">
                    <h5>{props.task}</h5>
                    <h3>{props.children}</h3>
                </div>
                <div className="last-week">
                    <img src={props.menu} alt="options" />
                    <p>{props.previous}</p>
                </div>
            </section>
        </div>
    )
}