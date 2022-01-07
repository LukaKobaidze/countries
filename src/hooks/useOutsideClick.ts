import { useState, useRef, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement | HTMLDivElement>(
  clickEvent: 'click' | 'mousedown'
) => {
  const [clickedOutside, setClickedOutside] = useState(false);
  const ref = useRef<T>(null);

  const clickHandler = (event: any) => {
    if (!ref.current) return;

    if (!ref.current.contains(event.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    document.addEventListener(clickEvent, clickHandler);

    return () => document.removeEventListener(clickEvent, clickHandler);
  });

  return { ref, clickedOutside, setClickedOutside };
};

export default useOutsideClick;
