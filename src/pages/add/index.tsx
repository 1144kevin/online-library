import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Row, Col, Button, Input, Image, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./add.scss";
import { bookDataType } from "../../assets/data";
import { getBookData, addBookData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Add() {
  const [formData, setFormData] = useState({
    userId: 1,
    id: "1",
    image: "",
    title: "",
    body: "",
  });

  const { title, body } = formData;
  const { TextArea } = Input;
  const navigate = useNavigate();

  useEffect(() => {
    getBookData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        console.log("base64Image", base64Image);

        // Check if the image is already set to avoid multiple success messages
        if (!formData.image) {
          setFormData((prevData) => ({ ...prevData, image: base64Image }));
          message.success(`${info.file.name} 文件已準備好`);
        } else {
          setFormData((prevData) => ({ ...prevData, image: base64Image }));
        }
      };
      reader.onerror = () => {
        message.error(`${info.file.name} 文件讀取失敗`);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(book: bookDataType) {
    console.log("book", book);
    const request = {
      ...book,
      id: uuidv4(), // 自動生成一個新的 'id' 並轉成字串
    };
    await addBookData(request);
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
            <Row style={{display: "flex", justifyContent: "center"}}>
              <Col>
              {formData.image===""?
                <Image 
                  src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" 
                  alt=""
                  preview={false}
                  height={200}
                  width={200}
                  style={{objectFit: "cover"}}
                />
                :
                <Image src={formData.image} alt="Uploaded book cover" height={200} width={200} style={{objectFit: "cover"}}/>}
              </Col>
              <Col offset={2} className="imagePicker__button">
                <Upload
                  name="image"
                  onChange={handleUploadChange}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
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
          <Col span={8} offset={8} className="submitButton" style={{minHeight: "30vh"}}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default Add;
