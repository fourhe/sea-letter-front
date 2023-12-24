import type {ComponentPropsWithRef} from 'react';
import {useContext} from 'react';
import styled, {useTheme} from 'styled-components';

import {AccordionContext} from './Container';

import {Icon} from '@components/atom';

type HeaderProps = {
  onClick?: () => void;
} & ComponentPropsWithRef<'div'>;

const Header = (props: HeaderProps) => {
  const {onClick: onClickProp, children, ...restProps} = props;
  const {open, setOpen} = useContext(AccordionContext);
  if (open === undefined) throw new Error('AccordionContext is not provided');
  const theme = useTheme();
  const onClick = () => {
    if (onClickProp) onClickProp();
    setOpen(pre => !pre);
  };

  return (
    <Container onClick={onClick} {...restProps}>
      {children}
      <Icon.ChevronUP
        width={theme.size[6]}
        height={theme.size[6]}
        transform={`rotate(${open ? 180 : 0})`}
        style={{
          transition: 'transform 0.4s',
        }}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: inherit;
  text-align: center;
`;
