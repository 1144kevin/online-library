import { useState, useEffect } from "react";
import Layout from "../../Layout";
import SearchBar from "../../components/SearchBar/searchBar";
import BookList from "../../components/BookList/bookList";
import { Row, Col, Spin } from "antd";
import { bookDataType } from "../../assets/data";
import "./home.scss";
import { toggleFavorite } from "../../redux/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getBookData } from "../../api/api";

const Home = () => {
  const [data, setData] = useState<bookDataType[]>([]);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<bookDataType[]>(data);
  const [loading, setLoading] = useState(false); //setBookLoading

  //取 Redux 的 dispatch 函數。這個函數允許你在組件中分派（dispatch）actions，以更新 Redux store 中的狀態。
  const dispatch = useDispatch();

  //用於從 Redux store 中提取特定的狀態。在這裡，useSelector 從 RootState 中提取 state.book.book，即 Redux store 中管理的書籍列表。
  //state 是整個 Redux store 的狀態。第一個 book 代表 book slice，第二個 book 代表 FavoriteState 中的 book 屬性，它是一個書籍數組。
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state

  const handleSearch = (value: string) => {
    setSearch(value);
    // const newList = data.filter((book) =>
    //   book?.title?.toLowerCase().includes(value.toLowerCase())
    // );
    // setSearchList(newList);
  };

  const sortAZ = () => {
    //... 是展開運算符，它將 data 數組中的所有元素展開並複製到一個新的數組中。
    //localeCompare 是字符串的內建方法，用於比較兩個字符串的順序，並返回一個表示這兩個字符串相對順序的數值。這個數值可以用來判斷哪個字符串應該排在前面。
    const sortedList = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setSearchList(sortedList);
  };

  function sortZA() {
    const sortedList = [...data].sort((a, b) => b.title.localeCompare(a.title));
    setSearchList(sortedList);
  }

  const handleFavoriteToggle = (book: bookDataType) => {
    dispatch(toggleFavorite(book));
  };

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const allBooks = await getBookData();
      const sortedList = [...allBooks].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setSearchList(sortedList);
      setData(sortedList);
      setTimeout(() => setLoading(false), 500);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    const filteredList = data.filter((book) =>
      book?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchList(filteredList);
  }, [search, data]);

  // Set the CSS variable for spin dot color
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--spin-dot-color",
      isDarkMode ? "#fff" : "#000"
    );
  }, [isDarkMode]);

  return (
    <Layout>
      <Row
        style={{
          backgroundColor: isDarkMode ? "#000" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        <Col span={24} className="title">
          <h1>Home</h1>
        </Col>
        <Col span={24} className="searchBar">
          <SearchBar
            onSearch={handleSearch}
            onSortAZ={sortAZ}
            onSortZA={sortZA}
          />
        </Col>
        <Col span={16} offset={4} style={{ minHeight: "100vh" }}>
          {loading ? (
            <Spin size="large" className="loading" />
          ) : (
            <>
              {search && (
                <h1>
                  找到{searchList.length}筆與{search}有關
                </h1>
              )}
              <BookList
                bookList={searchList}
                handleFavorite={handleFavoriteToggle}
              />
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
