import  { useState , useEffect } from 'react'

const App = () => {
const [title, setTitle] = useState('')
const [details, setDetails] = useState('')
const [task, setTask] = useState(
  JSON.parse(localStorage.getItem('notes')) || []
)
useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(task))
}, [task])
const submitHandler = (e) =>{
  e.preventDefault()

  const copyTask = [...task]

  copyTask.push({title,details})
  setTask(copyTask)

  setTitle('')
  setDetails('')

}
const deleteNote=(idx)=>{
  const copyTask = [...task];
  copyTask.splice(idx,1);
  setTask(copyTask)
}

  return (
    <div className='h-screen lg:flex  bg-[#191919]  text-white'>
     
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className='flex items-start p-10  lg:w-1/2 gap-4 flex-col '>

        <h1 className='text-4xl font-bold'>Add Notes</h1>

        {/* pahla input for heading */}
         <input 
        type="text"
         placeholder='Enter Notes Heading'
         className='px-5 w-full font-medium py-2 border-2 outline-none rounded'
         value={title}
         onChange={(e)=>{
          setTitle(e.target.value);
         }}
          />
      
       {/* Deatail wala input */}
       <textarea
        type="text"
         className='px-5 h-35 font-medium w-full py-2 outline-none border-2 rounded'
         placeholder='Write Details'  
         value={details}
         onChange={(e)=>{
             setDetails(e.target.value)
         }}  
         />

         <button
          className='bg-white active:bg-gray-300 font-medium w-full outline-none text-black px-5 py-2 rounded'
          >Add Notes
          </button>

      </form>
      <div className=' lg:w-1/2 lg:border-l-2 p-10'>
      <h1 className='text-4xl font-bold'>Recent Notes</h1>
      <div className='flex flex-wrap items-start justify-start h-[90%] overflow-auto gap-5 mt-5'>
        {task.map(function(elem,idx){
            return <div key={idx} className='flex justify-between flex-col items-start relative h-50 w-40 rounded-2xl text-black  pt-9 pb-6 px-4  bg-cover bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8JoiSknhhYbm-61-zWvIUTsOLXWRb7opCVVkXHmSEQ&s=10")]'>
              <div>
              <h3 className='leading-tight text-xl font-bold'>{elem.title}</h3>
              <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>{elem.details}</p>
              </div>
              <button onClick={()=>{
                deleteNote(idx);
              }} className='w-full bg-red-600 text-white text-xs rounded font-bold py-1 cursor-pointer active:scale-95 '>delete </button>
            </div>
        })}
        
        
        </div>
      </div>
    </div>
  )
}

export default App