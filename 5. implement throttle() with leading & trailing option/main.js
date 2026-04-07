
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
// This is a JavaScript coding problem from BFE.dev 

/**
 * throttle 함수
 * - 일정 시간(wait) 동안 함수 호출을 제한
 * - leading: 처음 호출을 즉시 실행할지
 * - trailing: 마지막 호출을 나중에 실행할지
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
  let waiting = false;   // 현재 쿨타임(waiting 상태)인지 여부
  let lastArgs = null;   // 쿨타임 동안 들어온 "마지막 호출" 저장

  const { leading, trailing } = option;

  return function (...args) {
    // 현재 쿨타임이 아닐 때 (즉, 새로운 사이클 시작)
    if (!waiting) {
      waiting = true; // 쿨타임 시작

      /**
       * 타이머 역할 함수
       * - wait 시간마다 실행됨
       * - trailing 조건에 따라 마지막 호출 실행 여부 결정
       * - 실행할 게 있으면 계속 타이머 이어감 (체인 구조)
       */
      const runTimer = () => {
        setTimeout(() => {
          // trailing 옵션이 켜져 있고, 쿨타임 동안 저장된 마지막 호출이 있다면 실행
          if (trailing && lastArgs) {
            func(...lastArgs);

            lastArgs = null; // 사용했으니 초기화

            // 다시 타이머 실행 (연속 처리)
            runTimer();
          } else {
            // 실행할 게 없으면 쿨타임 종료
            waiting = false;
          }
        }, wait);
      };

      // leading 처리
      if (leading) {
        // 첫 호출 즉시 실행
        func(...args);
      } else {
        // 실행 안 하고 trailing용으로 저장
        lastArgs = args;
      }

      // 타이머 시작
      runTimer();
    } else {
      // 쿨타임 중일 때
      // - 실행하지 않고 마지막 호출만 계속 갱신
      // - 결국 가장 마지막 호출만 살아남음
      lastArgs = args;
    }
  };
}



