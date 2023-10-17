import {useContext, useMemo} from 'react';
import type {ComponentPropsWithRef} from 'react';
import styled from 'styled-components';

import {AccordionContext} from './Container';

import {Icon as Icons} from '@components/atom';
import type {IconName} from '@components/atom/Icon';

type HeaderProps = {
  expandIcon?: IconName;
  onClick?: () => void;
} & ComponentPropsWithRef<'div'>;

const Header = (props: HeaderProps) => {
  const {expandIcon = 'ChevronRight', onClick: onClickProp, children} = props;
  const Icon = useMemo(() => Icons[expandIcon], [expandIcon]);
  const {open, setOpen} = useContext(AccordionContext);
  const onClick = () => {
    setOpen(pre => !pre);
    onClickProp?.();
  };

  return (
    <Container onClick={onClick}>
      {children}
      <IconContainer open={open}>
        <Icon />
      </IconContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
`;

const IconContainer = styled.div<{open: boolean}>`
  transform: rotateZ(${({open}) => (open ? 90 : 0)}deg);
  transition: transform 0.4s;
`;