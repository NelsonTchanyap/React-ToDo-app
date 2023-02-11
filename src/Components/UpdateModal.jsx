import React, { useEffect, useRef, useState ,useContext } from 'react'
import {updateContext}  from '../Contexts/UpdateContextProvider'

export default function UpdateModal( props ) {
  
  const mes = [ false , false , false , false , false ]
  
  const [ validationMessageStates , toggleValidationMessage ] = useState(mes)
  const [ requiredMessageStates , toggleRequiredMessage ] = useState(mes)
  
  const { modalsState , toggleModals , Todos , setTodos  } = props.data

  const inputs = useRef([])
  const updateBox = useRef()
  const panelButtons = useRef([])
  
  const value = useContext(updateContext)

  console.log(value.TodosList)

  const [ focus , setFocus ] = useState( [ false , false , false ,false ] )

  const [ file , setFile ] = useState( "" )
  
  const [ charCounter , setCharCounter ] = useState( 40 )
  const [ designation , setDesignation ] = useState( "" )


  const [ savingState , setUpdatingState ] = useState( false )
  const [ onStreakState , setStreakState ] = useState( false )


  useEffect(()=>{

    updateBox.current.addEventListener("keypress", e => {

      if ( e.key == "Enter" ) {
        panelButtons.current[1].click()
        // alert(e.key)
      }
      
    })
    
  },[])

  const handleDesignChange = ( e , index ) => {

    focusable( e , index )
    
    if ( e.value.length === 40 ) return
    
    setDesignation( e.value ) 

  }
  
  
  const addInputs = ( el ) => {
      if ( el && !inputs.current.includes(el) ) inputs.current.push(el)
  }
   
  const addButtons = ( el ) => {
      if ( el && !panelButtons.current.includes(el) ) panelButtons.current.push(el)
  } 
    

  const handleCancelation = ( e ) => {
      
      // e.preventDefault()
      e.target.style = " pointer-events:none "
      setTimeout(()=>{
        e.target.style = " pointer-events:fill "
      },3000)
      
      inputs.current.forEach( ( element , index )  => {

        if (index == 0) {
        if ( element.files[0] ) {
          element.files[0].value = "" ; setFile("") 
        }
        }  
        if (index === 1) element.value = "" 
        if (index === 2) element.value = "00"
        if (index === 3) element.value = "00"
        if (index === 4) element.value = ""
        
      })

      setDesignation("")
      setCharCounter(40)
      setUpdatingState( false )
      setFocus( [ false , false , false , false ] )
      toggleRequiredMessage([false,false,false,false,false])
      toggleValidationMessage([false,false,false,false,false])
      toggleModals( { ...modalsState , update : !modalsState.update } )

    }

    const handleSubmit = ( e ) => {
      e.preventDefault()
    }
    
    const handleUpdate = ( e ) => {  
    
      validation( inputs , validationMessageStates , toggleValidationMessage , requiredMessageStates ,toggleRequiredMessage) 
     
      if( !requiredMessageStates.includes( true ) && !validationMessageStates.includes( true ) ) {

        setUpdatingState( true )
        // updateBox.current.scrollBy( 0 , -170 ) 
        
        panelButtons.current[1].innerHTML = " <span> Updating... </span> "
        e.target.classList.add("onUpdate")

        panelButtons.current[0].style = " pointer-events : none"
        updateBox.current.style = " pointer-events:none"

        setTimeout(()=>{

          setUpdatingState( false )

          panelButtons.current[1].innerHTML = " <span> Save </span> "
          panelButtons.current[1].classList.remove("onSave")

          panelButtons.current[0].style = " pointer-events : fill"
          updateBox.current.style = " pointer-events:fill"

          inputs.current.forEach( ( element , index )  => {

            if (index == 0) {
            if ( element.files[0] ) {
              element.files[0].value = "" ; setFile("") 
            }
            }  
            if (index === 1) element.value = "" 
            if (index === 2) element.value = "00"
            if (index === 3) element.value = "00"
            if (index === 4) element.value = ""
            
          })
    
          setDesignation("")
          setCharCounter(40)

          setTimeout(()=>{

            toggleModals({...modalsState , update: false})

          },1500)


          setFocus( [ false, false , false , false , false ] )

        },5000)
        
     

        if( inputs.current[0].value.length > 0 && inputs.current[4].value.length  < 7 ) {
            
          const Now = new Date()
          const Month = new Date().getMonth() + 1
 
          const hoursValue =  parseInt( inputs.current[2].value ) * 3600 * 1000
          const minutesValue = parseInt( inputs.current[3].value ) * 60 * 1000
          
          const currentDate =   new Date( `${Now.getFullYear()}-${Month}-${Now.getDate()} 00:00:00` ).getTime()

          let currentTime = currentDate + hoursValue + minutesValue
          
          Todos.list.map(el=>{

            if(el.id === value.data.id){
               return  el = { id : new Date().getTime() , added:true, image : URL.createObjectURL( inputs.current[0].files[0]) , 
                    designation : inputs.current[1].value , time : `${ inputs.current[2].value } : ${ inputs.current[3].value}`,
                    timer : currentTime , selection:{state :false, timer:null} }
            }

          })

          setTodos(Todos)
            
  
        }
  
        if( inputs.current[0].value.length == 0 && inputs.current[4].value.length  < 7 ) {
          
          const Now = new Date()
          const Month = new Date().getMonth() + 1
          
          const hoursValue =  parseInt( inputs.current[2].value ) * 3600 * 1000
          const minutesValue = parseInt( inputs.current[3].value ) * 60 * 1000
          
          const currentDate =  new Date( `${Now.getFullYear()}-${Month}-${Now.getDate()} 00:00:00` ).getTime()

          let currentTime = currentDate + hoursValue + minutesValue
          
          Todos.list.map(el=>{

            if(el.id === value.data.id){
                return el = { id : new Date().getTime() ,added:true, image : null , 
                    designation : inputs.current[1].value , time : `${ inputs.current[2].value } : ${ inputs.current[3].value}`,
                    timer : currentTime , selection:{state :false, timer:null}}
            }

          })

          setTodos(Todos)
          
  
        }
  
        if( inputs.current[0].value.length > 0 && inputs.current[4].value.length  > 7 ) {
  
          const Now = new Date()
          
          const hoursValue =  parseInt( inputs.current[2].value ) 
          const minutesValue = parseInt( inputs.current[3].value ) 
          
          const pickedDateTime =  new Date( inputs.current[4].value+` ${hoursValue}:${minutesValue}:${ Now.getSeconds()}` ).getTime()

          let currentTime = pickedDateTime 
          
          Todos.list.map(el=>{

            if(el.id === value.data.id){
              return  el = { id : new Date().getTime() ,added:true, image : inputs.current[0].value , 
                    designation : inputs.current[1].value , time : null ,
                    timer : currentTime , selection:{state :false, timer:null}}
            }

          })

          setTodos(Todos)

  
        }
  
        if( inputs.current[0].value.length == 0 && inputs.current[4].value.length  > 7 ) {
            
          const Now = new Date()
  
          const hoursValue =  parseInt( inputs.current[2].value ) 
          const minutesValue = parseInt( inputs.current[3].value )
  
          let currentTime = new Date( inputs.current[4].value+` ${hoursValue}:${minutesValue}:${ Now.getSeconds()}` ).getTime()
          
          Todos.list.map(el=>{

            if(el.id === value.data.id){
              return  el = { id : new Date().getTime() ,added:true, image : null , 
                    designation : inputs.current[1].value , time : null ,
                    timer : currentTime , selection:{state :false, timer:null} }
            }

          })

          setTodos(Todos)
          
  
        }

       
      }

    /* 
      console.dir(ful.current.files)
      setFile(URL.createObjectURL(ful.current.files[0])) 

     */
    
  } 

  
  const focusable = ( e , index ) => {
    
      if ( index == 0  ) {
        
      if( e.value.length == 0 ){

        setCharCounter( 40 ) ;
        return

      }

      if ( e.value.length > 0 ){

        requiredMessageStates[1] = false
        toggleRequiredMessage([...requiredMessageStates])  

        focus[index] = true ; setFocus( [ ...focus ] )
        
        if ( e.value.length > 6 ) validationMessageStates[1] = false
        if ( e.value.length <= 6 ) validationMessageStates[1] = true
        if ( e.value.length == 0 ) validationMessageStates[1] = false

        toggleValidationMessage([...validationMessageStates])

        if ( e.value.length == 40 ) { setCharCounter( 0 ) ; return }

        setCharCounter( current => current = 40 - e.value.length )
        // alert(requiredMessageStates+''+validationMessageStates)
        return
      }


      }
      if( index == 1 ) {

        if ( e.value > 0 ){
          
        focus[index] = true 

        requiredMessageStates[ 2 ] = false

        toggleRequiredMessage( [ ...requiredMessageStates ]) 
        setFocus( [ ...focus ] )
           
        return
          
        }

      }

      if( index == 2 ) {

        if ( e.value > 0 ) {
          
          focus[index] = true ; 
          
          requiredMessageStates[ 2 ] = false
          requiredMessageStates[ 3 ] = false

          toggleRequiredMessage( [ ...requiredMessageStates ]) 
        
          setFocus( [ ...focus ] )

           return 

          }

      }
      if( index == 3 ){

        if( e.value.length > 9 ){

          const Now = new Date()
          const month =  new Date().getMonth() + 1 
         
          const pickedD =  new Date( ` ${e.value} ${Now.getHours()}:${ Now.getMinutes()}:${ Now.getSeconds()}` ).setSeconds(new Date().getSeconds()+1)
          const diff = pickedD - new Date()
      

          if ( new Date().getTime() < pickedD ){

            if( inputs.current[2].value < Now.getHours() ){

              inputs.current[2].value = Now.getHours()
              inputs.current[3].value = Now.getMinutes()

            }

          }
          else{
            validationMessageStates[ 4 ] =  true
            validationMessageStates[ 2 ] = false  
            validationMessageStates[ 3 ] = false
            
            toggleValidationMessage( [ ...validationMessageStates ] )
          }
          
          if( new Date( inputs.current[4].value ).getDate() === Now.getDate()  && parseInt(inputs.current[2].value) === Now.getHours()  ){
          
            validationMessageStates[ 4 ] =  false 
            validationMessageStates[ 2 ] = true  
            validationMessageStates[ 3 ] = true
            
            toggleValidationMessage( [ ...validationMessageStates ] )
  
          }

          focus[index] = true
          focus[1] = true
          focus[2] = true

          setFocus( [ ...focus ] )

          requiredMessageStates[2] = false 
          toggleRequiredMessage([ ...requiredMessageStates ])

          return  
          
        }

      }
      
      focus[index] = false
      setFocus( [ ...focus ] )

    }

  //  new Date("2123-02-08").toString().substring(8,10)
  //  const moment = DateDiff( Date.now() , new Date("2022-12-30") )

   
  return (

    <div ref = { updateBox } className={ modalsState.create  ? "Modals active" : "Modals"} >

      <form onSubmit={handleSubmit} action="">

          <h1> <i>Update</i> </h1>
          <div className="close" onClick={ (e) => handleCancelation(e) }>
            Close 
          </div>

          <fieldset className="Description-Group">

            <div className='Description'>

              <div className="image">

                <div  className="image-placeholder">
                  { ( inputs.current[0].value.length > 2 ) ? (
                      <img src="../public/images/" alt="" />
                  ):(
                    <img src="../public/images/" alt="" />
                  )}
                </div>
                <input ref={addInputs} index = "0" type="file" name="file" id="image" style={{display:"none"}} />
                <button className='btn-image' > Image </button>
                <span className="annotation optional"> ( Optional ) </span>
              </div>

              <div className="todo-Designation">

                <span > Designation : </span>

                <div className={ requiredMessageStates[1] ? "input required"
                 : validationMessageStates[1] ? "input warning" : focus[0] ? "input focus" : "input" } >

                  <input ref={addInputs} index = "1" type="text" name="designation"
                  placeholder='what do you planify ?' value={ value.designation } onChange={ ( e ) =>  handleDesignChange(e.target , 0 ) }  /> 

                  <span className=" max-length "> { charCounter } </span>

                  <div></div>

                </div>

                { requiredMessageStates[1] ? 

                  ( <span className='annotation required'>
                    Required .  
                    </span>)

                  : validationMessageStates[1] 
                  ? 
                  ( <span className='annotation warning'>
                    Too short ! Please , enter a text of a least 07 caracters .  
                    </span>)
                  :
                    null
                
                }

              </div>
             
            </div>

            <legend>Description</legend>

          </fieldset>

          <fieldset className="Timing-Group">
            
            <div className='Timing'>

              <div className="Time">

                <div className="time-segment">

                  <div className={ requiredMessageStates[ 2 ]  && !focus[1] ? "Hour required"
                  :
                  validationMessageStates[ 2 ] ? "Hour warning"
                  :
                  focus[1] ? "Hour focus "
                  :
                  " Hour " } >

                    <span className="Label"> Hours : </span>
                    <input ref={addInputs} index = "2" type="number" name="hours" min="00" max="23" defaultValue={Math.trunc(value.time/3600)} onChange={ ( e ) =>  focusable(e.target , 1 ) } onKeyUp={ (e) => onkeyUpon(e , requiredMessageStates , toggleRequiredMessage )}  arrow="false" />
                    
                  </div>

                  <div className={ requiredMessageStates[ 2 ] && !focus[2] ? "Minutes required"
                  :
                  validationMessageStates[ 3 ] ? "Minutes warning"
                  :
                  focus[2] ? "Minutes focus "
                  :
                  " Minutes " } >

                    <span className="Label"> Minutes : </span>
                    <input ref={addInputs}  index = "3" type="number"  name="minutes" min="00" max="59" defaultValue={Math.trunc(value.time%3600)} onChange={ ( e ) =>  focusable( e.target , 2 ) } onKeyUp={ (e) => onkeyUpon(e , requiredMessageStates , toggleRequiredMessage )} />
                    
                  </div>

                </div>
                
                <div className="annotation-segment">

                  {
                    requiredMessageStates[2]  ?
                    <span className='annotation required'> Required . </span>
                    :
                    validationMessageStates[3] || validationMessageStates[2] ?
                     <span className='annotation warning'> Please , enter a time greater than the current date . </span>
                    : null

                  }

                </div>

              </div>

              <div className={ requiredMessageStates[ 4 ] && !focus[3] ? "Deadline required"
                  :
                 validationMessageStates[ 4 ] ? "Deadline warning"
                  :
                  focus[3] ? "Deadline focus "
                  :
                  " Deadline " }
                >

                <div>

                  <span className="Deadline-Label"> Pick a <i> deadline </i> : </span>
                  <input ref={addInputs} index = "4" type="Date" name="deadline"  onChange={ ( e ) =>  focusable( e.target , 3 ) }  /> 
                  {  validationMessageStates[4] &&( <span className='annotation warning'> Select an upcoming date . </span> ) }
                  <span className='annotation optional'> ( Optional ) </span>
                  
                </div>

              </div>

            </div>

            <legend>Timing</legend>
            
          </fieldset>

          <div className="button-panel">

            <div className="cancel-save">

              <button ref = { addButtons } className="cancel" onClick={(e)=>handleCancelation(e)}>
                Cancel
              </button>
              <button ref = { addButtons } className={savingState ? "save onSave" : "save" } onClick={handleUpdate}>
                <span> Update </span>
              </button>

            </div>
          </div>
            
      </form>
                  
    </div>

  )
}

