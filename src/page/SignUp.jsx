import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ api_url }) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

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
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-300 p-6">
            {/* Left Section */}
            <div className="text-center md:text-left mb-6 md:mb-0 md:w-1/2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                    Air Quality Index
                </h1>
                <p className="text-gray-700 mt-2">Stay updated with the latest air quality insights.</p>
            </div>

            {/* Right Section - Form */}
            <div className="flex flex-col items-center justify-center gap-4 shadow-xl py-8 bg-white rounded-3xl p-6 w-full max-w-md">
                <h1 className="text-xl sm:text-2xl font-semibold">Sign Up</h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="number" id="phone" placeholder="Enter your phone number"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
                    </div>
                    <button type="submit"
                        className="w-full bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
