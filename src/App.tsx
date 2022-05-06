import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
export type FilterValuesType='all'|'done'|'active'
function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "restAPI", isDone: true},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    const removeTask = (idTask: number) => {
        let filterResult = tasks.filter(task => task.id !== idTask)
        setTasks(filterResult)
    }
    let [filter,setFilter]=useState<FilterValuesType>('all')
    let tasksForTodoList=tasks
    if (filter==='active'){
        tasksForTodoList=tasks.filter(task=>task.isDone)
    }
    if (filter==='done'){
        tasksForTodoList=tasks.filter(task=>!task.isDone)
    }
    const changeFilter=(value:FilterValuesType)=>{setFilter(value)}
    return (
        <React.StrictMode>
            <div className="App">
                <Todolist
                    title="What to learn"
                    removeTask={removeTask}
                    tasks={tasksForTodoList}
                    changeFilter={changeFilter}/>
            </div>
        </React.StrictMode>
    );
}

export default App;
