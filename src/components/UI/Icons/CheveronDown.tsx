type Props = {
  className?: string;
  onClick?: () => void;
};

const CheveronDown = ({ className, onClick }: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <title>cheveron-down</title>
      <path d="M9.293 12.95l0.707 0.707 5.657-5.657-1.414-1.414-4.243 4.242-4.243-4.242-1.414 1.414z"></path>
    </svg>
  );
};

export default CheveronDown;