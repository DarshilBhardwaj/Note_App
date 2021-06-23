import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css'
import {v4 as uuidv4} from '../node_modules/uuid';


const getLocalItems = () =>{
    let list = localStorage.getItem('lists')
    if (list){
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
    
}

 const App = () => {
   //for calendar date picker
    const [value, onChange] = useState(new Date());
  //for todo list
const[inputData,setInputData] = useState("");
 const[items , setItems] = useState(getLocalItems())
 const[Editnote , setEditnote] = useState()
  const [toggleSubmit,setToggleSubmit] = useState(true);

const addItem = () =>{
    if(!inputData) {
        alert("plzz fill the Data")
    } else if (inputData && !toggleSubmit){
        console.log("Edit", Editnote,items, inputData)
        setItems(
            items.map((elem) =>{
                if(elem.id===Editnote){
                    return {id:Editnote, name: inputData}
                }else{
                    return elem;
                }
            })
            
        )
         setToggleSubmit(true);
         console.log("Setting input ddata")
         setInputData('')
         setEditnote(null);
    } else {
        const allInputData = {id: uuidv4() ,name:inputData}
        console.log(allInputData)
        setItems([...items,allInputData])
        console.log(items)
        setInputData("")
    }
   
}

const deleteItem=(index)=>{
    const updateditems = items.filter((elem)=>{
        return index !=elem.id;
    });
    setItems(updateditems)
}

 const removeAll=()=>{
    setItems([])
 }
 const EditItem = (id)=>{
     let newEditItem = items.find((elem)=>{
         if(elem.id == id){
             return elem;
         }
     })
     console.log(newEditItem)
     setToggleSubmit(false);
     setInputData(newEditItem.name)
     setEditnote(newEditItem.id);
 }
 //Add Data to Local storage
   useEffect(() => {
      localStorage.setItem("lists", JSON.stringify(items))
   }, [items])
    return (
        <>
          <div className="main-div">
            
             <div className="di">
                    <Calendar className="cal" onChange={onChange}  value={value}/>
            </div>
              <div className="child-div">

                  <div>
                    < h1 className="h1date">Date</h1>
                    <h1 className="datei">{value.toLocaleDateString()}</h1>
                 </div>
                 <h1 className="addnotes"><b>Add Notes</b></h1>
              <div className="addItems">
                      <input type="text" placeholder="Add notes..." className="place"value={inputData}
                         onChange={(e)=>setInputData(e.target.value)}/>
                          
                         {
                             toggleSubmit ?<button className="add-btn" onClick={addItem}> <i className="fa fa-plus fa-lg" title="Add Notes" /></button>:
                            <button className="add-btn" style={{color:'red'}} onClick={addItem}> <i className="fa fa-edit fa-lg" title="Update Notes" /></button>
                         }
                      
              </div>
                  {console.log(items)}
                  <div className="showItems">
                      {
                          items.map((elem)=>{
                              return ( <div className="eachItems" key={elem.id}>
                             <ul> <li className="notedata">{elem.name}  ({value.toLocaleDateString()})</li></ul>
                              
                             <div className="try"> <button className="editbtn"  onClick={()=>{EditItem(elem.id)}}>
                                 <i className="fa fa-edit fa-2x"  title="Edit Notes"/></button>

                              <button className="btn1" title="Delete Notes" onClick={()=>deleteItem(elem.id)}>
                                  <i className="fa fa-minus-circle fa-2x" /></button></div>
                              
                  </div>)
                          })
                      }
                      
                    <div className="bt">  <button className="trashbtn" onClick={removeAll}> <i className="fa fa-trash trash fa-lg">      Discard All   </i></button></div>
                      
                          
                      
                  </div>
              </div>
          </div>  
        </>
    )
} 
 export default App;