/**
 * async 함수에서 다음 라인을 실행하기 전에 시간을 주고 싶을 때, 사용하는 함수
 *
 * @param {number} timeToDelay 다음 line을 실행하기 전까지 Delay 할 시간
 * @return {Promise<unknown>}
 */
export const wait = (timeToDelay: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));
