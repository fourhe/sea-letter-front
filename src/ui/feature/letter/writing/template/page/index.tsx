'use client';

import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';

const Writing = () => (
  <EmptyLayout
    headerShown
    headerLeftProps={{
      isBack: true,
    }}
    headerCenterProps={{
      title: '편지쓰기',
    }}
    headerRightProps={{
      children: <Button color="brown">보내기</Button>,
    }}>
    글쓰기
  </EmptyLayout>
);

export default Writing;
