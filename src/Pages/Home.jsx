import React , {useMemo, useRef , useState , useCallback , useReducer, useEffect }from 'react'
import ToDo from '../Components/ToDo'
import TodoBox from '../Components/TodoBox'
import CreationModal from '../Components/CreationModal'
import UpdateModal from '../Components/UpdateModal'


export default function Home() {

 const [modalsState , setToggle] = useState({create:false , update : false})
 const[selectedList , setSelectedList] = useState([])
 const[selectionState , toggleSelection] = useState({state:false, timer:null})
 const [PinnedEls , setPinnedEls] = useState([])

 let [Todos , setTodos] = useState({list:[],newTodos:[]})

 let TodosList = [
  // <ToDo key={1} Designation="Meet somebody..."/>,
  // <ToDo key={2} Designation="Have a Happy Meal!"/>
 ]

 useEffect(()=>{

   if(  Todos.newTodos.length > 0 ) {

    if( Todos.newTodos.length > 1 ) {

      Todos.newTodos.forEach((el)=>{
        Todos.list.push( el )
      })
      
      
    }
    if( Todos.newTodos.length == 1 ) {Todos.list.push( Todos.newTodos[0] )}
 
   }
  
   setTodos( { ...Todos , newTodos: "" } )
   localStorage.setItem("TodosList", Todos.list )
   
 },[Todos.newTodos])


 if( Todos.list.length > 0 ){
  
    TodosList = Todos.list.map( ( el , index ) =>{

    const data = {id:el.id,index,added:el.addState,designation:el.designation,image:el.image
    ,time:el.time,timer:el.timer , selection : el.selection}
      
    return < ToDo key={ index } Modals={{toggleModals , modalsState }} selection = { { selectedList ,setSelectedList,selectionState , toggleSelection } } pin={{PinnedEls , setPinnedEls}} data={data} todos={Todos} setter={setTodos} />

    })

  }
 
 const toggleModals = (newState)=>{
  setToggle(newState)
 }


  return (  
    <>
  
      <div className='HomeBackground Home'>

        <button  className={modalsState.create?"create click":"create"}
        onClick={() =>toggleModals({...modalsState , create : !modalsState.create})}> 
        <span className='createColor'>Create</span> <i style={{fontWeight:'normal'}}><span className='createColor'>a</span> To-Do</i>
        </button>

        <TodoBox  data = { { TodosList ,Todos ,setTodos , selectedList , setSelectedList , PinnedEls , setPinnedEls } } />

        {selectedList.length > 0  && (<div className="DeleteAll"> Delete </div>)}
        
        <div className={modalsState.create || modalsState.update ?"BgToggle active":"BgToggle"}>
        </div>
    
        <CreationModal data = { { modalsState , toggleModals , Todos , setTodos } } />
        <UpdateModal data = { { modalsState , toggleModals,Todos , setTodos } } />

      </div>
    </>
  )
}

