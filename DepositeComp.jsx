import { useReducer, useState } from "react";

const initialState = {
  tasks : [],
  nextId: 1
};

const taskReducer = (state, action) =>{
  switch (action.type) {
    case 'ADD_TASK':
      return{
        ...state,
        tasks:[
          ...state.tasks,
          {id: state.nextId, text:action.payload, completed:false}
        ],
        nextId:state.nextId +1,
      }
      case 'REMOVE_TASK':
        return {
          ...state,
          task : state.tasks.filter(task=> task.id !== action.payload),
        }
     case 'TOGGLE_TASK':
      return {
        ...state,
        task: state.tasks.map(task =>
          task.id === action.payload? {...task, completed:!task.completed} : task
        )
      }
  
    default:
      return state;
  }
}

const DepositeComp = () => {

  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if(taskText.trim() !== ''){
      dispatch({type:'ADD_TASK', payload:taskText} );
    }
    
  }

  const handleRemoveTask = (id) => { 
    dispatch({type:'REMOVE_TASK', payload:id});
   }

   const handleToggleTask = (id) => { 
    dispatch({type:'TOGGLE_TASK', payload:id});
    }


  return (
    <div>
        <h1>Task Manager</h1>
        <input type="text"
         value={taskText}
         onChange={(e)=> setTaskText(e.target.value)}
         placeholder="enter a new task"
         />
         <button onClick={handleAddTask}>Add task</button>
         <ul>
          {
            state.tasks.map((t, idx)=>(
              <li key={idx}> 
              <span className={`${t.completed?"line-through":"none"}`}> {t.text}</span>
            <button onClick={handleRemoveTask}>Remove task</button>
            <button onClick={handleToggleTask}>Toggle task</button>
              </li>
            ))
          }
         </ul>


    </div>
  )
}

export default DepositeComp