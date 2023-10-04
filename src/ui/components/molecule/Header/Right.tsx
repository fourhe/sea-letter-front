import type {CSSProperties, ReactNode} from 'react';
import {useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon as Icons} from '@components/atom';

export type HeaderRightProps = {
  icon?: keyof typeof Icons;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

const HeaderRight = (props: HeaderRightProps) => {
  const {icon, text, onClick, disabled, style, children} = props;
  const theme = useTheme();
  const Icon = useMemo(() => (icon ? Icons[icon] : null), [icon]);

  return (
    <Container style={style} onClick={onClick}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {Icon ? (
        <Icon
          fill={theme.color.text[disabled ? 300 : 700]}
          width={theme.size[6]}
          height={theme.size[6]}
        />
      ) : text ? (
        <Text color={theme.color.text[disabled ? 300 : 700]}>{text}</Text>
      ) : null}
      {children}
    </Container>
  );
};

HeaderRight.displayName = 'HeaderRight';

export default HeaderRight;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({theme}) => theme.size[6]}px;
  min-height: ${({theme}) => theme.size[6]}px;
  margin-right: ${({theme}) => theme.size[5]}px;
  cursor: pointer;
`;

const Text = styled.span<{color: string}>`
  color: ${({color}) => color};
`;