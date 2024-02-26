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
          <Accordion.Body>
            <Body>{item.body}</Body>
          </Accordion.Body>
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

const Body = styled.article`
  white-space: pre-wrap;
`;

const accordion = [
  {
    id: 1,
    title: '공지사항 서비스 시작',
    date: '2024. 02. 25',
    body: '공지사항 메뉴가 추가되었습니다.\n앞으로 이것에서 알려드려야 할 사항을 전달드릴 예정입니다.\n잘 부탁드립니다!',
  },
  {
    id: 2,
    title: '‘바다편지’서비스 소개',
    date: '2024. 02. 25',
    body:
      '당신의 이야기를 유리병에 담아 바다로 보내보세요. 유리병을 주운 누군가가 당신에게 답장을 보낼 거예요. 고민이 있는 당신을 위한 익명 편지 서비스.\n' +
      '\n' +
      '당신이 주운 편지는 우연하게, 운명처럼 줍게 된 편지에요. 랜덤하게 배정된 편지이기에 같은 편지를 주울 수 있다는 보장이 없답니다. 그리고 한번 보내진 답장은 다시 회수할 수 없으니 신중하게 편지를 선택하고 답장을 보내주세요!\n' +
      '\n' +
      '바다편지에는 채팅 기능이 없어요. 그래서 받은 답장에 답변을 할 수 없답니다. 대신 정성스럽게 답장을 해준 누군가에겐 감사 인사를 보내주세요:)',
  },
];
