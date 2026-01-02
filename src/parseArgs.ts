import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const commands = [
    'unify',
    'get',
    'compress',
    'decompress',
    'truncate',
] as const;

export type CommonArgs = {
    mmFile: string;
};

export type UnifyArgs = CommonArgs & {
    command: 'unify';
    mmpFiles: string[];
    singleThread: boolean;
};

export type GetArgs = CommonArgs & {
    command: 'get';
    proofIds: string[];
    all: boolean;
};

export type CompressArgs = CommonArgs & {
    command: 'compress';
    proofIds: string[];
    all: boolean;
};

export type DecompressArgs = CommonArgs & {
    command: 'decompress';
    proofIds: string[];
    all: boolean;
};

export type TruncateBeforeArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'before';
    proofIdOrCount: string;
};

export type TruncateAfterArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'after';
    proofIdOrCount: string;
};

export type TruncateCountArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'count';
    proofIdOrCount: string;
};

export type Args =
    | UnifyArgs
    | GetArgs
    | CompressArgs
    | DecompressArgs
    | TruncateBeforeArgs
    | TruncateAfterArgs
    | TruncateCountArgs;

export const examples = {
    unify: [
        'yamma unify demo0.mm th1.mmp',
        'yamma unify set.mm impt.mmp dju1p1e2.mmp',
    ],
    get: ['yamma get demo0.mm th1', 'yamma get set.mm impt dju1p1e2'],
    compress: [
        'yamma compress demo0.mm th1',
        'yamma compress set.mm impt dju1p1e2',
    ],
    decompress: [
        'yamma decompress demo0.mm th1',
        'yamma decompress set.mm impt dju1p1e2',
    ],
    truncate: [
        'yamma truncate set.mm --before dju1p1e2',
        'yamma truncate set.mm --after impt',
        'yamma truncate set.mm --count 100',
    ],
} as const;

export const parseArgs = (argv: string[]): Args => {
    const parsed = yargs(hideBin(argv))
        .scriptName('yamma')
        .command(
            ['unify <mmFile> [mmpFiles...]', 'u'],
            'Unify any given .mmp filenames',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('mmpFilenames', {
                        description: 'Zero or more .mmp files',
                        type: 'string',
                    })
                    .option('single-thread', { alias: 's' })
                    .example(examples.unify[0], '')
                    .example(examples.unify[1], '');
            },
        )
        .command(
            ['get <mmFile> [proofIds...]', 'g'],
            'Get proofs and create .mmp files',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        description:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Create .mmp files for all(!) proofs',
                    })
                    .example(examples.get[0], '')
                    .example(examples.get[1], '');
            },
        )
        .command(
            ['compress <mmFile> [proofIds...]', 'c'],
            'Compress proofs in .mm',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        describe:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Compress all(!) proofs',
                    })
                    .example(examples.compress[0], '')
                    .example(examples.compress[1], '');
            },
        )
        .command(
            ['decompress <mmFile> [proofIds...]', 'd'],
            'Decompress proofs in .mm',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        description:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Decompress all(!) proofs',
                    })
                    .example(examples.decompress[0], '')
                    .example(examples.decompress[1], '');
            },
        )
        .command(
            ['truncate <mmFile> <proofIdOrCount>', 't'],
            'Truncate .mm file',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm filename',
                        type: 'string',
                    })
                    .option('before', {
                        alias: 'b',
                        type: 'boolean',
                        description:
                            'File should be truncated before the given proof',
                    })
                    .option('after', {
                        alias: 'a',
                        type: 'boolean',
                        description:
                            'File should be truncated after the given proof',
                    })
                    .option('count', {
                        alias: 'c',
                        type: 'boolean',
                        description:
                            'File should be truncated at the given count of proofs',
                    })
                    .positional('proofIdOrCount', {
                        description:
                            'Proof to truncate .mm before or after, or total count of proofs desired after truncation',
                        type: 'string',
                    })
                    .example(examples.truncate[0], '')
                    .example(examples.truncate[1], '')
                    .example(examples.truncate[2], '');
            },
        )
        .middleware((argv) => {
            const fullCommand = commands.find(
                (command) => argv._[0] === command.charAt(0),
            );

            argv.command = fullCommand ?? argv._[0];
        })
        .strictCommands()
        .demandCommand(1)
        .parseSync();

    switch (parsed.command) {
        case 'get':
            return {
                command: 'get',
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
            };
        case 'compress':
            return {
                command: 'compress',
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
            };
        case 'decompress':
            return {
                command: 'decompress',
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
            };
        case 'truncate':
            const optionCount = [
                parsed.before,
                parsed.after,
                parsed.count,
            ].filter((flag) => flag === true).length;

            if (optionCount !== 1) {
                console.error(
                    `truncate command expected exactly one --before, --after, --count option.  Found ${optionCount}`,
                );
                process.exit(1);
            }

            if (parsed.before) {
                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'before',
                    proofIdOrCount: parsed.proofIdOrCount as string,
                };
            } else if (parsed.after) {
                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'after',
                    proofIdOrCount: parsed.proofIdOrCount as string,
                };
            } else {
                const countString = parsed.proofIdOrCount as string;
                const count = Number.parseInt(countString);

                if (isNaN(count)) {
                    console.error(
                        `truncate count expected a number.  Found ${countString}`,
                    );
                    process.exit(1);
                }

                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'count',
                    proofIdOrCount: countString,
                };
            }
        case 'unify':
        default:
            return {
                command: 'unify',
                mmFile: parsed.mmFile as string,
                mmpFiles: parsed.mmpFiles as string[],
                singleThread: parsed.singleThread ? true : false,
            };
    }
};
