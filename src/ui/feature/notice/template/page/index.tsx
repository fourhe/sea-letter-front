'use client';

import {useRouter} from 'next/navigation';
import {useTheme} from 'styled-components';

import {Accordion} from '@components/organism';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const Page = () => {
  const {handleOpen} = useDrawer();
  const theme = useTheme();
  const route = useRouter();
  const goHome = () => route.push('/main');
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
        onClick: goHome,
      }}>
      <div>
        {accordion.map(item => (
          <Accordion.Container key={item.id}>
            <Accordion.Header>
              <div>
                <p>{item.title}</p>
                <span
                  style={{
                    color: 'gray',
                    margin: 0,
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}>
                  {item.date}
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Container>
        ))}
      </div>
    </EmptyLayout>
  );
};

export default Page;
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
