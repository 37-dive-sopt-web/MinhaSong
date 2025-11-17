import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const rootElement = document.querySelector(selector);
  if (!rootElement) return;
  return createPortal(children, rootElement);
};

export default Portal;