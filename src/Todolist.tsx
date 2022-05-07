import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: number) => void
    changeFilter:(value:FilterValuesType)=>void
}

export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    return <li key={task.id}>
                        <input readOnly type="checkbox" checked={task.isDone}/>{task.title}
                        <button onClick={() => {
                            props.removeTask(task.id)
                        }}>✖
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('done')}>Completed</button>
            </div>
        </div>
    )
}