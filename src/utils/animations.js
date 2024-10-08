// ############## Animations (Framer Motion) sort by delay ##############
export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.1, duration: 0.2, ease: "easeInOut" },
};
export const scaleSpringyAnimation = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    delay: 0.1,
    duration: 0.5,
    type: "spring",
  },
};
export const fromTopAnimation = {
  initial: { y: -30 },
  animate: { y: 0 },
  transition: { delay: 0.1, duration: 0.4, type: "spring" },
};
export const fancyBoxAnimation = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: 0.5, duration: 0.4, type: "spring" },
};
