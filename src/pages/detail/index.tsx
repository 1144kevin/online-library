import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button } from "antd";
import './detail.scss'
import CostumLink from "../../components/CustomLink"
import { useBook } from "../../components/BookContext";
import { useDispatch } from "react-redux";
import { removeFromFavorite } from "../../redux/favoriteSlice";

const Detail = () => {

  const { data, setData } = useBook();
  const { dataId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //?? 是 JavaScript 中的空值合併操作符，當 dataId 為 null 或 undefined 時，返回 ""（空字符串）。確保 parseInt 不會收到 null 或 undefined
  //parseInt 是 JavaScript 的內建函數，用於將字符串轉換為整數
  const parsedDataId = parseInt(dataId ?? "", 10);

  //find 是 JavaScript 陣列上的一個方法，它用來在數組中查找第一個符合條件的元素。
  const book = data.find(
    (y) => y.id === parsedDataId
  );

  const handleDelete = (id: number) => {

    //用來測試每個陣列元素。返回值是 true 的元素會被包括在新的陣列中，返回值是 false 的元素則被排除。
    const updatedData = data.filter(item => item.id !== id);
    // 更新狀態
    setData(updatedData);

    // 將更新後的數據保存回 localStorage
    localStorage.setItem('booksData', JSON.stringify(updatedData));

    //bookId 是一個可能為 undefined 或 null 的對象
    if (book) {
      dispatch(removeFromFavorite(book));
    }
    navigate('/');
  };

  return (
    <Row className="layout">
      <Col span={12} offset={6} className="image">
        <Image
          width={400}
          src="https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg"
        />
      </Col>
      <Col span={6} offset={9} className="title">
        <h2>{book?.title}</h2>
      </Col>
      <Col span={14} offset={5} className="content">
        <p>{book?.body}</p>
      </Col>
      <Col span={10} offset={7} className="buttonContainer">
        <CostumLink to={`update`}>
          <Button type="link">
            更新
          </Button>
        </CostumLink>
        <Button type="link" danger onClick={() => handleDelete(book?.id!)}>
          刪除
        </Button>
      </Col>
    </Row>

  );
};

export default Detail;