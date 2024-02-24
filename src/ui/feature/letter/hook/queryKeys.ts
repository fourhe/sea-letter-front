import {
  createQueryKeys,
  type inferQueryKeys,
} from '@lukemorales/query-key-factory';

import type {LetterHookProps} from './types';

export const letterQueryKeys = createQueryKeys('letters', {
  detail: (id: LetterHookProps['letterId']) => ['letterId', id],
});

export type LetterQueryKeys = inferQueryKeys<typeof letterQueryKeys>;
