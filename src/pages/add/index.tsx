import React, { useState } from "react";
import Layout from "../../Layout";
import { Row, Col, Button, Input, Image, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './add.scss';
import { bookDataType } from "../../assets/data";
import { useBook } from "../../components/BookContext";

const Add = () => {

  const [formData, setFormData] = useState({
    userId: 1,
    id: 0,
    title: "",
    body: "",
  });
  const { data, setData } = useBook();
  const { title, body } = formData;
  const { TextArea } = Input;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //e 是表單提交事件對象。React.FormEvent 是一個泛型，這裡用來描述來自 <form> 元素的提交事件。
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    //這行代碼用來阻止表單的默認提交行為，防止頁面刷新。這樣可以在前端處理表單數據，而不會觸發頁面的重載。
    e.preventDefault();

    //...data.map((item: bookDataType) => item.id)：這部分代碼將 data 中的每個書籍對象的 id 屬性提取出來，形成一個 id 值的陣列。
    const maxId = data.length > 0 ? Math.max(...data.map((item: bookDataType) => item.id)) : 0;
    const newId = maxId + 1;

    //這行代碼創建了一個新的對象 newFormData，這個對象基於 formData，但會將 id 屬性的值更新為 newId。
    const newFormData = { ...formData, id: newId };

    if (newId && title && body) {

      //將 newFormData 新增到 data 陣列的末尾
      const updatedData = [...data, newFormData];
      setData(updatedData);
      localStorage.setItem('booksData', JSON.stringify(updatedData));
      setFormData({ userId: 1, id: 0, title: "", body: "" });
      message.success('Book added successfully!');
    }
  };

  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>ADD BOOK</h1>
          </Col>
          <Col span={8} offset={8} className="imagePicker">
            <Row>
              <Col span={10} offset={4}>
                <Image
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Col>
              <Col span={2} offset={2} className="imagePicker__button">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>
            </Row>
          </Col>

          <Col span={6} offset={9} className="title__input">
            <Input name="title" showCount maxLength={100} value={title} onChange={handleChange} />
          </Col>
          <Col span={8} offset={8} className="content__input">
            <TextArea
              showCount
              maxLength={400}
              placeholder="disable resize"
              name="body"
              value={body}
              onChange={handleChange}
              style={{ height: 120, resize: 'none' }}
            />
          </Col>
          <Col span={8} offset={8} className="submitButton">
            <form onSubmit={handleSubmit}>
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