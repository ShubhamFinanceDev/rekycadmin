

const API = {

    invokekyc: (Uid= "") => `admin/invoke-kyc-process-flag?uid=${Uid}`,
    validEmailPassword: () => `admin/login`,
    kyccount: (Uid= "") => `/admin/kycCount?uid=${Uid}`,
    genratereport: (Uid= "") => `/admin/generate-report?uid=${Uid}`

}

export default API;