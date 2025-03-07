import React from 'react'
import { useForm } from 'react-hook-form'

const Signin = ({changeform, auth}) => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()
    const onSubmit = async(data) => {
        let a = await fetch('http://localhost:3000/signin', {method:"POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)});
        let b = await a.json();
        // console.log(b)
        if(b.status == 204){
            // console.log("Log in succesfully");
            clearErrors("passerror", "usererror");
            auth(data.username);
        }
        else if(b.status == 203){
            setError("passerror", {message:b.message})
        }
        else{
            setError("usererror", {message:b.message})
        }
    }
    const handlechange = ()=>{
        clearErrors("passerror");
        clearErrors("usererror");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-full gap-[30px]' action="/">
            <h1 className='font-bold text-[31px] md:text-2xl'>Log In</h1>
            <div className='flex flex-col gap-[20px] text-wrap text-[21px] w-[60vw] md:w-full md:text-[15px] font-semibold'>
                <label className='flex flex-col relative'>NAME:
                    <input {...register("username", { required: true })} className='outline-none' type="text" placeholder='Username' onChange={handlechange} />
                    <hr className={errors.username ? "text-red-400" : ""} />
                    {errors.username && <span className='text-red-400 absolute bottom-[-26px] md:bottom-[-20px]'>Please Enter Username</span>}
                    {errors.usererror && <span className='text-red-400 absolute bottom-[-26px] md:bottom-[-20px]'>{errors.usererror.message}</span>}
                </label>
                <label className='flex flex-col relative'>PASSWORD:
                    <input {...register("password", { required: { value: true, message: "Please Enter Password" }, minLength: { value: 8, message: "Length is minimum 8" } })} className='outline-none' type="password" placeholder='Password' onChange={handlechange} />
                    <hr className={errors.password ? "text-red-400" : ""} />
                    {errors.password && <span className='text-red-400 absolute bottom-[-26px] md:bottom-[-20px] text-nowrap'>{errors.password.message}</span>}
                    {errors.passerror && <span className='text-red-400 absolute bottom-[-26px] md:bottom-[-20px] text-nowrap'>{errors.passerror.message}</span>}
                </label>
            </div>
            <div className='flex gap-[19px] text-[21px] md:text-[15px] px-7'>
                <button onClick={() => changeform()}>Sign Up</button>
                <input className='bg-blue-600 text-white rounded-xl p-1.5' type='submit' value='Sign In' />
            </div>
            {isSubmitting && <><div className="loading flex justify-center items-center w-dvw h-dvh bg-black z-3 absolute top-[-35vh] md:top-[-26vh] left-[-6vw] md:left-[-68vw] opacity-50">
        <div className="loader w-[150px] h-[150px] bg-white rounded-full relative z-3">
          <div className="load bg-black w-[145px] h-[150px] rounded-[168px] relative left-[2%] animate-spin"></div>
        </div>
      </div></>}
        </form>
    )
}

export default Signin
