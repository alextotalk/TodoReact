import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import './App.css';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (newTask: TaskType, todoListID: string) => void
    changeStatusTask: ( todoListID: string,idTask: string, valueStatus: boolean) => void
    removeTodoList: (todoListID: string) => void
    filterMark: FilterValuesType
}

export function Todolist(props: PropsType) {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask({id: v1(), title: title.trim(), isDone: false},props.todoListId)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onChangeFilterAll = () => {
        props.changeFilter('all',props.todoListId)
    }
    const onChangeFilterActive = () => {
        props.changeFilter('active',props.todoListId)
    }
    const onChangeFilterDone = () => {
        props.changeFilter('done',props.todoListId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={()=>props.removeTodoList(props.todoListId)}>✖</button>

            <div>
                <input value={title}
                       onChange={onChangHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button
                    onClick={addTask}>+
                </button>
                {error && <div className='error-message'>{error}</div>}
            </div>

            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        props.removeTask(task.id,props.todoListId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let valueStatus = e.currentTarget.checked
                        props.changeStatusTask(props.todoListId, task.id, valueStatus)

                    }
                    return <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                        <input readOnly type='checkbox'
                               onChange={onChangeHandler} checked={task.isDone}/>
                        {task.title}
                        <button onClick={onClickHandler}>✖
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filterMark === 'all' ? 'active-filter' : ''}
                        onClick={onChangeFilterAll}>All
                </button>
                <button className={props.filterMark === 'active' ? 'active-filter' : ''}
                        onClick={onChangeFilterActive}>Active
                </button>
                <button className={props.filterMark === 'done' ? 'active-filter' : ''}
                        onClick={onChangeFilterDone}>Completed
                </button>
            </div>
        </div>
    )
}