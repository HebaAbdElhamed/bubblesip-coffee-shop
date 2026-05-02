'use client';
import { useEffect } from 'react';

export default function ScrollRevealInit() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-up-hidden');
    elements?.forEach((el) => el?.classList?.remove('revealed'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return null;
}