import {useContext} from 'react';
import type {ComponentPropsWithRef} from 'react';
import styled, {useTheme} from 'styled-components';

import {AccordionContext} from './Container';

import {Icon} from '@components/atom';

type HeaderProps = {
  onClick?: () => void;
} & ComponentPropsWithRef<'div'>;

const Header = (props: HeaderProps) => {
  const {onClick: onClickProp, children, ...restProps} = props;
  const {open, setOpen} = useContext(AccordionContext);
  const theme = useTheme();
  const onClick = () => {
    if (onClickProp) onClickProp();
    setOpen(pre => !pre);
  };

  return (
    <Container onClick={onClick} {...restProps}>
      {children}
      <Icon.ChevronRight
        fill={theme.color.text[700]}
        transform={`rotate(${open ? 90 : 0})`}
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
  align-items: center;
  padding: 10px;
  background-color: inherit;
  text-align: center;
`;
