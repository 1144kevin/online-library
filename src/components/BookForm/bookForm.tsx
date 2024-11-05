import React from "react";
import { Row, Col, Button, Input, Image } from "antd";

const { TextArea } = Input;

const BookForm = ({
  formData,
  onFormChange,
  onSubmit,
  onFileChange,
  isUpdate = false,
}: {
  formData: {
    image: string;
    title: string;
    body: string;
  };
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isUpdate?: boolean;
}) => {
  return (
    <Row>
      <Col span={24} className="title">
        <h1>{isUpdate ? "Update" : "Add"}</h1>
      </Col>
      <Col span={8} offset={8} className="imagePicker">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col>
            <Image
              src={
                formData.image ||
                "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
              }
              style={{ height: 200, width: 200, objectFit: "cover" }}
            />
          </Col>
          <Col offset={2} className="imagePicker__button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  id="upload"
                  hidden
                />
                <label htmlFor="upload">Choose file</label>
              </Col>
        </Row>
      </Col>

      <Col span={8} offset={8} className="title__input">
        <Input
          showCount
          maxLength={100}
          name="title"
          value={formData.title}
          onChange={onFormChange}
        />
      </Col>
      <Col span={8} offset={8} className="content__input">
        <TextArea
          showCount
          maxLength={400}
          name="body"
          value={formData.body}
          onChange={onFormChange}
          placeholder="Enter content here"
          style={{ height: 120, resize: "none" }}
        />
      </Col>
      <Col
        span={8}
        offset={8}
        className="submitButton"
        style={{ minHeight: "35vh" }}
      >
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export default BookForm;
