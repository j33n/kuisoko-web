import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import Image from "remix-image";

import {
  StyledNextBtn,
  StyledPrevBtn,
  StyledSliderContainer,
} from "./ImageSlider.styled";

// TODO: FIO variants
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 10 : -10,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 10 : -10,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const ImageSlider = ({ images }: { images: string[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <StyledSliderContainer>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <Image
            src={images[imageIndex]}
            responsive={[
              {
                size: {
                  width: 200,
                  height: 200,
                },
                maxWidth: 200,
              },
            ]}
            dprVariants={[3, 3]}
          />
        </motion.div>
      </AnimatePresence>
      {images && images.length > 1 && (
        <>
          <StyledNextBtn onClick={() => paginate(1)}>
            <IoMdArrowDropright />
          </StyledNextBtn>
          <StyledPrevBtn onClick={() => paginate(-1)}>
            <IoMdArrowDropleft />
          </StyledPrevBtn>
        </>
      )}
    </StyledSliderContainer>
  );
};

export default ImageSlider;
