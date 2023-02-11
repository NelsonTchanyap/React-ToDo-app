import React from 'react'

export default function (props) {

    const { data } = props
   
    const handleClearance =(e)=>{

      data.Todos.list.forEach(el=>{
        el.selection= {state:false,timer:null} 
      })

      
      data.setTodos({...data.Todos , list : [...data.Todos.list] })
      data.setSelectedList( [] ) 

      document.querySelector('.create').style='pointer-events:fill'

    }

    console.log( data.TodosList)
   
  return (
    <>  
   
        <div className="todo-box">
          
          <div className="header">

            <div className='left'>

              <div className='greet-namesake'>
                <div className="greet">
                  Good morning ,
                </div> 
                <div className="namesake">
                  @Rachel
                </div>
              </div>

              <div className='date' style={{fontStyle:'italic'}}>
                Monday - 24 nov 2023
              </div>

            </div>

            <div className='right'>

              <img src={null} alt="failure" />
              <div className="selection-tasks">
                <div className="selection">
                  <span></span>
                  <span></span>
                </div>
                <div className="reverse">
                 
                </div>
                <span onClick={handleClearance}> Clear all </span>
              </div>

            </div>

          </div>   

          <div className={  data.TodosList && data.TodosList.length > 0 ?"todo-list":"todo-list flex"}>
            {data.TodosList.length > 0 || data.pinnedEls.length > 0 ?(
             data.TodosList
              )
            :" Your list is empty !"}
          </div>
             
        </div>

    
    </>
  )
}
