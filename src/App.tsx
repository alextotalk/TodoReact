import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'done'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    //
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todoListID_2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
        }
    )

    const removeTask = (idTask: string, todoListID: string) => {

        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== idTask)})
    }

    const addTask = (newTask: TaskType, todoListID: string) => {

        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const changeTodoListFilter = (value: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    const getTasksForRender = (todoList: TodoListType) => {
        let tasksForRender = tasks[todoList.id]


        if (todoList.filter === 'active') {
            tasksForRender = tasks[todoList.id].filter(task => !task.isDone)
        }
        if (todoList.filter === 'done') {
            tasksForRender = tasks[todoList.id].filter(task => task.isDone)
        }
        return tasksForRender
    }


    const changeStatusTask = ( todoListID: string, idTask: string, valueStatus: boolean) => {

        console.log(idTask,valueStatus,todoListID)
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === idTask ?{...t,isDone:valueStatus}:  t)})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const todoListComponents = todoLists.length ?
        todoLists.map(tl => {

            let tasksForRender=getTasksForRender(tl)

                return (
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        tasks={tasksForRender}
                        filterMark={tl.filter}
                        title={tl.title}

                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeTodoListFilter}
                        changeStatusTask={changeStatusTask}
                        removeTodoList={removeTodoList}
                    />

                )
            }
        )
        : <span>Create your First TodoList!</span>
    return (
        <div className='App'>
            {todoListComponents}
        </div>
    );
}


export default App;
