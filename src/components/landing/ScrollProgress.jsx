import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-0 top-0 w-[2px] h-full z-50 hidden lg:block">
      <div className="absolute inset-0 bg-muted/30" />
      <motion.div
        className="absolute top-0 left-0 w-full bg-primary origin-top"
        style={{ scaleY: scrollYProgress, height: '100%' }}
      />
    </div>
  );
}