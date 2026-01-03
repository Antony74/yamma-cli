import { exec, ExecOptions } from 'child_process';

export const execCmd = (
    command: string,
    options?: ExecOptions,
): Promise<string> => {
   console.log(command);

    return new Promise((resolve, reject) => {
        exec(
            command,
            { env: process.env, ...options, encoding: 'utf-8' },
            (error, stdout, stderr) => {
                resolve(stdout);
            },
        );
    });
};
