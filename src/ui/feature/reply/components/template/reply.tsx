'use client';

import styled from 'styled-components';

import {Icon} from '@components/atom';
import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';
import {useReply} from '@feature/reply/hook';

type ReplyProps = {
  'reply-id'?: number;
  'letter-id'?: number;
};

const Reply = (props: NextPageProps<ReplyProps>) => {
  const {params} = props;
  const {replyDetail} = useReply({
    letterId: params['letter-id'],
    replyId: params['reply-id'],
  });
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerCenterProps={{
        title: '누군가의 편지',
      }}
      headerRightProps={{
        children: <Button color="brown">삭제</Button>,
      }}>
      <HeaderContainer>
        <Title>{replyDetail?.title}</Title>
        <CreatedAt>{replyDetail?.createdAt}</CreatedAt>
      </HeaderContainer>
      <Container>
        <Content>{replyDetail?.content}</Content>
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontWeight: 700,
            fontSize: 20,
          }}
          color="brown"
          size="full">
          <Icon.FaceWink width={28} height={28} stroke="white" />
          감사 인사 전하기
        </Button>
      </Container>
    </EmptyLayout>
  );
};

export default Reply;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.size[2]}px;
  gap: ${({theme}) => theme.size[2]}px;
  border-bottom: 1px solid #836561;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: var(--RIDIBatang);
  font-size: 22px;
  letter-spacing: -0.408px;
`;

const CreatedAt = styled.div`
  color: ${({theme}) => theme.color.neutral[500]};
  font-size: 14px;
  line-height: 26px;
`;

const Content = styled.div`
  font-family: var(--RIDIBatang);
  line-height: 26px;
  padding: ${({theme}) => theme.size[3]}px;
`;
