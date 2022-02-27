import { useEffect, useRef } from 'react';

export default function useRecoilValueInCustomHook<T>(stateValue: T) {
  const latestValue = useRef(stateValue);
  useEffect(() => {
    latestValue.current = stateValue;
  }, [stateValue]);
  return latestValue.current;
}
