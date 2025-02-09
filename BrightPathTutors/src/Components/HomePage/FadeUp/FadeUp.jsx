import React, { useState, useEffect, useRef } from 'react';
import './FadeUp.css'; // Include CSS for fade-up animation

const FadeUp = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold value based on your requirement
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fade-up ${isVisible ? 'is-visible' : ''}`}
      ref={targetRef}
    >
      {children}
    </div>
  );
};

export default FadeUp;
