'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styled from 'styled-components';

import {useIntersectionObserver} from '@/hook/query';
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
  const {setTarget} = useIntersectionObserver({
    fetchNextPage: trashList.fetchNextPage,
  });

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
      <Container>
        {trashList?.data.length !== 0 ? (
          trashList.data.map(trash => (
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
        <div ref={setTarget} style={{width: 1, height: 1}} />
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
