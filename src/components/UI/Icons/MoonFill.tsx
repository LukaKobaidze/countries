type Props = {
  className?: string;
  onClick?: () => void;
};

const MoonFill = ({ className, onClick }: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <title>moon</title>
      <path d="M15.505 16.496c-1.97-1.971-2.499-4.819-1.626-7.284-0.953 0.337-1.854 0.865-2.616 1.626-2.734 2.734-2.734 7.167 0 9.9 2.733 2.733 7.164 2.735 9.898 0 0.764-0.762 1.29-1.663 1.626-2.616-2.463 0.872-5.312 0.344-7.283-1.626z"></path>
    </svg>
  );
};

export default MoonFill;
