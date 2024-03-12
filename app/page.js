"use client"

import React, { useState } from 'react';
import axios from "axios";
import API from '@/services/endpoint';
import errorHandler from '@/utils/handler.utils';
import Footer from '@/component/core/Footer';
import Branding from '@/component/core/Branding';

const HomePage = () => {
    const [uploadFile, setUploadFile] = useState({
        file: null,
        error: '', // Initialize error state
    });

    const uploadFileChangeHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setUploadFile({ file: selectedFile, error: '' }); // Clear error if file format is correct
        } else {
            setUploadFile({ file: null, error: 'Wrong file format' });
        }
    };

    const invokeUploadFileSubmitHandler = async (e) => {
        e.preventDefault();
        if (!uploadFile.file) return;

        try {
            const formData = new FormData();
            formData.append('file', uploadFile.file);
            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(API.invokekyc(), formData, headers);

            // Assuming the server returns a message
            if (data.success) {
                setUploadFile({ file: null, error: '' });
                snackbar(data.msg);
            } else {
                setUploadFile((prevState) => ({ ...prevState, error: data.msg }));
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="m-3">
                <div className="container mt-3">
                    <Branding />
                    <form className="row align-items-end" onSubmit={invokeUploadFileSubmitHandler}>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-11">
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
                    <div className='errorcontainer success-container'>
                        {/* <h1 className="success-container">Success</h1> */}
                        {uploadFile.error && <p className="error-message">{uploadFile.error}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
