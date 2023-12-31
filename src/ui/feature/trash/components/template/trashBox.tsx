'use client';

import {useRouter} from 'next/navigation';
import {type KeyboardEvent, useState} from 'react';
import styled from 'styled-components';

import {ToolTip} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {TrashContainer} from '@feature/trash/components/molecule';

type FilterType = 'reply' | 'letter';

const TrashBox = () => {
  const [filter, setFilter] = useState<FilterType>('reply');
  const {handleOpen} = useDrawer();
  const route = useRouter();

  const goToHome = () => route.push('/main');
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
        onClick: goToHome,
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
        {dummy.map(trash => (
          <TrashContainer
            key={trash.id}
            id={trash.id}
            deletedAt={trash.deletedAt}
            title={trash.title}
            onClick={goToTrash}
          />
        ))}
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

const dummy = [
  {
    id: 1,
    title: '고민이 있습니다.',
    deletedAt: '2022-12-30 14:00',
    isWriter: true,
  },
  {
    id: 2,
    title: '고민이 있습니다22',
    deletedAt: '2022-12-30 14:00',
    isWriter: true,
  },
  {
    id: 3,
    title: '고민이 있습니다33',
    deletedAt: '2022-12-30 14:00',
    isWriter: true,
  },
  {
    id: 4,
    title: '저도 같은 고민이 있습니다.',
    deletedAt: '2022-12-31 14:00',
    isWriter: true,
  },
  {
    id: 8,
    title: '저도 같은 고민이 있습니다22',
    deletedAt: '2022-12-30 15:00',
    isWriter: false,
  },
  {
    id: 9,
    title: '저도 같은고민이 있습니다33',
    deletedAt: '2022-12-30 14:02',
    isWriter: false,
  },
];
