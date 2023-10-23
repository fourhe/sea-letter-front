'use client';

import {Icon, Link} from '@components/atom';
import {Accordion, Carousel} from '@components/organism';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {useDialog} from '@components/organism/Dialog/hook';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const Main = () => {
  const {handleOpen} = useDrawer();
  const {setOpen} = useBottomSheet();
  const {handleOpen: dialogOpen} = useDialog();

  const {index, dotLength} = useCarousel();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{isBack: true}}
      headerCenterProps={{title: '바다로 보내는 편지'}}
      headerRightProps={{
        icon: 'HamburgerButton',
        onClick: handleOpen,
      }}>
      <Icon.HamburgerButton onClick={() => setOpen(pre => !pre)} />
      <Icon.Search onClick={dialogOpen} />
      <Link href="/about">about</Link>
      <div style={{display: 'grid', gap: 5}}>
        {accordion.map(item => (
          <Accordion.Container key={item.id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Container>
        ))}
      </div>
      <div style={{width: 200, height: 200}}>
        <Carousel autoPlay loop>
          {colors.map(item => (
            <div
              key={item}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: item,
              }}
            />
          ))}
        </Carousel>
        <Dots length={dotLength} activeIndex={index} />
      </div>
    </EmptyLayout>
  );
};

export default Main;

const accordion = [
  {id: 1, title: 'title1', body: 'body1'},
  {id: 2, title: 'title2', body: 'body2'},
  {id: 3, title: 'title3', body: 'body3'},
];
const colors = ['#f90', '#ef0', '#e0f'];
