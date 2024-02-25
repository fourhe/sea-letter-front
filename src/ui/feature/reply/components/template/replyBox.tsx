'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {ReplyContainer} from '../molecule';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {useReply} from '@feature/reply/hook';

type ReplyProps = {
  'letter-id'?: number;
};

const ReplyBox = (props: NextPageProps<ReplyProps>) => {
  const {params} = props;
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const goToReply = (id: number) =>
    route.push(`${params['letter-id']}/reply/${id}`);
  const {replyList} = useReply(params['letter-id']);

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
      }}>
      <Container>
        {replyList?.length !== 0 ? (
          replyList.map(replyBox => (
            <ReplyContainer
              onClick={goToReply}
              key={replyBox.id}
              id={replyBox.id}
              title={replyBox.title}
              thanked={replyBox.thanked}
            />
          ))
        ) : (
          <NoReply>아직 답장이 도착하지 않았어요!</NoReply>
        )}
      </Container>
    </EmptyLayout>
  );
};

export default ReplyBox;

const NoReply = styled.div`
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
