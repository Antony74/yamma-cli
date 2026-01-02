import { Unifier } from 'yamma-hl-api';
import { info } from './diagnosticsString';
import { processUnifierResult } from './unify';

export const get = async (unifier: Unifier, proofIds: string[]) => {
    for (const proofId of proofIds) {
        info(`getting ${proofId}`);
        const result = unifier.get(proofId);

        await processUnifierResult(result, `${proofId}.mmp`);
    }
};
