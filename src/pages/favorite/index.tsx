import Layout from "../../Layout";
import BookList from "../../components/BookList";
import { bookDataType } from "../../assets/data";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from "../../redux/favoriteSlice";
import { RootState } from "../../redux/store";

const Favorite = () => {
  const bookList = useSelector((state: RootState) => state.book.book);

  const dispatch = useDispatch();

  const handleRemoveFromFavorite = (book: bookDataType) => {
    dispatch(removeFromFavorite(book))
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
              <BookList bookList={bookList} handleFavorite={handleRemoveFromFavorite} />
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Favorite;
