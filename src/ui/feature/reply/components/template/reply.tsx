'use client';

import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';
import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {useToast} from '@components/organism/Toast/hook';
import {EmptyLayout, LayoutItem} from '@components/template';
import {DeleteDialog} from '@feature/letterBox/components/organism';
import {replyQueryKeys, useReply} from '@feature/reply/hook';
import type {Reply as TReply} from '@services/interface/reply';

type ReplyProps = {
  'reply-id'?: number;
  'letter-id'?: number;
};

const Reply = (props: NextPageProps<ReplyProps>) => {
  const {params} = props;
  const {handleOpen: deleteOpen} = useDialog();
  const route = useRouter();
  const client = useQueryClient();
  const {showToast} = useToast();
  const {color} = useTheme();
  const {replyDetail, deleteReply, setThank} = useReply(
    params['letter-id'],
    params['reply-id'],
  );

  const deleteSelectedReply = useCallback(async () => {
    await deleteReply(replyDetail?.id!);
    showToast({message: '답장이 휴지통으로 이동했습니다.'});
    deleteOpen();
    route.back();
  }, [deleteOpen, deleteReply, route, showToast, replyDetail]);

  const thankSelectedReply = useCallback(async () => {
    const findReplyData = client
      .getQueryData<TReply[]>(
        replyQueryKeys.replyList.list(params['letter-id']!).queryKey,
      )
      ?.find(reply => reply.id === Number(params['reply-id']!));
    if (!findReplyData?.thanked) {
      await setThank(params['reply-id']!);
      showToast({
        message: '감사 인사가 전해졌습니다.',
      });
      route.back();
    } else {
      showToast({
        message: '감사 인사는 한 번만 할 수 있어요.',
        color: color.secondary.brown,
        containerColor: color.white,
      });
    }
  }, [
    client,
    color.secondary.brown,
    color.white,
    params,
    route,
    setThank,
    showToast,
  ]);

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
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
`;
