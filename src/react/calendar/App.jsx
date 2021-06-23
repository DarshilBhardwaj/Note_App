import React, {useState} from 'react';
import Calendar from '../node_modules/react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css'

function App() {
 
  const [value, onChange] = useState(new Date());
   return(
     <div className="di">
       <Calendar className="cal" onChange={onChange} value={value} />
       
     </div>
   )
  
}
export default App;