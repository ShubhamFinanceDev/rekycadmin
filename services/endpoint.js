

const API = {

    invokekyc: (Uid= "") => `admin/invoke-kyc-process-flag/${Uid}`,
    validEmailPassword: () => `admin/login`,
    kyccount: (Uid= "") => `/admin/kycCount/${Uid}`

}

export default API;