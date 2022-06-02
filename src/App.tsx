import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";

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
    })


    const addTodoList = (newTitle: string) => {
        const newID = v1()
        const newTodolist: TodoListType = {id: newID, title: newTitle, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({
            ...tasks, [newID]: []
        })
    }

    const editTodoList = (todoListID: string, newTitle: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: newTitle} : tl))
    }


    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const removeTask = (idTask: string, todoListID: string) => {

        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== idTask)})
    }

    const addTask = (newTask: string, todoListID: string) => {

        setTasks({...tasks, [todoListID]: [{id: v1(), title: newTask, isDone: false}, ...tasks[todoListID]]})
    }


    const changeStatusTask = (todoListID: string, idTask: string, valueStatus: boolean) => {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === idTask ? {...t, isDone: valueStatus} : t)
        })
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

    const todoListComponents = todoLists.length ?
        todoLists.map(tl => {

                let tasksForRender = getTasksForRender(tl)

                return (
                    <div>

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
                            editTodoList={editTodoList}
                        />
                    </div>
                )
            }
        )
        : <span>Create your First TodoList!</span>

    return (
        <div className='App'>
            <div>
                <span>Create new Todolist</span>
                <AddItemForm AddItem={addTodoList}/>
            </div>
            {todoListComponents}
        </div>
    );
}


export default App;
