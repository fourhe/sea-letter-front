import {createQueryKeyStore} from '@lukemorales/query-key-factory';

import type {TrashFilterType} from '@services/interface/trash';

type ThrashKeys = {
  thrash: {
    detail: (id: number) => [number];
  };
  thrashBox: {
    filter: (filter: TrashFilterType) => [TrashFilterType];
  };
};

export const thrashQueryKeys = createQueryKeyStore<ThrashKeys>({
  thrash: {
    detail: (id: number) => [id],
  },
  thrashBox: {
    filter: (filter: TrashFilterType) => [filter],
  },
});
