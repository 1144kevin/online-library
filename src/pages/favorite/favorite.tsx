import Layout from "../../Layout";
import BookList from "../../components/BookList/bookList";
import { bookDataType } from "../../assets/data";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite, addToFavorite } from "../../redux/favoriteSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import _ from "lodash";

const Favorite = () => {
  const bookList = useSelector((state: RootState) => state.book.book);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const dispatch = useDispatch();

  const [localFavorites] = useState<bookDataType[]>(_.cloneDeep(bookList));

  useEffect(()=>{
    console.log("222",localFavorites)
  },[localFavorites])

  const handleAddToFavorite = (book: bookDataType) => {
    dispatch(addToFavorite(book));
  };

  const handleRemoveFromFavorite = (book: bookDataType) => {
    dispatch(removeFromFavorite(book));
  };

  const handleFavoriteToggle = (book: bookDataType) => {
    const isFavorite = bookList.some((favBook) => favBook.id === book.id);
    if (isFavorite) {
      handleRemoveFromFavorite(book);
    } else {
      handleAddToFavorite(book);
    }
  };

  return (
    <>
      <Layout>
        <Row
          style={{
            backgroundColor: isDarkMode ? "#000" : "#fff",
          }}
        >
          <Col span={24} className="title">
            <h1>Favorite</h1>
          </Col>
          <Col span={16} offset={4} style={{ minHeight: "100vh" }}>
            <>
              <BookList
                bookList={localFavorites}
                handleFavorite={handleFavoriteToggle}
              />
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Favorite;
