import React from 'react';
import type {ComponentPropsWithRef} from 'react';
import styled, {useTheme} from 'styled-components';

type DivProps = ComponentPropsWithRef<'div'> & {
  borderRadius?: number;
  aspectRatio?: number;
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
};

type BoxProps = {
  size?: 'large' | 'normal' | 'small' | number;
  type?: 'circle' | 'rectangle' | 'square' | 'chip';
} & DivProps;

const Container = styled.div<BoxProps>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({borderRadius}) => borderRadius || 0}px;
  aspect-ratio: ${({aspectRatio}) => aspectRatio};
  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${({border}) => border};
`;

const Box = (props: BoxProps) => {
  const theme = useTheme();
  const {
    children,
    style,
    size: sizeProp = 'large',
    type = 'rectangle',
    borderColor,
    backgroundColor,
    ...restProps
  } = props;
  const size =
    typeof sizeProp === 'number' ? sizeProp : theme.size.box[sizeProp];
  const borderRadius =
    type === 'circle' || type === 'chip' ? size : theme.size['1.5'];
  const aspectRatio = type === 'circle' || type === 'square' ? 1 : undefined;

  return (
    <Container
      size={size}
      borderRadius={borderRadius}
      aspectRatio={aspectRatio}
      backgroundColor={backgroundColor}
      border={borderColor ? `1px solid ${borderColor}` : ''}
      style={style}
      {...restProps}>
      {children}
    </Container>
  );
};

export default Box;
