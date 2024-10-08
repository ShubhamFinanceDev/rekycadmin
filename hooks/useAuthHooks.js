
import React, { useState } from 'react';
import axios from "@/services/axios";
import API from '@/services/endpoint';
import errorHandler from '@/utils/handler.utils';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const useAuthHooks = () => {
    const router = useRouter();

    const [kyccount, setKyccount] = useState([])
    const [msgs, setmsg] = useState([])

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

        } catch (error) {
            console.error('Error validating email and password:', error);
        }
    };
    const sendsmsHandler = async () => {
        try {
            const Uid = Cookies.get("UID");
            const { data } = await axios.post(API.sendsms(Uid));
            alert(data.msg)


        } catch (error) {
            console.error('Error validating email and password:', error);
        }
    };

    const generateMISReport = async () => {
        const uid = Cookies.get("UID");
        axios({
            url: `/admin/generate-report?uid=${uid}`, 
            method: "GET",
            responseType: "blob",

        })
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: response.headers["content-type"],
                });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                const contentDisposition = response.headers["content-disposition"];
                let filename = "download.xlsx";
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match && match[1]) {
                        filename = match[1];
                    }
                }
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                toast.error("Error downloading the file:")
            });
    };

    const genratereportSubmitHandler = (e) => {
        e.preventDefault();
        generateMISReport();
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
            kyccount,fetchkyccount,genratereportSubmitHandler,msgs,sendsmsHandler

        }
    )
}

export default useAuthHooks