function DateDiff(now , deadline){

  const diff = deadline.getTime() - now 
  return diff

}

function validate(  input , inputs , message , setter ,rMessState , rSetter ){
  
  // Designation field

  if ( input.name =="designation" && input.value.length <= 6 )  {
    
    message[ input.getAttribute("index") ] =  true
    setter( [ ...message ] )
  }
  if ( input.name == "designation" && input.value.length > 6 )  {
    
    message[ input.getAttribute("index") ] =  false
    setter( [ ...message ] )
  }

  // Timing section fields validation

  if ( input.name == "hours" ) {

    let period = ""
    let currentTime = ""
  
    if( inputs.current[4].value.length > 8 ){
      
      const Now = new Date()

      
      const hoursValue =  parseInt( inputs.current[2].value ) 
      const minutesValue = parseInt( inputs.current[3].value ) 
      
      
      const pickedDateplusTime =  new Date( inputs.current[4].value+` ${hoursValue}:${ minutesValue}:${Now.getSeconds()}` ).getTime()
      currentTime = pickedDateplusTime

      // Magnificent : alert( currentTime + "  |  " + pickedDate )

      period = Math.ceil(  ( currentTime - Now ) / 1000 )

      // The Case  user has picked an anterior Date
      
      if ( period < 0 ){

        if( new Date( inputs.current[4].value ).getDate() === Now.getDate()  ){
          
          message[ 4 ] =  false 
          message[ 2 ] = true  
          message[ 3 ] = true

          if(  parseInt( input.value ) <= Now.getHours() ){

            message[ 2 ] = false  
            message[ 3 ] = true 
        
            if( parseInt( input.value ) < Now.getHours()){

              message[ 2 ] = true  
              message[ 3 ] = false
              

            }
         

          }
          else{

            if( inputs.current[3].value > Now.getMinutes() ){

              message[ 2 ] = true
              message[ 3 ] = false 

            }

          }
          
          setter( [ ...message ] )
          return

        }
        
        message[ 4 ] = true
        message[ 2 ] = false  
        message[ 3 ] = false
        
        setter( [ ...message ] )

      }

      // The Opposite case 

      else {
        
        if( period === 0 ){
          
          message[ 4 ] =  false
          message[2]= true
          message[3]=true
         
          setter( [ ...message ] )
          return

        }
        
       
        message[ 4 ] =  false ;
        message[2] = false ;
        message[3] = false ; 
        setter( [ ...message ] )
        

      }

    }
    else{
     
      if( parseInt( input.value ) > new Date().getHours() ){

        message[ 2 ] =  false
        message[ 3 ] =  false
        
        setter( [ ...message ] )

      }
      else{


        
        if ( parseInt( inputs.current[3].value ) > new Date().getMinutes() ){
          
          message[ 2 ] =  true
          message[ 3 ] =  false
          
          if ( parseInt( input.value ) === new Date().getHours() ) message[ 2 ] =  false

          setter( [ ...message ] )    
          
          rMessState[ 2 ] = false
          rSetter( [ ...rMessState ] )

        }
        else{

          message[ 2 ] =  false 
          message[ 3 ] =  true

          setter( [ ...message ] )
          
          if( parseInt( inputs.current[3].value )  == 0  &&  parseInt( input.value ) == 0 ) rMessState[ 2 ] = true
          if(  parseInt( inputs.current[3].value ) == 0 && parseInt( input.value ) > 0  ) rMessState[ 2 ] = false ; rMessState[ 3 ] = false 
          
          rSetter( [ ...rMessState ] )
          
        }

      }

    }

  }


}

