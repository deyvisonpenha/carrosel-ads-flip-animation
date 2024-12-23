"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AnimatedProducts = ({ products, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [randomRotations, setRandomRotations] = useState([]);

  useEffect(() => {
    // Generate random rotations once on mount
    const rotations = products.map(() => Math.floor(Math.random() * 21) - 10);
    setRandomRotations(rotations);
  }, [products]);

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

  return (
    <div
      className="max-w-sm md:max-w-4xl mx-auto antialiased px-4 md:px-8 lg:px-12 py-20 font-[family-name:var(--font-geist-sans)]"
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Product Showcase</h1>
      <div className="relative h-80 w-full shadow-lg rounded-lg overflow-hidden">
        <AnimatePresence>
          {products.map((product, index) => (
            isActive(index) && (
              <motion.div
                key={product.src}
                initial={{
                  opacity: 0,
                  rotateY: -90, // Flip in from the left
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0, // Reset rotation to face the front
                }}
                exit={{
                  opacity: 0,
                  rotateY: 90, // Flip out to the right
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
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-3 md:mt-8">
        <button
          onClick={handlePrev}
          className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
        >
          <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
        </button>
        <button
          onClick={handleNext}
          className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
        >
          <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
