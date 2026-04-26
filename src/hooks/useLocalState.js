import { useEffect, useState } from "react";
import { getStorage, setStorage } from "../utils/storage";

export function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => getStorage(key, initialValue));

  useEffect(() => {
    setStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
