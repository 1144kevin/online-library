import { useState, useEffect } from "react";
import Layout from "../../Layout";
import SearchBar from "../../components/SearchBar";
import BookList from "../../components/BookList";
import { Row, Col } from "antd";
import { bookDataType2 } from "../../assets/data";
import "./home.scss"
import axios from "axios";
import { addToFavorite } from "../../redux/favoriteSlice";
import { useDispatch } from "react-redux";


const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<bookDataType2[]>([]);
  const [searchList, setSearchList] = useState<bookDataType2[]>(data);
  const dispatch = useDispatch();


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const sortedList = [...data].sort((a, b) => a.title.localeCompare(b.title));
        setData(res.data);
        setSearchList(sortedList); // 初始排序 A-Z
      })
      .catch(err => console.log(err))
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

  const handleAddToFavorite = (book: bookDataType2) => {
    dispatch(addToFavorite({ book })); // Pass image if needed
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
              <BookList bookList={searchList} handleFavorite={handleAddToFavorite}/>
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Home;
