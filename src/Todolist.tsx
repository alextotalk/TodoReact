import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTask: TaskType) => void
    changeStatusTask:(idTask: string,valueStatus:boolean)=>void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    const addTask = () => {
        props.addTask(
            {id: v1(), title: title, isDone: false}
        )
        setTitle('')
    }
    const onChangHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onChangeFilterAll = () => {
        props.changeFilter('all')
    }
    const onChangeFilterActive= () => {
        props.changeFilter('active')
    }
    const onChangeFilterDone = () => {
        props.changeFilter('done')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button
                    onClick={addTask}>+
                </button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler= () => {props.removeTask(task.id)}
                    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                        let valueStatus=e.currentTarget.checked
                        props.changeStatusTask(task.id,valueStatus)

                    }
                    return <li key={task.id}>
                        <input readOnly type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>{task.title}
                        <button onClick={onClickHandler}>✖
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onChangeFilterAll}>All</button>
                <button onClick={onChangeFilterActive}>Active</button>
                <button onClick={onChangeFilterDone}>Completed</button>
            </div>
        </div>
    )
}