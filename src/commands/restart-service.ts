import { exec } from 'child_process';
import { promisify } from 'util';
import LicenseApiService from '../services/license-api-service';
import { dockerComposeAcr, fingerPrint } from '../constants/app-constants';
import { spawn } from "child_process";
import chalk from 'chalk';

const execAsync = promisify(exec);
const PROJECT = "zerothreat";

async function runCompose(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn("docker", ["compose", "-f", dockerComposeAcr, "-p", PROJECT, ...args], {
            stdio: "inherit",
        });
        child.on("close", code => (code === 0 ? resolve() : reject(new Error("compose failed"))));
    });
}

export async function restartService(): Promise<void> {
    // Start docker image a02-conduit
    await execAsync('docker start a02-conduit');
    
    // Call getSystemUp from license api service
    const licenseService = new LicenseApiService();
    await licenseService.getSystemUp();

    try{
        await licenseService.verifySignature(fingerPrint);
        await runCompose(["up", "-d"]);
    } catch (error) {
        console.error(chalk.red(error));
        return
    }
};