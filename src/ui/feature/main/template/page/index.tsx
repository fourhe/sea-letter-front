'use client';

import {useRouter} from 'next/navigation';
import {useTheme} from 'styled-components';

import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button, Rating} from '@components/molecule';
import {Toast} from '@components/organism';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {IconButton} from '@feature/main/atom';
import {MainText} from '@feature/main/molecule';

const Main = () => {
  const {handleOpen} = useDrawer();
  const theme = useTheme();

  const route = useRouter();
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{icon: 'Hamburger', onClick: handleOpen}}
      headerRightProps={{
        style: {color: theme.color.white},
        text: '우편함',
      }}>
      <MainText showIcon text={'아래로 내려\n편지를 주워보세요.'} />
      <IconButton />
      <Rating />
      <Button color="brown" onClick={() => route.push('/about')}>
        복구
      </Button>
      <Portal portalId={PortalId.Toast}>
        <Toast />
      </Portal>
    </EmptyLayout>
  );
};

export default Main;
