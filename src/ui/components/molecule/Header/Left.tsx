import {useRouter} from 'next/navigation';
import {type CSSProperties, type ReactNode, useCallback, useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon as Icons, type IconName} from '@components/atom';

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
      {Icon ? (
        <Icon fill={iconColor} width={theme.size[8]} height={theme.size[8]} />
      ) : null}
      {text ? <Text>{text}</Text> : null}
      {children}
    </Container>
  );
};

HeaderLeft.displayName = 'HeaderLeft';

export default HeaderLeft;

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
