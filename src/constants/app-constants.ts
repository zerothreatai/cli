export let dockerComposeAcr: string = '';
export let deleteAcrToken: string = '';
export let fingerPrint: string = '';

export const setDockerComposeAcr = (value: string): void => {
    dockerComposeAcr = value;
};

export const setDeleteAcrToken = (value: string): void => {
    deleteAcrToken = value;
};

export const setfingerPrint = (value: string): void => {
    fingerPrint = value;
};