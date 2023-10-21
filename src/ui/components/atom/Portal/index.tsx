import {useEffect, useState} from 'react';
import type {ReactElement} from 'react';
import {createPortal} from 'react-dom';

import {PortalId} from './portal.enum';

type PortalProps = {
  children: ReactElement;
  portalId: PortalId;
};

const Portal = (props: PortalProps) => {
  const {children, portalId} = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return null;

  return mounted
    ? createPortal(children, document.getElementById(portalId) as HTMLElement)
    : null;
};

export default Portal;
