import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'done' | 'active'
type TasksType = TaskType[]

function App() {
    let [tasks, setTasks] = useState<TasksType>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "restAPI", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    const addTask = (newTask: TaskType) => {
        newTask = {id: newTask.id, title: newTask.title, isDone: newTask.isDone}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (idTask: string) => {
        let filterResult = tasks.filter(task => task.id !== idTask)
        setTasks(filterResult)
    }
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }
    if (filter === 'done') {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    return (
        <React.StrictMode>
            <div className="App">
                <Todolist
                    title="What to learn"
                    removeTask={removeTask}
                    addTask={addTask}
                    tasks={tasksForTodoList}
                    changeFilter={changeFilter}/>
            </div>
        </React.StrictMode>
    );
}

export default App;
