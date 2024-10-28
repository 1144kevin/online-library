import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button, message, Spin } from "antd";
import "./detail.scss";
import CostumLink from "../../components/CustomLink";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from "../../redux/favoriteSlice";
import { getBookData, deleteBookData } from "../../api/api";
import { useEffect, useState } from "react";
import { bookDataType } from "../../assets/data";
import { RootState } from "../../redux/store";
import Comment from "../../components/Comment/comment";

function Detail() {
  const { dataId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<bookDataType[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const ratings = useSelector((state: RootState) => state.comment.ratings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBookData().then(setData);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const book = data.find((y) => y.id === dataId);
  const totalRating = book?.comments?.reduce((acc, comment) => acc + (ratings[comment.commentId] || 0), 0) || 0;

  const handleDelete = async () => {
    await deleteBookData(dataId!);
    //用來測試每個陣列元素。返回值是 true 的元素會被包括在新的陣列中，返回值是 false 的元素則被排除。
    const updatedData = data.filter((item) => item.id !== dataId);
    // 更新狀態
    setData(updatedData);
    // 如果找到對應的書籍，則從收藏中移除該書籍
    if (book) {
      dispatch(removeFromFavorite(book));
    }
    message.success("刪除成功"); // 顯示刪除成功的訊息
    navigate("/");
  };

  return (
    <Row
      className="layout"
      style={{
        backgroundColor: isDarkMode ? "#000" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <Spin size="large" className="loading" />
      ) : (
        <>
          <Col span={14}>
            <Row>
              <Col span={24} className="image">
                <Image
                  style={{
                    objectFit: "cover",
                    objectPosition: "0% 60%",
                    maxWidth: 800,
                    maxHeight: 500,
                  }}
                  src={book?.image}
                  alt="book"
                />
              </Col>
              <Col span={24} className="title">
                <h2>{book?.title} - Total Rating: {totalRating}</h2>
              </Col>
              <Col span={24} className="content" >
                <p>{book?.body}</p>
              </Col>
              <Col span={4} offset={20} className="buttonContainer">
                <CostumLink to={`update`}>
                  <Button type="link">更新</Button>
                </CostumLink>
                <Button type="link" danger onClick={() => handleDelete()}>
                  刪除
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={8} offset={2}>
            {book && <Comment book={book} />}
          </Col>
        </>
      )}
    </Row>
  );
}

export default Detail;
