'use client';

import {notFound, useRouter} from 'next/navigation';
import styled from 'styled-components';

import {Button} from '@components/molecule';
import {useToast} from '@components/organism/Toast/hook';
import {EmptyLayout} from '@components/template';
import {useThrash} from '@feature/trash/hook';

type TrashProps = {
  id?: number;
};

const Trash = (props: NextPageProps<TrashProps>) => {
  const {params} = props;
  const route = useRouter();
  const {showToast} = useToast();
  const {trashDetail, restoreTrash, deleteTrash} = useThrash({id: params?.id});
  if (!params?.id) return notFound();
  const deleteSelectedTrash = async () => {
    await deleteTrash(Number(params.id!));
    showToast({message: '편지가 삭제되었습니다.'});
    route.back();
  };

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerRightProps={{
        children: (
          <div>
            <Button
              style={{marginRight: 8}}
              color="lightBrown"
              onClick={deleteSelectedTrash}>
              영구삭제
            </Button>
            <Button
              color="brown"
              onClick={async () => {
                await restoreTrash(trashDetail?.id!);
                route.back();
              }}>
              복구
            </Button>
          </div>
        ),
      }}>
      <HeaderContainer>
        <Title>{trashDetail?.title}</Title>
        <CreatedAt>{trashDetail?.deletedAt}</CreatedAt>
      </HeaderContainer>
      <Container>
        <Content>{trashDetail?.content}</Content>
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
