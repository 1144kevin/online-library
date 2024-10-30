import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Row, Col, Button, Input, Image, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./update.scss";
import { getBookData, updateBookData } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { bookDataType } from "../../assets/data";
import { useDispatch } from "react-redux";
import { updateFavorite } from "../../redux/favoriteSlice";

const Update = () => {
  const { dataId } = useParams();
  const [data, setData] = useState<bookDataType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TextArea 是 Ant Design 中的 Input 組件的擴展，用於顯示多行文本輸入框。它與普通的 Input 組件類似，只是允許用戶輸入多行文本。
  const { TextArea } = Input;

  useEffect(() => {
    getBookData().then(setData);
  }, []);

  const bookToUpdate = data.find((y) => y.id === dataId);

  const [formData, setFormData] = useState({
    userId: bookToUpdate?.userId || 1,
    id: bookToUpdate?.id || "",
    image: bookToUpdate?.image || "",
    title: bookToUpdate?.title || "",
    body: bookToUpdate?.body || "",
  });

  useEffect(() => {
    setFormData({
      userId: bookToUpdate?.userId || 1,
      id: bookToUpdate?.id || "",
      image: bookToUpdate?.image || "",
      title: bookToUpdate?.title || "",
      body: bookToUpdate?.body || "",
    });
  }, [bookToUpdate]);

  //e 是表單輸入元素（如 input 或 textarea）的變更事件對象。
  //React.ChangeEvent 是 React 特定的事件類型，它封裝了原生的 DOM 事件，並且可以用來處理不同類型的表單元素。
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //e.target 是觸發事件的 DOM 元素，name 是該元素的 name 屬性，value 是該元素的當前值。
    const { name, value } = e.target;
    //name 是從事件對象中解構出來的，它代表了表單輸入元素的 name 屬性。這個 name 屬性可以是 "title"、"body"、"userId" 等。
    //計算屬性名 是一種 JavaScript 語法，允許你在對象字面量中動態設置屬性名稱。這裡的 [name]: value 意味著根據 name 的值來動態地設置對象的屬性。
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.title && formData.body) {
      updateBookData(formData).then((updatedBook) => {
        message.success("更新成功");
        dispatch(updateFavorite(updatedBook)); // 更新 Redux store，讓redux的資料同步
        navigate(-1); 
      });
    }
  };

  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>UPDATE BOOK</h1>
          </Col>
          <Col span={8} offset={8} className="imagePicker">
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col>
                <Image
                  src={formData.image}
                  style={{ height: 200, width: 200, objectFit: "cover" }}
                />
              </Col>
              <Col offset={2} className="imagePicker__button">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>
            </Row>
          </Col>

          <Col span={8} offset={8} className="title__input">
            <Input
              showCount
              maxLength={100}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Col>
          <Col span={8} offset={8} className="content__input">
            <TextArea
              showCount
              maxLength={400}
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Enter content here"
              style={{ height: 120, resize: "none" }}
            />
          </Col>
          <Col
            span={8}
            offset={8}
            className="submitButton"
            style={{ minHeight: "30vh" }}
          >
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Update;
