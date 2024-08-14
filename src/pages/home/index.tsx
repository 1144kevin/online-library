import { useState, useEffect } from "react";
import Layout from "../../Layout";
import SearchBar from "../../components/SearchBar";
import BookList from "../../components/BookList";
import { Row, Col } from "antd";
import { bookDataType2 } from "../../assets/data";
import "./home.scss"
import useFetchBook from "../../hooks/useFetchBook"

const Home = () => {
  const {data,loading,error,getData}=useFetchBook('https://jsonplaceholder.typicode.com/posts');
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<bookDataType2[]>(data);

  useEffect(() => {
    getData()
  },[]);

  useEffect(() => {
    // Filter the list based on the search query
    const filteredList = data.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchList(filteredList);
  }, [search, data]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const newList = data.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchList(newList);
  };

  const sortAZ = () => {
    const sortedList = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setSearchList(sortedList);
  };

  const sortZA = () => {
    const sortedList = [...data].sort((a, b) => b.title.localeCompare(a.title));
    setSearchList(sortedList);
  };

  // if(loading){
  //   return(
  //     <p>Loading...</p>
  //   )
  // }
  // if(error){
  //   return(
  //     <p>Error:{error.message}</p>
  //   )
  // }

  return (
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
  );
};

export default Home;
