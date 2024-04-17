"use client"

import React, {useEffect, useState } from 'react';
import Footer from '@/component/core/Footer';
import Branding from '@/component/core/Branding';
import useAuthHooks from '@/hooks/useAuthHooks';

const UploadPage = () => {
    const {uploadFile, kyccount, fetchkyccount, invokeUploadFileSubmitHandler,uploadFileChangeHandler,handleLogout}= useAuthHooks()


    useEffect(()=>{
        fetchkyccount()
    },[])

    return (
        <div className="container-fluid">
        <div className="m-3">
                <div className="d-flex justify-content-end mb-2">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            <div className="container mt-3">
                <Branding />
               <b><p>ExistingKyc: {kyccount.existingKyc}</p></b>
               <b> <p>UpdatedKyc: {kyccount.updatedKyc}</p></b>
                <form className="row align-items-end mt-2" onSubmit={invokeUploadFileSubmitHandler}>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Upload File</label>
                                <input
                                    type="file"
                                    name="file"
                                    className="form-control"
                                    accept=".xlsx"
                                    required
                                    onChange={uploadFileChangeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" type="submit">
                            Upload
                        </button>
                    </div>
                </form>
                <div className="errorcontainer success-container">
                    {uploadFile?.error && <p className="error-message">{uploadFile?.error}</p>}
                    {uploadFile?.success && <p className="success-container">{uploadFile?.success}</p>}
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
};

export default UploadPage;