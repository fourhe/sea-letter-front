'use client';

import {notFound, useRouter} from 'next/navigation';

import {Button} from '@components/molecule';
import {useToast} from '@components/organism/Toast/hook';
import {EmptyLayout, LayoutItem} from '@components/template';
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

  const restoreSelectedTrash = async () => {
    await restoreTrash(Number(params.id!));
    showToast({message: '편지가 복구되었습니다.'});
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
            <Button color="brown" onClick={restoreSelectedTrash}>
              복구
            </Button>
          </div>
        ),
      }}>
      <LayoutItem.HeaderContainer>
        <LayoutItem.Title>{trashDetail?.title}</LayoutItem.Title>
        <LayoutItem.CreatedAt>{trashDetail?.deletedAt}</LayoutItem.CreatedAt>
      </LayoutItem.HeaderContainer>
      <LayoutItem.Container>
        <LayoutItem.Content>{trashDetail?.content}</LayoutItem.Content>
      </LayoutItem.Container>
    </EmptyLayout>
  );
};

export default Trash;
