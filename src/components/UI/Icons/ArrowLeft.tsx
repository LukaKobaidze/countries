type Props = {
  className?: string;
  onClick?: () => void;
};

const ArrowLeft = ({ className, onClick }: Props) => {
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
      <title>arrow-left</title>
      <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z"></path>
    </svg>
  );
};

export default ArrowLeft;