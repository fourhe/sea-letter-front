import {useRouter} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import type {ReactNode, CSSProperties} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon as Icons} from '@components/atom';
import type {IconName} from '@components/atom/Icon';

export type HeaderLeftProps = {
  icon?: IconName;
  iconColor?: string;
  text?: string;
  onClick?: () => void;
  isBack?: boolean;
  isClose?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

const HeaderLeft = (props: HeaderLeftProps) => {
  const {
    children,
    icon,
    iconColor = 'none',
    text,
    onClick: onClickProp,
    isBack,
    isClose,
    disabled,
    style,
  } = props;
  const theme = useTheme();
  const router = useRouter();

  const Icon = useMemo(() => {
    if (icon) return Icons[icon];
    if (isClose) return Icons.Close;
    if (isBack) return Icons.ArrowLeft;
    return null;
  }, [icon, isBack, isClose]);

  const onClick = useCallback(() => {
    if (disabled) return;
    if (onClickProp) onClickProp();
    else if (isClose || isBack) router.back();
  }, [disabled, isBack, isClose, onClickProp, router]);

  return (
    <Container style={style} onClick={onClick}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {Icon ? (
        <Icon fill={iconColor} width={theme.size[8]} height={theme.size[8]} />
      ) : text ? (
        <Text color={theme.color.text[disabled ? 300 : 700]}>{text}</Text>
      ) : null}
      {children}
    </Container>
  );
};

HeaderLeft.displayName = 'HeaderLeft';

export default HeaderLeft;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({theme}) => theme.size[8]}px;
  min-height: ${({theme}) => theme.size[8]}px;
  cursor: pointer;
`;

const Text = styled.span<{color: string}>`
  color: ${({color}) => color};
`;
