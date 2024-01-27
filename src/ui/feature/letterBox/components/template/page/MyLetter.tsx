'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {useToast} from '@components/organism/Toast/hook';
import {EmptyLayout, LayoutItem} from '@components/template';
import {DeleteDialog} from '@feature/letterBox/components/organism';
import {useLetterBox} from '@feature/letterBox/hook';

type MyLetterProps = {
  id?: string;
};

const MyLetter = (props: NextPageProps<MyLetterProps>) => {
  const {params} = props;
  const {handleOpen: deleteOpen, handleClose} = useDialog();
  const {showToast} = useToast();
  const router = useRouter();
  const id = params?.id ? Number(params.id) : undefined;
  const {letterDetail, deleteLetter} = useLetterBox({
    id,
  });
  const goReplyList = () => router.push(`/main/reply-box/${params.id}`);

  const deleteSelectedLetter = async () => {
    await deleteLetter(id!);
    showToast({message: '편지가 삭제되었습니다.'});
    handleClose();
    router.back();
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
          <Button style={{height: 36}} onClick={deleteOpen} color="brown">
            삭제
          </Button>
        ),
      }}>
      <LayoutItem.HeaderContainer>
        <LayoutItem.Title>{letterDetail?.title}</LayoutItem.Title>
        <LayoutItem.CreatedAt>{letterDetail?.createdAt}</LayoutItem.CreatedAt>
      </LayoutItem.HeaderContainer>
      <DeleteDialog
        title={`편지를 삭제 할까요?\n이 편지에 대한 답장도 함께 삭제되며\n삭제된 편지는 1개월간\n휴지통에 보관 됩니다.`}
        ok={deleteSelectedLetter}
      />
      <LayoutItem.Container>
        <LayoutItem.Content>{letterDetail?.content}</LayoutItem.Content>
        <ConfirmButton
          className="reply-button"
          onClick={goReplyList}
          color="brown"
          size="full">
          답장 확인하기
        </ConfirmButton>
      </LayoutItem.Container>
    </EmptyLayout>
  );
};

export default MyLetter;

const ConfirmButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
`;
