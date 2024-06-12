
import React, { useState } from 'react';
import axios from "@/services/axios";
import API from '@/services/endpoint';
import errorHandler from '@/utils/handler.utils';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';

const useAuthHooks = () => {
    const router = useRouter();

    const [kyccount, setKyccount] = useState([])

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
                Cookies.set("UID", data?.uid)
                router.push("/uploadfile");
            } else {
                setFormData({ ...formData, error: data.msg });
            }
        } catch (error) {
            console.error('Error validating email and password:', error);
        }
    };
    const fetchkyccount = async () => {
        try {
            const Uid = Cookies.get("UID");
            const { data } = await axios.get(API.kyccount(Uid));
            setKyccount(data)
            console.log(data)

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
            const Uid = Cookies.get("UID");
            formData.append('file', uploadFile.file);
            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(API.invokekyc(Uid), formData, headers);
            if (data.code=== "0000") {
                setUploadFile({ file: null, error: '', success:data.msg });
                // snackbar(data.msg);
            } else {
                setUploadFile((prevState) => ({ ...prevState, error: data.msg }));
            }
        } catch (error) {
            errorHandler(error);
        }
    };


    const handleLogout = () => {
        router.push("/");

      };
    

    return (
        {
            formData, userSubmitHandler,inputChangeHandler,handleLogout,
            uploadFile, invokeUploadFileSubmitHandler,uploadFileChangeHandler,
            kyccount,fetchkyccount

        }
    )
}

export default useAuthHooks
