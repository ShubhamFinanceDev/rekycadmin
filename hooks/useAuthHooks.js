
import React, { useState } from 'react';
import axios from "axios";
import API from '@/services/endpoint';
import errorHandler from '@/utils/handler.utils';
import { useRouter } from 'next/navigation'

const useAuthHooks = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const userSubmitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const { data } = await axios.post(API.validEmailPassword(), { email, password });
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


    ////upload file 
    const [uploadFile, setUploadFile] = useState({
        file: null,
        error: '',
    });

    const uploadFileChangeHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setUploadFile({ file: selectedFile, error: '' });
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
        {
            formData, userSubmitHandler,inputChangeHandler,
            uploadFile, invokeUploadFileSubmitHandler,uploadFileChangeHandler

        }
    )
}

export default useAuthHooks
