import React from 'react'

const Receive = ({msg}) => {
  return (
    <div className="receive w-full my-[10px]">
          <p className='w-[48%] left-[1.5%] relative bg-[#404040] p-[15px] rounded-[12px]'>{msg}</p>
    </div>
  )
}

export default Receive
