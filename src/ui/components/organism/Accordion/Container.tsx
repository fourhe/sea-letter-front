import {
  type ComponentPropsWithRef,
  createContext,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';
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
      <AccordionContainer {...props} />
    </AccordionContext.Provider>
  );
};

export default Container;

const AccordionContainer = styled.div`
  padding: ${({theme}) => theme.size[3]}px 0;
  border-radius: 5px;
  overflow: hidden;
`;
