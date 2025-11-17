import { Link, type LinkProps } from 'react-router';

type BoldLinkProps = {
  label: string
} & LinkProps;

const BoldLink = ({
  label,
  to,
  ...props
}: BoldLinkProps) => {
  return (
    <Link to={to} {...props}>
      <span className="text-primary-500 font-bold">{label}</span>
    </Link>
  );
};

export default BoldLink;