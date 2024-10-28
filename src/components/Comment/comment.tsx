import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LikeOutlined,
  LikeFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, List, Input, Button, Rate, Row, Col, message } from "antd";
import { updateBookData } from "../../api/api";
import { bookDataType } from "../../assets/data";
import { RootState } from "../../redux/store";
import { toggleLike, setRating } from "../../redux/commentSlice";
import "./comment.scss";
import { v4 as uuidv4 } from "uuid";

const faceImage = Array.from({ length: 6 }).map((_, i) => ({
  id: `${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
}));

function Comment({ book }: { book: bookDataType }) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const likedComments = useSelector(
    (state: RootState) => state.comment.likedComments
  );
  const ratings = useSelector((state: RootState) => state.comment.ratings);
  const [data, setData] = useState<bookDataType>(book);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); 

  async function handleAddComment() {
    const randomNumber = Math.floor(Math.random() * 6);
    try {
      const newCommentData = {
        userImage: faceImage[randomNumber].avatar,
        commentId: uuidv4(),
        userName: `user${randomNumber + 1}`,
        description: newComment,
      };
      console.log("newCommentData", newCommentData);
      const newData = {
        ...data,
        comments: [...comments, newCommentData],
      };
      await updateBookData(newData);
      setData(newData);
      setComments(newData.comments);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Error adding comment");
    }
  }

  async function handleDeleteComment(commentId: string) {
    const newData = {
      ...data,
      comments: comments.filter((comment) => comment.commentId !== commentId),
    };
    await updateBookData(newData);
    setData(newData);
    setComments(newData.comments);
  }

  function handleEditClick(commentId: string, currentContent: string) {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  }

  async function handleSaveEdit(commentId: string) {
    const updatedComments = comments.map((comment) =>
      comment.commentId === commentId
        ? { ...comment, description: editedContent }
        : comment
    );
    const newData = { ...data, comments: updatedComments };
    await updateBookData(newData);
    setData(newData);
    setComments(updatedComments);
    setEditingCommentId(null);
  }

  function handleToggleLike(commentId: string) {
    dispatch(toggleLike(commentId));
  }

  function handleRatingChange(commentId: string, value: number) {
    dispatch(setRating({ commentId, rating: value }));
  }

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={comments}
      footer={
        <Row style={{ height: 150 }} gutter={[8, 8]}>
          <Col span={24}>
            {editingCommentId ? (
              <TextArea
                rows={4}
                value={editedContent}
                style={{
                  backgroundColor: "#fff"
                }}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <TextArea
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            )}
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p style={{ color: isDarkMode ? "#fff" : "#000" }}>評分</p>
              <Rate
                allowHalf
                defaultValue={2.5}
                disabled={!!editingCommentId}
                onChange={(value) => handleRatingChange(editingCommentId!, value)}
              />
            </div>
            {editingCommentId ? (
              <Button
                type="primary"
                onClick={() => handleSaveEdit(editingCommentId)}
              >
                Save
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleAddComment}
              >
                Submit
              </Button>
            )}
          </Col>
        </Row>
      }
      renderItem={(item) => (
        <List.Item
          key={item.commentId}
          actions={[
            likedComments[item.commentId] ? (
              <LikeFilled
                style={{ color: isDarkMode ? "#fff" : "#000" }}
                className="like-icon"
                onClick={() => handleToggleLike(item.commentId)}
              />
            ) : (
              <LikeOutlined
                style={{ color: isDarkMode ? "#fff" : "" }}
                className="like-icon"
                onClick={() => handleToggleLike(item.commentId)}
              />
            ),
            <EditOutlined
              style={{ color: isDarkMode ? "#fff" : "" }}
              className="edit-icon"
              onClick={() => handleEditClick(item.commentId, item.description)}
            />,
            <DeleteOutlined
              style={{ color: isDarkMode ? "#fff" : "" }}
              className="delete-icon"
              onClick={() => handleDeleteComment(item.commentId)}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.userImage} />}
            title={<span style={{ color: isDarkMode ? "#fff" : "#000" }}>{item.userName}</span>}
            description={<span style={{ color: isDarkMode ? "#fff" : "#000" }}>{item.description}</span>}
          />
          <Rate
            allowHalf
            value={ratings[item.commentId] || 0}
            onChange={(value) => handleRatingChange(item.commentId, value)}
            disabled={!!editingCommentId && editingCommentId !== item.commentId}
          />
        </List.Item>
      )}
    />
  );
}

export default Comment;
