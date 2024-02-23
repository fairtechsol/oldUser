import { useEffect } from "react";
import { useRef } from "react";

function useOuterClick(callback: any) {
  const callbackRef: any = useRef();
  const innerRef: any = useRef();
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: any) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []);

  return innerRef;
}

export default useOuterClick;
