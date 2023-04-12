import React from 'react'

function Card({id,title, deleteData, updateMode}) {
  return (
    <div className='bg-cc1 p-4 flex w-full rounded-xl shadow-lg gap-2' key={id}>
        
        <h2 className='text-cc4 w-full font-semibold tracking-wide'>{title}</h2>
        <div className='grid gap-1'>
            <button className='px-4 py-1 bg-red-400 text-black rounded-lg font-semibold' onClick={deleteData}>DELETE</button>
            <button className='px-4 py-1 bg-yellow-400 text-black rounded-lg font-semibold' onClick={updateMode}>EDIT</button>
        </div>

    </div>
  )
}

export default Card