'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styled from 'styled-components';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {TrashContainer} from '@feature/trash/components/molecule';
import {Filter} from '@feature/trash/components/organism';
import {useThrash} from '@feature/trash/hook';

export type FilterType = 'reply' | 'letter';

const TrashBox = () => {
  const [filter, setFilter] = useState<FilterType>('reply');
  const {trashList, restoreTrash} = useThrash();
  const {handleOpen} = useDrawer();
  const route = useRouter();

  const goToTrash = (id: number) => route.push(`trash-box/${id}`);

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'HamburgerBlack',
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '휴지통',
      }}
      headerRightProps={{
        icon: 'Home',
      }}>
      <HeaderContainer>
        <Filter filter={filter} setFilter={setFilter} />
      </HeaderContainer>
      <div style={{display: 'grid', gap: 16}}>
        {trashList?.length !== 0 ? (
          trashList.map(trash => (
            <TrashContainer
              key={trash.id}
              id={trash.id}
              deletedAt={trash.deletedAt}
              title={trash.title}
              onContainerClick={goToTrash}
              onButtonClick={restoreTrash}
            />
          ))
        ) : (
          <NoTrash>휴지통이 비어있어요!</NoTrash>
        )}
      </div>
    </EmptyLayout>
  );
};

export default TrashBox;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 0;
  color: ${({theme}) => theme.color.neutral[500]};
`;

const NoTrash = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
