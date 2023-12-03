'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {ReplyContainer} from '../molecule';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const ReplyBox = () => {
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const goToHome = () => route.push('/main');

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'HamburgerBlack',
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '답장목록',
      }}
      headerRightProps={{
        icon: 'Home',
        onClick: goToHome,
      }}>
      <Container>
        {replyBox.map(replyBox => (
          <ReplyContainer
            onClick={() => route.push(`reply-box/reply/${replyBox.id}`)}
            key={replyBox.id}
            id={replyBox.id}
            title={replyBox.title}
            hasThanks={replyBox.hasThanks}
          />
        ))}
      </Container>
    </EmptyLayout>
  );
};

export default ReplyBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const replyBox = [
  {
    id: 7,
    title: '저도 같은 고민이 있었는데요',
    createddAt: '2022-12-30 14:02',
    hasThanks: true,
  },
  {
    id: 8,
    title: '저도 같은 고민이 있었는데요22',
    createddAt: '2022-12-30 14:02',
    hasThanks: false,
  },
  {
    id: 9,
    title: '저도 같은 고민이 있었는데요33',
    createddAt: '2022-12-30 14:02',
    hasThanks: true,
  },
  {
    id: 10,
    title: '저도 같은 고민이 있었는데요44',
    createddAt: '2022-12-30 14:02',
    hasThanks: false,
  },
];
