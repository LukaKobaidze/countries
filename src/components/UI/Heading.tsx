type Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ children, className }: Props) => {
  return <h1 className={className}>{children}</h1>;
};

export default Heading;
