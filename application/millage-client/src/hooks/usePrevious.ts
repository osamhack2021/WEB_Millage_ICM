import {useEffect, useRef} from 'react';

/**
 * parameter로 넘겨받은 value를 ref의 current에 저장해서,\
 * useEffect 이후 render되기 이전에 update되기 이전의 값을\
 * 사용할 수 있도록 해주는 hook
 * @param {any} value 
 * @return {any}
 */
function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
