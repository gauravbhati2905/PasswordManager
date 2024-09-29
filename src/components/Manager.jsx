// import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hide.png")) {
            ref.current.src = "icons/show.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/hide.png"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
        setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        setform({ site: "", username: "", password: "" })
        toast('Password saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else{
        toast('Error: Password not saved!')
    }
    }
    
    const editPassword = (id) => {
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        // setpasswordArray([...passwordArray, {.../form, id: uuidv4()}])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    }
    
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this id ?")
        if(c){
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-full w-full bg-slate-400 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="p-2 md:p-0 md:mycontainer min-h-[82.5vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="icons/show.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No password to show </div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center gap-1'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <img width={15} src="icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center gap-1'>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <img width={15} src="icons/copy.png" alt="" />
                                            </div>
                                        </div>

                                    </td>

                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <span>{item.password}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <img width={15} src="icons/copy.png" alt="" />
                                            </div>
                                        </div>

                                    </td>

                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                                <img width={30} src="icons/edit.svg" alt="" />
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                                <img src="icons/delete.svg" alt="" />
                                            </span>
                                        </div>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
