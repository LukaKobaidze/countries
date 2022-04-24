import { forwardRef } from 'react';
import styles from 'styles/UI/Wrapper.module.scss';

interface Props extends React.ComponentPropsWithoutRef<'div'> {}
type Ref = HTMLDivElement;

const Wrapper = forwardRef<Ref, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={`${styles.wrapper} ${className}`} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Wrapper;
