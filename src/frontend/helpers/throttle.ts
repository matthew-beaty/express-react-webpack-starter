/**
 * Simple throttle function
 *
 * Common usecases would be limiting an automaticly fired function like browser
 * window re-sizing or for de-bouncing a button click.
 *
 * Directly borrowed from
 * https://decipher.dev/30-seconds-of-typescript/docs/throttle/
 * so that we don't have to add an entire library like underscore or
 * lodash for one usecase.
 *
 * @param fn - function that will be throttled
 * @param wait - number of milliseconds to wait
 * @returns wrapper on original function
 */
const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number;
  return function (this: any) {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

export default throttle;
