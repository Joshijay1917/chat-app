import React from 'react'

const Send = ({msg}) => {
  return (
    <div className="send w-full my-[10px]">
          <p className='w-[48%] left-[50.5%] relative bg-[#404040] p-[15px] rounded-[12px]'>{msg}</p>
    </div>
  )
}

export default Send
