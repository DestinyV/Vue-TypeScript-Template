/**
 * @description 防抖动函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(
  func: Function,
  wait: number,
  immediate: boolean
): Function {
  let timeout: NodeJS.Timeout | null,
    args: any,
    context: any | null,
    timestamp: number,
    result: Function;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return (...args: any[]) => {
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = null;
      args = [];
    }

    return result;
  };
}

/**
 * @description 节流函数
 * @param {function} func
 * @param {number} delay
 */
export function throttle(func: Function, delay: number) {
  let timer: NodeJS.Timeout | null | number = null;
  // 闭包记录开始时间
  let startTime = Date.now();
  return (...args: any[]) => {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    clearTimeout(timer as NodeJS.Timeout);
    // 到时执行一次则重置
    if (remaining <= 0) {
      func.apply(null, ...args);
      startTime = Date.now();
    } else {
      // 未到时则继续等待
      timer = setTimeout(func, remaining);
    }
  };
}
