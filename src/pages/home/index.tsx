import React, { useState, SetStateAction, useContext, useEffect } from "react";
import Layout from "../../Layout";
import SearchBar from "../../components/SearchBar";
import BookList from "../../components/BookList";
import { Row, Col } from "antd";
import { bookDataType } from "../../assets/data";
import { BookContext } from "../../context/bookContext";
import "./home.scss"

const Home = () => {
  const [search, setSearch] = useState("");
  const { state } = useContext(BookContext);
  const { books } = state;
  const [searchList, setSearchList] = useState<bookDataType[]>(books);

  useEffect(() => {
    const sortedList = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setSearchList(sortedList); // 初始排序 A-Z
  }, [books]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const newList = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchList(newList);
  };

  const sortAZ = () => {
    const sortedList = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setSearchList(sortedList);
    console.log(searchList);
  };

  const sortZA = () => {
    const sortedList = [...books].sort((a, b) => b.title.localeCompare(a.title));
    setSearchList(sortedList);
  };

  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>Home</h1>
          </Col>
          <Col span={24} className="searchBar">
            <SearchBar onSearch={handleSearch} onSortAZ={sortAZ} onSortZA={sortZA} />
          </Col>
          <Col span={16} offset={4}>
            <>
              {search && <h1>找到{searchList.length}筆與{search}有關</h1>}
              <BookList bookList={searchList} />
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Home;
