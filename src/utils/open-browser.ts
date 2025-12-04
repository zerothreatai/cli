import chalk from "chalk";
import { spawn } from "child_process";
 
export default async function openBrowser(url: string): Promise<void> {
 
    let chromePath: string;
    switch (process.platform) {
        case "win32":
            chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
            break;
        case "darwin":
            chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
            break;
        case "linux":
            chromePath = "/usr/bin/google-chrome";
            break;
        default:
            throw new Error("Unsupported OS");
    }
 
    await new Promise((resolve, reject) => {
        const child = spawn(chromePath, [url]);
        child.on('error', (err) => {
            reject(err);
        });
        child.on('exit', (code, signal) => {
            resolve({ code, signal });
        });
    })
}