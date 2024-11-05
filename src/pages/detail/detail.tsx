import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button, message, Spin } from "antd";
import "./detail.scss";
import CostumLink from "../../components/CustomLink/customLink";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../redux/favoriteSlice";
import { getBookData, deleteBookData } from "../../api/api";
import { useEffect, useState } from "react";
import { bookDataType } from "../../assets/data";
import { RootState } from "../../redux/store";
import Comment from "../../components/Comment/comment";
import { StarFilled } from "@ant-design/icons";
import Layout from "../../Layout";

function Detail() {
  const { dataId } = useParams(); //用來獲取 URL 中的 dataId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<bookDataType[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [loading, setLoading] = useState(true);
  const [totalRating, setTotalRating] = useState<number | undefined>(undefined);
  const book = data.find((y) => y.id === dataId);

  useEffect(() => {
    setLoading(true);
    getBookData().then(setData);
    setTimeout(() => setLoading(false), 500);
  }, []);

  // 监听 book 变化并更新 totalRating
  useEffect(() => {
    if (book?.totalRating !== undefined) {
      setTotalRating(book.totalRating);
    }
  }, [book]);

  function handleRatingUpdate(updatedRating: number) {
    setTotalRating(updatedRating); // 直接更新 totalRating
  }

  function handleDelete() {
    deleteBookData(dataId!);
    //用來測試每個陣列元素。返回值是 true 的元素會被包括在新的陣列中，返回值是 false 的元素則被排除。
    const updatedData = data.filter((item) => item.id !== dataId);
    // 更新狀態
    setData(updatedData);

    // 检查并移除收藏夹中的书籍
    if (book) {
      dispatch(removeFavorite(book.id));
    }
    message.success("刪除成功");
    navigate("/");
  }

  return (
    <Layout>
      <Row
        className="layout"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
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
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                    paddingInline: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <StarFilled style={{ color: "#ffd700", fontSize: 20 }} />
                  <h2 style={{ margin: 0 }}>{totalRating}</h2>
                </Col>
                <Col
                  span={24}
                  className="title"
                  style={{ alignItems: "center" }}
                >
                  <h2 style={{ margin: 0 }}>{book?.title}</h2>
                </Col>
                <Col span={24} className="content">
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
            <Col span={8} offset={2} className={isDarkMode ? "darkMode" : ""}>
              {book && (
                <Comment book={book} onRatingUpdate={handleRatingUpdate} />
              )}
            </Col>
          </>
        )}
      </Row>
    </Layout>
  );
}

export default Detail;
