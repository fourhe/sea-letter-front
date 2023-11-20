import type {CSSProperties, ReactNode} from 'react';
import {useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon as Icons} from '@components/atom';
import type {IconName} from '@components/atom/Icon';

export type HeaderRightProps = {
  icon?: IconName;
  disabled?: boolean;
  iconColor?: string;
  text?: string;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
};

const HeaderRight = (props: HeaderRightProps) => {
  const {
    icon,
    text,
    onClick: onClickProp,
    iconColor = 'none',
    disabled,
    style,
    children,
  } = props;
  const theme = useTheme();
  const Icon = useMemo(() => (icon ? Icons[icon] : null), [icon]);
  const onClick = useMemo(() => {
    if (disabled) {
      return undefined;
    }
    return onClickProp;
  }, [disabled, onClickProp]);
  return (
    <Container style={style} onClick={onClick}>
      {Icon ? (
        <Icon fill={iconColor} width={theme.size[8]} height={theme.size[8]} />
      ) : null}
      {text ? <Text>{text}</Text> : null}
      {children}
    </Container>
  );
};

HeaderRight.displayName = 'HeaderRight';

export default HeaderRight;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: ${({theme}) => theme.size[8]}px;
  min-height: ${({theme}) => theme.size[8]}px;
  cursor: pointer;
`;

const Text = styled.span`
  color: #fff;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  font-style: normal;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;
