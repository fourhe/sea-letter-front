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

const Box = (props: BoxProps) => {
  const theme = useTheme();
  const {
    children,
    style,
    size: sizeProp = 'normal',
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
      $size={size}
      $borderRadius={borderRadius}
      $aspectRatio={aspectRatio}
      $backgroundColor={backgroundColor}
      $border={borderColor ? `1px solid ${borderColor}` : ''}
      style={style}
      {...restProps}>
      {children}
    </Container>
  );
};

export default Box;

type BoxContainerProps = {
  size: number;
  borderRadius?: number;
  backgroundColor?: string;
  aspectRatio?: number;
  border?: string;
};

const Container = styled.div<TDollarPrefix<BoxContainerProps>>`
  width: ${({$size}) => $size * 3}px;
  height: ${({$size}) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: ${({$aspectRatio}) => $aspectRatio};
  border-radius: ${({$borderRadius}) => $borderRadius || 0}px;
  background-color: ${({$backgroundColor}) => $backgroundColor};
  border: ${({$border}) => $border};
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
`;
