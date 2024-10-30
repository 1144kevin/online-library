import React, { useState } from "react";
import Layout from "../../Layout";
import { Row, Col, Button, Input, Image, message } from "antd";
import "./add.scss";
import { bookDataType } from "../../assets/data";
import { addBookData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Add() {
  const [formData, setFormData] = useState({
    userId: 1,
    id: "1",
    image: "",
    title: "",
    body: "",
    comment: "",
    totalRating: 0,
  });

  const { title, body } = formData;
  const { TextArea } = Input;
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          // 確保 result 是 string 類型
          setFormData((prevData) => ({ ...prevData, image: result }));
          message.success(`${file.name} 文件已準備好`);
        }
      };
      reader.onerror = () => {
        message.error(`${file.name} 文件讀取失敗`);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(book: bookDataType) {
    console.log("book", book);
    const request = {
      ...book,
      id: uuidv4(), // 自動生成一個新的 'id' 並轉成字串
    };
    addBookData(request);
    message.success("新增成功"); // 顯示新增成功的訊息
    navigate(`/`); // 跳回首頁
  }

  return (
    <>
      <Layout>
        <Row className="add">
          <Col span={24} className="title">
            <h1>Add Book</h1>
          </Col>
          <Col span={8} offset={8} className="imagePicker">
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col>
                {formData.image === "" ? (
                  <Image
                    src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                    alt=""
                    preview={false}
                    height={200}
                    width={200}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src={formData.image}
                    alt="Uploaded book cover"
                    height={200}
                    width={200}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Col>
              <Col offset={2} className="imagePicker__button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="upload"
                  hidden
                />
                <label htmlFor="upload">Choose file</label>
              </Col>
            </Row>
          </Col>

          <Col span={8} offset={8} className="title__input">
            <Input
              name="title"
              showCount
              maxLength={100}
              value={title}
              onChange={handleChange}
            />
          </Col>
          <Col span={8} offset={8} className="content__input">
            <TextArea
              showCount
              maxLength={400}
              placeholder="disable resize"
              name="body"
              value={body}
              onChange={handleChange}
              style={{ height: 120, resize: "none" }}
            />
          </Col>
          <Col
            span={8}
            offset={8}
            className="submitButton"
            style={{ minHeight: "30vh" }}
          >
            <Button
              type="primary"
              htmlType="button"
              onClick={() => handleSubmit(formData)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default Add;
