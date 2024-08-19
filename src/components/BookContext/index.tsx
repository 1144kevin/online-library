import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { bookDataType } from "../../assets/data";
//createContext創建上下文對象，共享數據

type BookContextType = {
  data: bookDataType[];

  //它是一個函數類型，這個函數接受一個參數，而這個參數可以是新的 bookDataType2[]（直接更新狀態），或者是一個函數（基於當前狀態來計算新狀態）。
  setData: React.Dispatch<React.SetStateAction<bookDataType[]>>;//
};

//BookContext 的值可以是 BookContextType 或 undefined，，當上下文尚未提供任何值時，它的默認狀態就是 undefined。
const BookContext = createContext<BookContextType | undefined>(undefined);

// children 是這個組件的子組件，類型為 ReactNode，表示這個組件可以包含任何類型的子元素。
export const BookProvider = ({ children }: { children: ReactNode }) => {

  //嘗試從 localStorage 中加載名為 bookData 的數據，如果有數據就解析成 JSON，否則初始值為空數組 []。
  const [data, setData] = useState<bookDataType[]>(() => {
    const savedData = localStorage.getItem("booksData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    // 每當 data 更新時，將其保存到 localStorage(將 JavaScript 物件轉換成 JSON 格式的字串後，可以方便地儲存到本地儲存、Cookie 或伺服器端。)
    localStorage.setItem("booksData", JSON.stringify(data));
  }, [data]);


  return (
    //使 BookContext 的消費者可以訪問這些值
    //children 是這個 Provider 包裹的子組件，這些子組件可以使用 BookContext 中的數據和函數。
    <BookContext.Provider value={{ data, setData }}>
      {children}
    </BookContext.Provider>
  );
};

//定義了一個自定義鉤子 useBook，它使用 useContext 鉤子來獲取 BookContext 的值。
export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};