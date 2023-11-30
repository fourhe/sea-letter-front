'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {DeleteDialog} from '../../organism';

import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {useLetterBox} from '@feature/letterBox/hook';

type MyLetterProps = {
  id?: number;
};

const MyLetter = (props: NextPageProps<MyLetterProps>) => {
  const {params} = props;
  const {push} = useRouter();
  const {handleOpen} = useDrawer();
  const {handleOpen: deleteOpen} = useDialog();
  const goHome = () => push('/main');
  const {letterDetail} = useLetterBox({id: params.id});

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'HamburgerBlack',
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '누군가의 편지',
      }}
      headerRightProps={{
        icon: 'Home',
        onClick: goHome,
      }}>
      <HeaderContainer>
        <Title>{letterDetail?.title}</Title>
        <CreatedAt>{letterDetail?.createdAt}</CreatedAt>
      </HeaderContainer>
      <DeleteDialog
        title={`편지를 삭제 할까요?\n삭제된 편지는 휴지통으로 이동하며 1개월 뒤 영구 삭제 됩니다.`}
        ok={() => {
          console.log(1);
        }}
      />
      <Container>
        <Content>{letterDetail?.content}</Content>
        <Button
          onClick={deleteOpen}
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
          color="brown"
          size="full">
          삭제하기
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
