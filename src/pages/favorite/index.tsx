import Layout from "../../Layout";
import BookList from "../../components/BookList";
import { bookDataType } from "../../assets/data";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from "../../redux/favoriteSlice";
import { RootState } from "../../redux/store";
import TimelineAnimation from "../../components/ScrollBall/scrollBall";

const Favorite = () => {
  const bookList = useSelector((state: RootState) => state.book.book);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const dispatch = useDispatch();

  const handleRemoveFromFavorite = (book: bookDataType) => {
    dispatch(removeFromFavorite(book));
  };

  return (
    <>
      <Layout>
        <Row 
        style={{
              backgroundColor: isDarkMode ? "#000" : "#fff",
              minHeight: "100vh",
            }}>
          <Col span={24} className="title">
            <h1>Favorite</h1>
          </Col>
          <Col style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <TimelineAnimation/>
          </Col>
          <Col
            span={16}
            offset={4}

          >
            <>
              <BookList
                bookList={bookList}
                handleFavorite={handleRemoveFromFavorite}
              />
            </>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Favorite;
