export const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

export const headerVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      mass: 0.3,
      damping: 10,
      ease: "easeInOut",
    },
  },
};

export const footerVariants = {
  hidden: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      mass: 0.3,
      damping: 10,
      ease: "easeInOut",
    },
  },
};

export const pageTitleFadeOutVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

export const slideGoingLeftVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      mass: 0.3,
      damping: 8,
      ease: "easeInOut",
    },
  },
};
export const slideGoingRightVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      mass: 0.3,
      damping: 8,
      ease: "easeInOut",
    },
  },
};

export const fadeOutVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

export const authFadeOutVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const hamMenuSlideVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      mass: 0.5,
      damping: 7,
      stiffness: 30,
      ease: "easeInOut",
    },
  },
};
