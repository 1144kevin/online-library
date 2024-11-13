import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { message } from "antd";
import "./update.scss";
import { getBookData, updateBookData } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../../components/BookForm/bookForm";

// Define a type for the book data
type Book = {
  userId: number;
  id: string;
  image: string;
  title: string;
  body: string;
};

const Update = () => {
  const { dataId } = useParams();
  const [data, setData] = useState<Book[]>([]);
  const navigate = useNavigate();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.title && formData.body) {
      updateBookData(formData).then(()=>{
        message.success("更新成功");
        navigate(-1);
      });
    }
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

  return (
    <Layout>
      <BookForm
        formData={formData}
        onFormChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={
          handleFileChange as (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => void
        }
        isUpdate
      />
    </Layout>
  );
};

export default Update;
