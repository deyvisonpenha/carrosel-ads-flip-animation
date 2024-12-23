"use client";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPlay,
  IconPlayerStop,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import ControlledDotsNavigation from './controlledDotsNavigation';

export const AnimatedProducts = ({ products }) => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + products.length) % products.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const handleStop = () => {
    setAutoplay((prev) => !prev);
  }

  return (
    <div
      className="max-w-sm md:max-w-4xl mx-auto antialiased px-4 md:px-8 lg:px-12 py-20 font-[family-name:var(--font-geist-sans)]"
      style={{ perspective: "1000px" }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Product Showcase
      </h1>
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <AnimatePresence>
          {products.map(
            (product, index) =>
              isActive(index) && (
                <motion.div
                  key={product.src}
                  initial={{
                    opacity: 0,
                    rotateY: -90,
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: 90,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-center"
                >
                  <Image
                    src={product.src}
                    alt={product.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 mt-3 md:mt-8 justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
          >
            <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-125 transition-transform duration-300" />
          </button>
          <button
            onClick={handleNext}
            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
          >
            <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-125 transition-transform duration-300" />
          </button>
        </div>
        <button
          onClick={handleStop}
          className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
        >
          {autoplay ? (
            <IconPlayerStop className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-125 transition-transform duration-300" />
          ) : (
            <IconPlayerPlay className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-125 transition-transform duration-300" />
          )}
        </button>
        <ControlledDotsNavigation 
        currentIndex={active} 
        totalImages={products.length} 
        onDotClick={setActive} 
      />
      </div>

      
    </div>
  );
};