function setRequirements( input , message , setter ){

  if (  input.value.length == 0 )  {
    
    message[ input.getAttribute("index") ] = true
    
    // Spread of Const messageStates to avoid the @Reset behaviour of Component Rendering...
    setter([ ...message ])
    
  }

  if ( input.value.length > 0 && input.getAttribute("type") != "number" ) {
    
    message[ input.getAttribute("index") ] = false
    
    setter([ ...message ])
   
  }

  // if(  ( input.getAttribute("type") == "number" && input.value !== "00" )  ){
    
  //   message[ input.getAttribute("index") ] = false
  //   setter([ ...message ])
    
  // }

}
function validation( inputs , vMessage , vMessageSetter, requiredMessageState , requiredMessageStateSetter ){
 
  inputs.current.forEach( ( element , index ) => {
    
    // requiredMessageState[ 2 ] = false
    // requiredMessageStateSetter ( [...requiredMessageState ] )

    if ( [ 1 , 2 ].includes(index) ) validate( element , inputs , vMessage ,vMessageSetter , requiredMessageState , requiredMessageStateSetter )

    if ( index === 1 ) setRequirements( element , requiredMessageState , requiredMessageStateSetter )
  
  })


}


function onkeyUpon( e , message , setter ){

  message[ e.target.getAttribute("index") ] = false
    
  setter( [ ...message ] )
  

}
