"use client"
import React, { useState } from 'react';
import axios from "axios";
import API from '@/services/endpoint';
import errorHandler from '@/utils/handler.utils';
import Footer from '@/component/core/Footer';
import Branding from '@/component/core/Branding';
import { useRouter } from 'next/navigation'


const HomePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const { data } = await axios.post('http://localhost:8070/userKyc/login', { email, password });
            if (data.code === "0000") {
                router.push("/uploadfile");
                console.log(data.code)
            } else {
                setFormData({ ...formData, error: data.msg });
            }
        } catch (error) {
            console.error('Error validating email and password:', error);
        }
    };

    return (

        <div className="container">
            <Branding />
            <div className="login-page-outer-container">
                <form
                    onSubmit={handleSubmit}
                    className="login-form-inner-container"
                >
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mt-2">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mt-3 btn">
                        <button className='btn btn-primary' type="submit">Submit</button>
                    </div>
                    {formData.error && <p className="error-message" >{formData.error}</p>}
                </form>
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
