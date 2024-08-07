import React, { useState, SetStateAction, useContext } from "react";
import Layout from "../../Layout";
import SearchBar from "../../components/SearchBar";
import BookList from "../../components/BookList";
import { Row, Col } from "antd";
import { bookDataType } from "../../assets/data";
import { BookContext } from "../../context/bookContext";
import "./home.scss"

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<bookDataType[]>([]);
  const { state } = useContext(BookContext);
  const { books } = state;
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
    const newList = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchList(newList)
  };
  console.log(books)
  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>Home</h1>
          </Col>
          <Col span={24} className="searchBar">
            <SearchBar />
          </Col>
          <Col span={16} offset={4}>
            {search === "" ? (
                  <BookList bookList={books} />
            ) : (
                  <h1>Found</h1>
            )}
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Home;
