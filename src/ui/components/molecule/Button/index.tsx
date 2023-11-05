import {ComponentPropsWithRef, useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

type ButtonProps = {
  color?: 'white' | 'brown' | 'gray' | 'pink';
} & ComponentPropsWithRef<'button'>;

const Button = (props: ButtonProps) => {
  const {children, color: colorProp, disabled, ...restProps} = props;
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
          color: theme.color.text[700],
        };
    }
  }, [disabled, colorProp, theme]);

  return (
    <SButton
      background={background}
      disabled={disabled}
      color={color}
      {...restProps}>
      {children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button<{
  background: string;
  color: string;
}>`
  font-family: inherit;
  padding: 6px 12px;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  background: ${({background}) => background};
  color: ${({color}) => color};

  &:hover {
    background-color: ${({theme, background}) =>
      background + theme.opacity[80]};
  }

  &:active {
    background-color: ${({theme, background}) =>
      background + theme.opacity[90]};
  }
`;
