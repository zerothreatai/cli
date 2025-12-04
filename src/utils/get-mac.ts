import * as crypto from 'crypto'
import { machineIdSync } from 'node-machine-id';

export const getSystemMACAddress = () => {
    const rawId = machineIdSync(true);
    return crypto.createHash("sha256")
        .update(rawId + 'zt@onprem')
        .digest("hex");
}