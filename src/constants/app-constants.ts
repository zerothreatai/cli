export let isLicenseClaimed: boolean = false;
export let dockerComposeAcr: string = '';

export const setLicenseClaimed = (value: boolean): void => {
    isLicenseClaimed = value;
};

export const setDockerComposeAcr = (value: string): void => {
    dockerComposeAcr = value;
};