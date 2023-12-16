'use client';

import {useServerInsertedHTML} from 'next/navigation';
import {type ReactNode, useState} from 'react';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

type StyledComponentsProps = {
  children: ReactNode;
};

const StyledComponentsRegistry = (props: StyledComponentsProps) => {
  const {children} = props;
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{styles}</>;
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};
export default StyledComponentsRegistry;
