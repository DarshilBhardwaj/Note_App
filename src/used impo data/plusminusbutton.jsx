import React , {useState} from 'react'

function App() {
  const[initial , updated] = useState(4)
   function minus() {
     updated(initial-1)
   }
   function plus() {
     updated(initial+1)

   }

    return(
  <div>
   <button onClick={minus}>-</button>
   <span>{initial}</span>
   <button onClick={plus}>+</button>
  </div>
    )
  }

export default 