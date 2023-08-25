
import './app.scss';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, {useState} from 'react';//add hook
import { nanoid } from 'nanoid';// sozdanie klychey bilo ystanovleno npm install nanoid

const FILTER_MAP = {
  All: ()=> true,
  Active: (task)=> !task.completed,
  Completed: (task)=> task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);//hook
  const [filter, setFilter] = useState("All");
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
  ));

  const filterList = FILTER_NAMES.map((name)=>(
    <FilterButton
      key={name}
      name={name}
      isPressed = {name === filter}
      setFilter = {setFilter}/>
  ));

  
  function toggleTaskCompleted(id){
    const updateTasks =tasks.map((task)=>{
      if(id === task.id){
        return{...task, completed: !task.completed};
      }
      return task;
    })
    setTasks(updateTasks);
  }
  function deleteTask(id){
    const remainingTasks = tasks.filter((task)=>id!==task.id);
    setTasks(remainingTasks);
  }

  function addTask(name){
    const newTask = { id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask])
  }

  const tasksNoun = taskList.length!==1?"tasks":"task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function editTask(id, newName){
    const editTaskList = tasks.map((task)=>{
      if(id === task.id){
        return{...task, name: newName};
      }
      return task;
    });
    setTasks(editTaskList);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">{/*pokazivaet 4to ul bydet spiskom */}{/*aria-labelledby="list-heading" dlya program shitivaniya */}
        {taskList}
      </ul>
    </div>
  );
}



export default App;
