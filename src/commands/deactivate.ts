import { licenseDeactivate } from "../actions/license-service";

export default async (): Promise<void> => {
    console.log("\nLicense Deactivation\n");
    await licenseDeactivate();
};