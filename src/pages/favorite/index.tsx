import Layout from "../../Layout";
import BookList from "../../components/BookList";
import { bookDataType2 } from "../../assets/data";
import { Col, Row } from "antd";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { removeFromFavorite } from "../../redux/favoriteSlice";
import { RootState } from "../../redux/store"; // Import the RootState type

const Favorite = () => {
  const bookitems = useSelector((state: RootState) => state.book.book);

  // Map the bookitems to only extract the `book` property
  const bookList = bookitems.map(item => item.book);

  const dispatch = useDispatch();
  const handleRemoveFromFavorite = (book: bookDataType2) => {
    dispatch(removeFromFavorite({ book })); // Pass image if needed
  };
  
  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>Favorite</h1>
          </Col>
          <Col span={16} offset={4}>
            <>
              <BookList bookList={bookList} handleFavorite={handleRemoveFromFavorite}/>
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Favorite;
