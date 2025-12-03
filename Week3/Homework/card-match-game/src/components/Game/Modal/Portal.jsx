import { createPortal } from 'react-dom';

export default function Portal({ children, selector }) {
  const rootElement = document.querySelector(selector);
  return createPortal(children, rootElement);
};