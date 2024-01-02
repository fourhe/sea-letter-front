'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {MailContainer} from '@feature/letterBox/components/molecule';
import {useLetterBox} from '@feature/letterBox/hook';

const MailBox = () => {
  const route = useRouter();
  const {handleOpen} = useDrawer();
  const readMyLetter = (id: number) => route.push(`letter-box/letters/${id}`);
  const {letterBoxList} = useLetterBox();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'HamburgerBlack',
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '우편함',
      }}
      headerRightProps={{
        icon: 'Home',
      }}>
      <Container>
        {letterBoxList.length !== 0 ? (
          letterBoxList.map(letterBoxListBox => (
            <MailContainer
              key={letterBoxListBox.id}
              id={letterBoxListBox.id}
              title={letterBoxListBox.title}
              hasNewReply={letterBoxListBox.hasNewReply}
              onClick={readMyLetter}
            />
          ))
        ) : (
          <NoLetter>아직 보낸 편지가 없어요!</NoLetter>
        )}
      </Container>
    </EmptyLayout>
  );
};

export default MailBox;

const NoLetter = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
