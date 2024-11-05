import React, { useState } from "react";
import Layout from "../../Layout";
import { message } from "antd";
import "./add.scss";
import { addBookData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import BookForm from "../../components/BookForm/bookForm";

function Add() {
  const [formData, setFormData] = useState({
    userId: 1,
    id: "",
    image: "",
    title: "",
    body: "",
    comment: "",
    totalRating: 0,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = () => {
    const request = {
      ...formData,
      id: uuidv4(),
    };
    addBookData(request);
    message.success("新增成功");
    navigate(`/`);
  };

  return (
    <Layout>
      <BookForm
        formData={formData}
        onFormChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange as (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}
      />
    </Layout>
  );
}

export default Add;
