'use client';

import {useTheme} from 'styled-components';

import {IconButton} from '../../atom';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {MainText} from '@feature/main/molecule';

const Main = () => {
  const {handleOpen} = useDrawer();
  const theme = useTheme();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{icon: 'HamburgerButton'}}
      headerRightProps={{
        style: {color: theme.color.white},
        text: '우편함',
        onClick: handleOpen,
      }}>
      <MainText showIcon text={'아래로 내려\n편지를 주워보세요.'} />
      <IconButton />
    </EmptyLayout>
  );
};

export default Main;
