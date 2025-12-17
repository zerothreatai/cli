import { spawn } from "child_process";

export async function executeJS(jsSource:string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath, // node
      ["-e", jsSource],
      { stdio: ["ignore", "pipe", "pipe"] }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", d => (stdout += d.toString()));
    child.stderr.on("data", d => (stderr += d.toString()));

    child.on("close", code => {
      if (code !== 0) {
        reject(new Error(stderr || `JS exited with code ${code}`));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}