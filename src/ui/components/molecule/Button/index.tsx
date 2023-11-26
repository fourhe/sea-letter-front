import type {ComponentPropsWithRef} from 'react';
import {useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

type ButtonProps = {
  color?: 'white' | 'brown' | 'gray' | 'pink' | string;
  size?: 'normal' | 'small' | 'full';
  bold?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button = (props: ButtonProps) => {
  const {
    children,
    color: colorProp,
    disabled,
    bold,
    size = 'small',
    ...restProps
  } = props;
  const theme = useTheme();
  const {background, color} = useMemo(() => {
    if (disabled)
      return {
        background: theme.color.content[400],
        color: theme.color.text[100],
      };
    switch (colorProp) {
      case 'gray':
        return {
          background: theme.color.neutral[200],
          color: theme.color.black,
        };
      case 'brown':
        return {
          background: theme.color.secondary.brown,
          color: theme.color.white,
        };
      case 'white':
        return {
          background: theme.color.white,
          color: theme.color.primary.pointPink,
        };
      case 'pink':
        return {
          background: theme.color.primary.pointPink,
          color: theme.color.white,
        };
      default:
        return {
          background: theme.color.content[0],
          color: colorProp || theme.color.text[700],
        };
    }
  }, [disabled, colorProp, theme]);
  return (
    <SButton
      $size={size}
      $background={background}
      $color={color}
      $bold={bold}
      disabled={disabled}
      {...restProps}>
      {children}
    </SButton>
  );
};

const SButton = styled.button<
  TDollarPrefix<{
    background: string;
    color: string;
    bold?: boolean;
    size: 'normal' | 'small' | 'full';
  }>
>`
  white-space: nowrap;
  width: ${({$size}) => ($size === 'full' ? '100%' : 'auto')};
  height: ${({theme, $size}) =>
    theme.size.button[$size === 'full' ? 'normal' : $size]}px;
  padding: 8px 12px;
  border-radius: 6px;
  margin: 0;
  border: 0;
  background: ${({$background}) => $background};
  color: ${({$color}) => $color};
  font-family: inherit;
  font-weight: ${({$bold}) => ($bold ? 700 : 'normal')};
  font-size: 16px;

  &:hover {
    background-color: ${({theme, $background}) =>
      $background + theme.opacity[80]};
  }

  &:active {
    background-color: ${({theme, $background}) =>
      $background + theme.opacity[90]};
  }
`;

export default Button;
