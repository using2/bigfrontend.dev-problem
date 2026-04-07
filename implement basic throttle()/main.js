
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let lastTime = 0;
  let timer = null;
  let lastArgs = null;

  return function (...args) {
    if (lastTime === 0) {
      func(...args);
      lastTime = wait;
    } else {
      lastArgs = args;

      if (!timer) {
        timer = setTimeout(() => {
          func(...lastArgs);
          lastTime += wait - 1;
          timer = null;
          lastArgs = null;
        }, wait - 1);
      }
    }
  };
}


