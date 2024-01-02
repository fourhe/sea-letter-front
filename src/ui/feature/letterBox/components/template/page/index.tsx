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
        {letterBoxList.map(letterBoxListBox => (
          <MailContainer
            key={letterBoxListBox.id}
            id={letterBoxListBox.id}
            title={letterBoxListBox.title}
            hasNewReply={letterBoxListBox.hasNewReply}
            onClick={readMyLetter}
          />
        ))}
      </Container>
    </EmptyLayout>
  );
};

export default MailBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
