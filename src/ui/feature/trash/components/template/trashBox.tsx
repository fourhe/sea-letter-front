'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {TrashContainer} from '@feature/trash/components/molecule';

const TrashBox = () => {
  const {handleOpen} = useDrawer();
  const route = useRouter();

  const goToHome = () => route.push('/main');
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
        onClick: goToHome,
      }}>
      <TextContainer>{`휴지통에 있는 편지는 1개월 동안\n보관 후 영구 삭제됩니다.`}</TextContainer>
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

const TextContainer = styled.div`
  padding: 2vh 0;
  color: ${({theme}) => theme.color.neutral[500]};
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
  text-align: center;
  white-space: pre-wrap;
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
