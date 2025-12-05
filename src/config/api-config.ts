export interface ApiEndpoints {
    licenseApi: string;
    onPremLicenseCloudeApi: string;
}

export const API_CONFIG = ():ApiEndpoints=>{return {
    licenseApi: process.env.LICENSE_API as string,
    onPremLicenseCloudeApi: process.env.CLOUD_API as string,
}
    
};