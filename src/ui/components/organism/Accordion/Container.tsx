import {createContext, useMemo, useState} from 'react';
import type {Dispatch, SetStateAction, ComponentPropsWithRef} from 'react';
import styled from 'styled-components';

type ContainerProps = ComponentPropsWithRef<'div'>;

type ContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AccordionContext = createContext<ContextType>({
  open: false,
  setOpen: () => {},
});

const Container = (props: ContainerProps) => {
  const [open, setOpen] = useState(false);
  const store = useMemo(() => ({open, setOpen}), [open, setOpen]);

  return (
    <AccordionContext.Provider value={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AccordionContainer {...props} />
    </AccordionContext.Provider>
  );
};

export default Container;

const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
