import React, { useEffect , useRef , useState , useContext } from 'react'
import {updateContext} from '../Contexts/UpdateContextProvider'

import  image from '../logo.svg'

export default function ToDo({ selection ,Modals, data , todos : todoList , pin , setter }) {

  const toDo = useRef("")
  const actualToDo = document.querySelector(`#toDO${data.id}`)
  const values = useContext( updateContext )


  useEffect(()=>{

    toDo.current.addEventListener('mouseup',release)
    toDo.current.addEventListener('mousedown',click)

    return () => {

      if( toDo.current ){
        toDo.current.removeEventListener('mouseup',release)
        toDo.current.removeEventListener('mousedown',click)
      }

      }

  },[ ])

  let a = null
  // alert(1)
  const click = ( e ) => {
    
    a = setTimeout(()=>{

    selection.toggleSelection({...selection.selectionState ,  state: true })

      if(!selection.selectionState.state ){
        
        todoList.list.forEach((el)=>{
          el.selection = {state:true,timer:a}
        })
       
        document.querySelector('.create').style='pointer-events:none'
        setter({...todoList , list : [...todoList.list]})

           
      }

    },600)
    
   
    
  }
  const release = ( e ) => {
    // alert(a)
    clearTimeout(a)
    selection.toggleSelection({...selection.selectionState ,  state: false })
  }

  const handleDelete = ( e ) => {
   
    todoList.list.pop(toDo.current)
    setter( todoList )

  }
  const handlePin = ( e ) => {

    todoList.list.pop(toDo.current)
    setter( todoList )
    pin.PinnedEls.push(toDo.current)
    pin.setPinnedEls([...pin.PinnedEls])
    
  }

  const handleEdit = ( e ) => {
    values.setData(data)
    Modals.toggleModals({...Modals.modalsState , update :!Modals.modalsState.update})
  }
  
  const handleValidate = ( e ) => {

  }

  const handleSelected = ( e , currentToDo ) => {
    
    if( e.target.checked ) {
      
      if( !selection.selectedList.includes( todoList.list[e.target.getAttribute('index')])){
        selection.selectedList.push( todoList.list[e.target.getAttribute('index')] )
      }
      selection.setSelectedList( [ ...selection.selectedList ] ) 
      
    }
    else{
      
      selection.selectedList.pop(currentToDo)
      selection.setSelectedList( [ ...selection.selectedList ] ) 
      
    }
    // console.dir(selection.selectedList)

  }
  

  return (

    <div className='todo' ref={toDo} id={ "toDO"+data.id } title="Maintain to select">

      <div className="todo-section1" title=''>

        <div className={data.selection.state ? "section-chekbox On" : "section-chekbox"}>

          <input index = { data.index } type='checkbox' onClick={(e,actualToDo)=> handleSelected( e , actualToDo)} />

        </div>

        <div className="section-timing-des">

          <div className="time-timer">

            <div className="time">
                9:23
            </div>
            <div className="timer">
              Timer
            </div>
          </div>
          <span>{data.designation}</span>
        </div>

      </div>

      <div className="todo-section2" title=''>
        <img src={image}/>
      </div>

      <div className="actions" title=''>

        <div className='action' onClick={handlePin} >
          p
        </div>
        <div className='action' onClick={handleEdit} >
          e
        </div>
        <div className="action" onClick={handleValidate} >
          v
        </div>
        <div className="action" onClick={handleDelete} >
          d
        </div>

      </div>

    </div>

  )
}
