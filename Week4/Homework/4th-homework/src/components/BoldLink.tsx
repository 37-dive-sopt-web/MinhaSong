import { type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '../utils/cn';

interface BoldLinkProps extends LinkProps {
  children: ReactNode;
}

const BoldLink = ({
  children,
  to,
  className,
  ...props
}: BoldLinkProps) => {
  return (
    <Link to={to} className={cn("text-primary-500 font-bold", className)} {...props}>
      {children}
    </Link>
  );
};

export default BoldLink;