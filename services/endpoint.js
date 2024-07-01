

const API = {

    invokekyc: (Uid= "") => `admin/invoke-kyc-process-flag?uid=${Uid}`,
    validEmailPassword: () => `admin/login`,
    kyccount: (Uid= "") => `/admin/kycCount?uid=${Uid}`,
    genratereport: (uid= "") => `/admin/generate-report?uid=${uid}`,
    sendsms: (uid= "") => `/admin/send-sms?uid=${uid}`


}

export default API;