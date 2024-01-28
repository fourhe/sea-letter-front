'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {Icon} from '@components/atom';
import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {useToast} from '@components/organism/Toast/hook';
import {EmptyLayout, LayoutItem} from '@components/template';
import {DeleteDialog} from '@feature/letterBox/components/organism';
import {useReply} from '@feature/reply/hook';

type ReplyProps = {
  'reply-id'?: number;
  'letter-id'?: number;
};

const Reply = (props: NextPageProps<ReplyProps>) => {
  const {params} = props;
  const {handleOpen: deleteOpen} = useDialog();
  const route = useRouter();
  const {showToast} = useToast();
  const {replyDetail, deleteReply, setThank} = useReply(
    params['letter-id'],
    params['reply-id'],
  );

  const deleteSelectedReply = async () => {
    await deleteReply(replyDetail?.id!);
    showToast({message: '답장이 휴지통으로 이동했습니다.'});
    deleteOpen();
    route.back();
  };

  const thankSelectedReply = async () => {
    await setThank(params['reply-id']!);
    showToast({message: '감사 인사가 전해졌습니다.'});
    route.back();
  };

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
        children: (
          <Button color="brown" onClick={deleteOpen}>
            삭제
          </Button>
        ),
      }}>
      <LayoutItem.HeaderContainer>
        <LayoutItem.Title>{replyDetail?.title}</LayoutItem.Title>
        <LayoutItem.CreatedAt>{replyDetail?.createdAt}</LayoutItem.CreatedAt>
      </LayoutItem.HeaderContainer>
      <DeleteDialog
        title={`답장을를 삭제 할까요?\n이 편지에 대한 답장도 함께 삭제되며\n삭제된 편지는 1개월간\n휴지통에 보관 됩니다.`}
        ok={deleteSelectedReply}
      />
      <LayoutItem.Container>
        <LayoutItem.Content>{replyDetail?.content}</LayoutItem.Content>
        <ThankYouButton color="brown" size="full" onClick={thankSelectedReply}>
          <Icon.FaceWink width={28} height={28} stroke="white" />
          감사 인사 전하기
        </ThankYouButton>
      </LayoutItem.Container>
    </EmptyLayout>
  );
};

export default Reply;

const ThankYouButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  font-size: 20px;
`;
