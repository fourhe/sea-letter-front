'use client';

import styled, {useTheme} from 'styled-components';

import {Accordion} from '@components/organism';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const Page = () => {
  const {handleOpen} = useDrawer();
  const theme = useTheme();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        style: {color: theme.color.black},
        icon: 'HamburgerBlack',
        iconColor: theme.color.black,
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '공지사항',
        style: {fontWeight: 500},
      }}
      headerRightProps={{
        style: {color: theme.color.white},
        icon: 'Home',
      }}>
      {accordion.map(item => (
        <Accordion.Container key={item.id}>
          <Accordion.Header>
            <div>
              <Title>{item.title}</Title>
              <Date>{item.date}</Date>
            </div>
          </Accordion.Header>
          <Accordion.Body>{item.body}</Accordion.Body>
        </Accordion.Container>
      ))}
    </EmptyLayout>
  );
};

export default Page;

const Title = styled.p`
  margin: 0;
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  padding-bottom: ${({theme}) => theme.size[2]}px;
`;

const Date = styled.span`
  color: ${({theme}) => theme.color.neutral[500]};
  display: flex;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;

const accordion = [
  {
    id: 1,
    title: '[공지사항] 바다로 보내는 편지 이용방법',
    date: '2023. 09. 24',
    body: 'body1',
  },
  {
    id: 2,
    title: '[공지사항] 바다로 보내는 편지 이용방법',
    date: '2023. 09. 24',
    body: 'body2',
  },
];
