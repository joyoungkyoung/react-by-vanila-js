/**
 * @param {HookCallback} callback
 * @returns
 */
const debounce = (callback) => {
  let nextFrameCallback = -1;
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
};

export default debounce;
