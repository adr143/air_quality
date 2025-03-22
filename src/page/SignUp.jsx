import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp({api_url}) {
    const navigate = useNavigate();
    const [ info, setInfo ] = useState({})

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${api_url}/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });
    
            const result = await response.json();
            
            if (response.ok) {
                console.log("Success:", result);
                navigate("/"); // Redirect to home or success page
            } else {
                console.error("Error:", result.error);
            }
        } catch (error) {
            console.error("Request failed", error);
        }
    };
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-start md:place-items-center h-screen bg-blue-300 p-4">
            <div>
                <h1 className='text-[3rem] cursor-pointer' onClick={() => navigate("/")} >Air Quality Index</h1>
                <p>This is just a placeholder text</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-4 shadow-2xl py-8 bg-white rounded-[3rem] p-4'>
                <h1 className='text-2xl'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col w-sm place-items-center'>
                    <div className='w-full grid grid-cols-2 gap-4 my-4 mx-4 p-4'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" id='name' placeholder="Name" className="p-1" onChange={handleChange} />
                    </div>
                    <div className='w-full grid grid-cols-2 gap-4 my-4 mx-4 p-4'>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id='email' placeholder="Email" className="p-1" onChange={handleChange} />
                    </div>
                    <div className='w-full grid grid-cols-2 gap-4 my-4 mx-4 p-4'>
                        <label htmlFor='number'>Phone Number</label>
                        <input type="tel" name="number" id='phone' placeholder="Phone Number" className="p-1" onChange={handleChange} />
                    </div>
                    <button className='w-sm my-6 bg-blue-500 hover:bg-blue-700 text-white hover:cursor-pointer p-4 rounded-2xl' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )

}  