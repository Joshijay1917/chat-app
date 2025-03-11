import React from 'react'

const Content = ({user, userclick}) => {
  return (
    <div onClick={e=>userclick(e)} className="user hover:cursor-pointer hover:bg-[#595959] flex bg-[#424242] text-white mx-[11px] my-[18px] rounded-[20px] p-[7px] gap-4">
        <img src="/images/default_profile_normal.png" alt="" className="userdm rounded-full w-[50px] h-[50px]" />
        <div className='flex flex-col'>
            <h1 className='text-[19px]'>{user}</h1>
            <p className='text-[12px]'>hey i am using this new chatApp</p>
        </div>
    </div>
  )
}

export default Content
