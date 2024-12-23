"use client";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPlay,
  IconPlayerStop,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ControlledDotsNavigation from './controlledDotsNavigation';

export const AnimatedProducts = ({ products }) => {
  // State to track the currently active product index
  const [active, setActive] = useState(0);
  // State to control autoplay functionality
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null); // Use a ref to store the interval ID


  // Function to handle moving to the next product
  const handleNext = () => {
    setActive((prev) => (prev + 1) % products.length);
    resetAutoplay(); // Reset autoplay after user interaction
  };


  // Function to handle moving to the previous product
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + products.length) % products.length);
    resetAutoplay(); // Reset autoplay after user interaction
  };

  // Function to check if a product is currently active
  const isActive = (index) => {
    return index === active;
  };


  // Function to start the autoplay feature
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % products.length);
    }, 3000);
  };

   // Function to stop the autoplay feature
   const stopAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Function to reset the autoplay timer
  const resetAutoplay = () => {
    if (autoplay) {
      stopAutoplay();
      startAutoplay();
    }
  };

  // Effect to start autoplay when the component mounts or autoplay state changes
  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    }
    return () => stopAutoplay(); // Cleanup on component unmount
  }, [autoplay]);

  // Function to toggle autoplay on button click
  const handleStop = () => {
    setAutoplay((prev) => {
      if (prev) stopAutoplay();
      else startAutoplay();
      return !prev;
    });
  };

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
        onDotClick={(index) => {
          setActive(index);
          resetAutoplay(); // Reset autoplay after dot navigation
        }} 
      />
      </div>
    </div>
  );
};
