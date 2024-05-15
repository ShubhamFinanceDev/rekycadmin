"use client"
import React, { useState } from 'react';
import Branding from '@/component/core/Branding';
import useAuthHooks from '@/hooks/useAuthHooks';



const HomePage = () => {

    const {formData, userSubmitHandler,inputChangeHandler}= useAuthHooks()
    
    return (

        <div className="container">
            <Branding />
            <div className="login-page-outer-container">
                <form
                    onSubmit={userSubmitHandler}
                    className="login-form-inner-container"
                >
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData?.email}
                            onChange={inputChangeHandler}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mt-2">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData?.password}
                            onChange={inputChangeHandler}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mt-3 btn">
                        <button className='btn btn-primary' type="submit">Submit</button>
                    </div>
                    {formData?.error && <p className="error-message" >{formData?.error}</p>}
                </form>
            </div>
        </div>
    );
};

export default HomePage;
