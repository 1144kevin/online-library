import axios from "axios";
import { bookDataType2 } from "../assets/data";
import { useState } from "react";

const CustomHook = (apiEndpoint: string) => {
  const [data, setData] = useState<bookDataType2[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);


  const getData = () => {
    setLoading(true);
    axios
      .get(apiEndpoint)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return { data, loading, error, getData };
};
export default CustomHook;
