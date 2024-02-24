import {createQueryKeyStore} from '@lukemorales/query-key-factory';

import type {LetterBoxProps} from './useLetterBox';

export const letterBoxQueryKeys = createQueryKeyStore({
  letterBox: {},
  letterDetail: {
    detail: (id: LetterBoxProps['id']) => ['letterId', id],
  },
});
