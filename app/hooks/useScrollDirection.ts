import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 2;

export default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null);
  
    useEffect(() => {
      let lastScrollY = window.scrollY;
  
      const updateScrollDirection = () => {
        const scrollY = window.scrollY;

        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > SCROLL_THRESHOLD || scrollY - lastScrollY < -SCROLL_THRESHOLD)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };
  