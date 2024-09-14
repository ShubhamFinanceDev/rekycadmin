"use client"

import React, {useEffect, useState } from 'react';
import Branding from '@/component/core/Branding';
import useAuthHooks from '@/hooks/useAuthHooks';

const UploadPage = () => {
    const {uploadFile, msgs,kyccount, fetchkyccount, invokeUploadFileSubmitHandler,uploadFileChangeHandler,handleLogout,genratereportSubmitHandler,sendsmsHandler}= useAuthHooks()


    useEffect(()=>{
        fetchkyccount()
    },[])

    return (
        <div className="" style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="">
                <header className="p-3">
                    <img src="/logo.png" alt="logo" />
                    <h1 className="header-text">UPDATION FORM FOR REKYC ADMIN<br/>
                    <p className="header-tital">(Fields marked with * are mandatory)</p></h1>
                    <button className='btn btn-light btn-sm' onClick={handleLogout}>Logout</button>
                </header>
                <div className='options'>
                </div>
                <div className="container mt-3">
                    <form className="row align-items-end mt-2" onSubmit={invokeUploadFileSubmitHandler}>
                     <div className="col-md-4 mt-4">
                       <div className="card">
                         <div className="card-body">
                           <div className="row">
                             <label className="col-md-4 lablefont">Existing KYC:</label>
                             <div className="col-md-8">{kyccount.existingKyc}</div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="col-md-4 mt-4">
                       <div className="card">
                         <div className="card-body">
                           <div className="row">
                             <label className="col-md-4 lablefont">Updated KYC:</label>
                             <div className="col-md-8">{kyccount.updatedKyc}</div>
                           </div>
                         </div>
                       </div>
                     </div>
                    <div className="col-md-3 d-flex mt-3">
                            <button className="btn btn-primary" type='button' onClick={genratereportSubmitHandler}>
                                MIS Report
                            </button>                    
                    </div>

                        <div className="col-md-12 UploaDFilemargin">
                            <div className="row mt-4">
                                <label className="col-md-2">Upload File :<span/></label>
                                <div className="col-md-7">
                                    <input
                                        type="file"
                                        name="file"
                                        className="form-control"
                                        accept=".xlsx"
                                        required
                                        onChange={uploadFileChangeHandler}
                                    />
                                </div>
                            <div className="col-md-1">
                            <button className="btn btn-primary uploadclass" type="submit">
                                Upload
                            </button>
                        </div>
                        <div className="col-md-2 ">
                            <button className="btn btn-primary" type='button' onClick={sendsmsHandler}>
                                Send Sms
                            </button>
                        </div>
                            </div>
                        </div>

                    </form>
                    <div className="errorcontainer success-container">
                        {uploadFile?.error && <p className="error-message">{uploadFile?.error}</p>}
                        {uploadFile?.success && <p className="success-container">{uploadFile?.success}</p>}
                        {msgs && <p className="container">{msgs}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
