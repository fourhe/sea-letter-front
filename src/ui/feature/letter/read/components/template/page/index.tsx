'use client';

import {notFound} from 'next/navigation';
import styled from 'styled-components';

import {Button} from '@components/molecule';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';
import {EmptyLayout, LayoutItem} from '@components/template';
import {useLetter} from '@feature/letter/hook';

type ReadProps = {
  id?: number | 'null';
};

const Read = (props: NextPageProps<ReadProps>) => {
  const {params} = props;
  if (params.id === 'null') {
    notFound();
  }
  const {setOpen} = useBottomSheet();

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
      }}>
      <LayoutItem.HeaderContainer>
        <LayoutItem.Title>{letter?.title}</LayoutItem.Title>
        <LayoutItem.CreatedAt>{letter?.createdAt}</LayoutItem.CreatedAt>
      </LayoutItem.HeaderContainer>
      <LayoutItem.Container>
        <LayoutItem.Content>{letter?.content}</LayoutItem.Content>
        <ConfirmButton onClick={() => setOpen(true)} color="brown" size="full">
          답장하기
        </ConfirmButton>
      </LayoutItem.Container>
    </EmptyLayout>
  );
};

export default Read;

const ConfirmButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
`;
