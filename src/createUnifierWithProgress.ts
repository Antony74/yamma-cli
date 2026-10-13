import * as color from 'picocolors';

import {
    Unifier,
    ProgressCallback,
    createUnifier,
    ProvableStatement,
} from 'yamma-hl-api';

import { createMmParserAndMonitor, pollMemory } from './heapStatistics';

export const createUnifierWithProgress = (
    mmFilename: string,
    mmData: string,
    singleThread: boolean,
): Unifier => {
    const setProgress = (progress: number, done: boolean) => {
        process.stdout.write(
            '\r' +
                color.gray(
                    `deep parsing ${mmFilename}... ${Math.round(progress * 100)}%`,
                ),
        );

        if (done) {
            console.log();
        }

        pollMemory();
    };

    const progressCallback: ProgressCallback = (message) => {
        if (message.kind === 'progress') {
            setProgress(message.index / message.count, message.index === message.count);
        }
    };

    console.log(color.gray(`parsing ${mmFilename}`));

    const unifier = createUnifier(mmData, {
        mm: {
            progressCallback,
            singleThread,
            createMmParser: createMmParserAndMonitor,
        },
    });

    const proofCount = Array.from(
        unifier.mmParser.labelToNonSyntaxAssertionMap,
    ).filter(([_label, labeledStatement]) => {
        return labeledStatement instanceof ProvableStatement;
    }).length;

    console.log(
        color.gray(`${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'}`),
    );

    return unifier;
};
