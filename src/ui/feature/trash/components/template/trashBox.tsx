'use client';

import {useRouter} from 'next/navigation';
import {type KeyboardEvent, useState} from 'react';
import styled from 'styled-components';

import {ToolTip} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {TrashContainer} from '@feature/trash/components/molecule';
import {useThrash} from '@feature/trash/hook';

type FilterType = 'reply' | 'letter';

const TrashBox = () => {
  const [filter, setFilter] = useState<FilterType>('reply');
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const {trashList} = useThrash();

  const goToTrash = (id: number) => route.push(`trash-box/${id}`);

  const handleKeyPress = (event: KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback();
    }
  };

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
        <ToolTip
          message={`휴지통에 있는 편지는 1개월 동안\n보관 후 영구 삭제됩니다.`}
        />
        <FilterContainer>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={event => handleKeyPress(event, () => setFilter('reply'))}
            onClick={() => setFilter('reply')}
            className={filter === 'reply' ? 'active' : ''}>
            답장 목록
          </div>
          <VerticalLine>|</VerticalLine>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={event =>
              handleKeyPress(event, () => setFilter('letter'))
            }
            onClick={() => setFilter('letter')}
            className={filter === 'letter' ? 'active' : ''}>
            편지 목록
          </div>
        </FilterContainer>
      </HeaderContainer>
      <div style={{display: 'grid', gap: 16}}>
        {trashList?.length !== 0 ? (
          trashList.map(trash => (
            <TrashContainer
              key={trash.id}
              id={trash.id}
              deletedAt={trash.deletedAt}
              title={trash.title}
              onClick={goToTrash}
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  font-size: 18px;
  line-height: 26px;

  & > .active {
    color: ${({theme}) => theme.color.primary.pointPink};
    font-weight: 500;
  }
`;

const VerticalLine = styled.div`
  color: ${({theme}) => theme.color.neutral[500]};
  text-align: center;
  font-size: 18px;
  line-height: 26px;
`;

const NoTrash = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
