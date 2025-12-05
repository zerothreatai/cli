export interface ApiEndpoints {
    acrToken: string;
    licenseApi: string;
    onPremLicenseCloudeApi: string;
}

export const API_CONFIG: ApiEndpoints = {
    acrToken: 'https://zt-rc1-1-app-containerapps.agreeablestone-ae5e635a.centralus.azurecontainerapps.io/api/on-prem/license/acr-token',
    licenseApi: 'http://localhost:3201/api/license',
    onPremLicenseCloudeApi: 'https://zt-rc1-1-app-containerapps.agreeablestone-ae5e635a.centralus.azurecontainerapps.io/api/on-prem/license',
};