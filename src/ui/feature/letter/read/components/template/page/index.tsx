'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {Button} from '@components/molecule';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';
import {EmptyLayout} from '@components/template';
import {useLetter} from '@feature/letter/hook';

type ReadProps = {
  id?: number;
};

const Read = (props: NextPageProps<ReadProps>) => {
  const {params} = props;
  const {push} = useRouter();
  const {setOpen} = useBottomSheet();
  const goHome = () => push('/main');
  const {letter} = useLetter({letterId: params.id});

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
        icon: 'Home',
        onClick: goHome,
      }}>
      <HeaderContainer>
        <Title>{letter?.title}</Title>
        <CreatedAt>{letter?.createdAt}</CreatedAt>
      </HeaderContainer>
      <Container>
        <Content>{letter?.content}</Content>
        <Button
          onClick={() => setOpen(true)}
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
          color="brown"
          size="full">
          답장하기
        </Button>
      </Container>
    </EmptyLayout>
  );
};

export default Read;

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
