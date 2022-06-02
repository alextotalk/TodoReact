import React, {ChangeEvent } from "react";
import {FilterValuesType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./AddItemForm/EditableSpan";

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
    addTask: (newTask: string, todoListID: string) => void
    changeStatusTask: (todoListID: string, idTask: string, valueStatus: boolean) => void
    removeTodoList: (todoListID: string) => void
    filterMark: FilterValuesType
    editTodoList: (todoListID: string, newTitle: string) => void
    changTitleTaskForTodolist: (newTitle: string, todoListID: string, taskID: string) =>void
}

export function Todolist(props: PropsType) {

    const onChangeFilterAll = () => {
        props.changeFilter('all', props.todoListId)
    }
    const onChangeFilterActive = () => {
        props.changeFilter('active', props.todoListId)
    }
    const onChangeFilterDone = () => {
        props.changeFilter('done', props.todoListId)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    let editHandlerTodoList = (title: string) => {
        props.editTodoList(props.todoListId, title)
    };

    return (
        <div>
            <EditableSpan title={props.title} changTitle={editHandlerTodoList}/>

            <button onClick={() => props.removeTodoList(props.todoListId)}>✖</button>

            <AddItemForm AddItem={addTaskHandler}/>

            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.todoListId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let valueStatus = e.currentTarget.checked
                        props.changeStatusTask(props.todoListId, task.id, valueStatus)

                    }
                    const changTitleTaskTodolist=(newTitle:string)=> {
                        props.changTitleTaskForTodolist(newTitle,props.todoListId,task.id)
                    }
                    return <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                        <input readOnly type='checkbox'
                               onChange={onChangeHandler} checked={task.isDone}/>
                         <EditableSpan title={task.title} changTitle={changTitleTaskTodolist}/>
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