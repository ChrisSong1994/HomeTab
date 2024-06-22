import StoreInstance from "@/store";
import { useState } from "react";

const useStore = () => {
  const [data, setData] = useState(StoreInstance.getData());
  const [time, setTime] = useState(Date.now());

  const setStore = (data) => {
    StoreInstance.setData(data);
    const newData = StoreInstance.getData();
    setData({ ...newData });
    setTime(Date.now());
  };

  return [data, setStore];
};

export default useStore;
