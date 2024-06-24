import StoreInstance from "@/store";
import { useState, useEffect } from "react";

/**
 * ⚠️ 在 layout 组件不能导致组件重新渲染，这个问题暂时用事件解决
 */
const useStore = () => {
  const [data, setData] = useState(StoreInstance.getData());

  const setStore = (data) => {
    StoreInstance.setData(data);
  };

  useEffect(() => {
    StoreInstance.onSubscribe((data) => {
      setData({ ...data });
    });
  }, []);

  return [data, setStore];
};

export default useStore;
