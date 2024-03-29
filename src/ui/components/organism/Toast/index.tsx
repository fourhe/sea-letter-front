'use client';

import {motion, type Variants} from 'framer-motion';
import styled, {useTheme} from 'styled-components';

import {useToast} from './hook';

import {Icon} from '@components/atom';

export type ToastProps = {
  message: string;
  color?: string;
  containerColor?: string;
  isVisible?: boolean;
};

const containerVariants: Variants = {
  visible: {
    display: 'flex',
    opacity: 1,
    scale: 1,
    transform: 'translateY(-50%)',
    transition: {duration: 0.5},
  },
  hidden: {
    display: 'none',
    opacity: 0,
    scale: 0,
  },
};

const Toast = () => {
  const {color, containerColor, isVisible, message} = useToast();
  const theme = useTheme();

  return (
    <Container
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      $containerColor={containerColor}
      $color={color}>
      <Icon.CheckCircle
        width={theme.size.icon.normal}
        height={theme.size.icon.normal}
        stroke={color ?? theme.color.primary.pointPink}
      />
      {message}
    </Container>
  );
};

export default Toast;

type ContainerProps = TDollarPrefix<
  Pick<ToastProps, 'color' | 'containerColor'>
>;

const Container = styled(motion.div)<ContainerProps>`
  z-index: 12;
  color: ${({theme, $color}) => $color || theme.color.primary.pointPink};
  background-color: ${({$containerColor}) => $containerColor || '#FFF2F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 8px;
  left: 14.6vw;
  width: 67.5vw;
  padding: 12px 7px;
  gap: 8px;
  border-radius: 6px;
  text-align: center;
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
`;
