import { useReducer, useState } from "react";

const initialState = {
  tasks: [],
  tid:1
}


const reducer = (state, action)=>{
  switch (action.type) {
    case "ADD":
      return{
         ...state,
       tasks: [...state.tasks ,{id: state.id, task : action.payload, completed: false} ],
       tid:state.id+1,
      }
    case "REMOVE":
      return {
        ...state,
        tasks: state.tasks.filter((t)=> t.id !== action.payload),
      }

      case "TOGGLE":
        return{
          ...state,
          tasks: state.tasks.map(t=>(
            t.id === action.payload ? {...t, completed:!t.completed} : t
          ))
        }
    default:
      return state
  }
}



const DepositCopy = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskText, setTaskText] = useState("");

  const handleAdd = () => {
    if(taskText.trim() !== "")
    dispatch({type:"ADD"});
   }

   const handleRemove = (id)=>{
      dispatch({type:"REMOVE", payload:id});
   }

   const handleToggle = (id) => {
    dispatch({type:"TOGGLE", payload:id});
   }
     

  return (
    <div>

      <h2>DepositComp</h2>
      <input type="text"
         value={taskText}
         onChange={(e)=> setTaskText(e.target.value)}
         placeholder="enter a new task"
         />
      <button onClick={handleAdd}>ADD Deposit</button>
      <ul>
        {
          state.tasks.map((task) =>{
            <li>
               <span> {task.text}</span> 
               <button onClick={handleRemove}>Remove</button>
               <button onClick={handleToggle}>Toggle</button>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default DepositCopy;