import axios from "axios";
import { useState } from "react";
import { useBook } from "../components/BookContext";

const useFetchBook = (apiEndpoint: string) => {
  const { data, setData } = useBook();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = () => {
    setLoading(true);
    axios
      .get(apiEndpoint)
      .then((res) => {
        setData(res.data);
        localStorage.setItem("booksData", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return { getData };
};
export default useFetchBook;
