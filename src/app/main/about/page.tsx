'use client';

import {Icon} from '@components/atom';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';
import {useDialog} from '@components/organism/Dialog/hook';
import {EmptyLayout} from '@components/template';

const AboutPage = () => {
  const {handleOpen} = useDialog();
  const {setOpen} = useBottomSheet();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{isBack: true}}
      headerCenterProps={{title: '어바웃 페이지'}}
      headerRightProps={{
        icon: 'HamburgerButton',
        onClick: handleOpen,
      }}>
      <Icon.HamburgerButton onClick={() => setOpen(pre => !pre)} />
    </EmptyLayout>
  );
};

export default AboutPage;
