'use client';

import styled from 'styled-components';

import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';

type TrashProps = {
  id?: number;
};

const Trash = (props: NextPageProps<TrashProps>) => {
  const {params} = props;
  console.log(params.id);
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerRightProps={{
        children: (
          <div>
            <Button style={{marginRight: 8}} color="lightBrown">
              영구삭제
            </Button>
            <Button color="brown">복구</Button>
          </div>
        ),
      }}>
      <HeaderContainer>
        <Title>{dummy?.title}</Title>
        <CreatedAt>{dummy?.deleteAt}</CreatedAt>
      </HeaderContainer>
      <Container>
        <Content>{dummy?.content}</Content>
      </Container>
    </EmptyLayout>
  );
};

export default Trash;

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

const dummy = {
  title: '딸에게 보내는 심리학 편지',
  deleteAt: '2023. 09. 24',
  content:
    '프랑스 대문호 빅토르 위고는 "인생 최고의 기쁨은 자신이 사랑받고 있다는 확신에서 나온다. 좀 더 정확히는, 자신의 모습에도 불구하고 사랑을 받고 있다는."이라는 말을 남겼다. 사랑을 받는다는 것은 인간에게 주어진 최고의 기쁨이다.',
};
