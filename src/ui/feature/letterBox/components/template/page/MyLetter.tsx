'use client';

import styled from 'styled-components';

import {DeleteDialog} from '../../organism';

import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {EmptyLayout} from '@components/template';
import {useLetterBox} from '@feature/letterBox/hook';

type MyLetterProps = {
  id?: number;
};

const MyLetter = (props: NextPageProps<MyLetterProps>) => {
  const {params} = props;
  const {handleOpen: deleteOpen} = useDialog();
  const {letterDetail} = useLetterBox({id: params.id});

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
      <HeaderContainer>
        <Title>{letterDetail?.title}</Title>
        <CreatedAt>{letterDetail?.createdAt}</CreatedAt>
      </HeaderContainer>
      <DeleteDialog
        title={`편지를 삭제 할까요?\n이 편지에 대한 답장도 함께 삭제되며\n삭제된 편지는 1개월간\n휴지통에 보관 됩니다.`}
        ok={() => {
          console.log(1);
        }}
      />
      <Container>
        <Content>{letterDetail?.content}</Content>
        <Button
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
          color="brown"
          size="full">
          답장 확인하기
        </Button>
      </Container>
    </EmptyLayout>
  );
};

export default MyLetter;

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
