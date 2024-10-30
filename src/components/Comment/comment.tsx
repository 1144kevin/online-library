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
import { toggleLike } from "../../redux/commentSlice";
import "./comment.scss";
import { v4 as uuidv4 } from "uuid";

const faceImage = Array.from({ length: 6 }).map((_, i) => ({
  id: `${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
}));

function Comment({
  book,
  onRatingUpdate,
}: {
  book: bookDataType;
  onRatingUpdate: () => void;
}) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const likedComments = useSelector(
    (state: RootState) => state.comment.likedComments
  );
  const [data, setData] = useState<bookDataType>(book);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [currentRating, setCurrentRating] = useState<number>(0);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  function handleAddComment() {
    const randomNumber = Math.floor(Math.random() * 6);
    const newCommentData = {
      userImage: faceImage[randomNumber].avatar,
      commentId: uuidv4(),
      userName: `user${randomNumber + 1}`,
      description: newComment,
      rating: currentRating,
    };

    const newData = {
      ...data,
      comments: [...comments, newCommentData],
      totalRating: (data.totalRating || 0) + currentRating,
    };
    
    updateBookData(newData);
    message.success('評論新增成功')
    setData(newData);
    setComments(newData.comments);
    setNewComment("");
    setCurrentRating(0);
    // 通知 Detail 組件更新 totalRating
    onRatingUpdate();
  }

  function handleDeleteComment(commentId: string) {
    const commentToDelete = comments.find(
      (comment) => comment.commentId === commentId
    );
    const newData = {
      ...data,
      comments: comments.filter((comment) => comment.commentId !== commentId),
      totalRating: (data.totalRating || 0) - (commentToDelete?.rating || 0),
    };
    updateBookData(newData);
    message.success('評論刪除成功')
    setData(newData);
    setComments(newData.comments);
    // 通知 Detail 組件更新 totalRating
    onRatingUpdate();
  }

  function handleEditClick(commentId: string, currentContent: string) {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
    setCurrentRating(
      data.comments?.find((comment) => comment.commentId === commentId)?.rating || 0
    );
  }

  function handleSaveEdit(commentId: string) {
    const commentToEdit = comments.find(
      (comment) => comment.commentId === commentId
    );
    const updatedComments = comments.map((comment) =>
      comment.commentId === commentId
        ? { ...comment, description: editedContent, rating: currentRating }
        : comment
    );
    const newData = {
      ...data,
      comments: updatedComments,
      totalRating:
        (data.totalRating || 0) - (commentToEdit?.rating || 0) + currentRating,
    };
    updateBookData(newData);
    message.success('修改完成')
    setData(newData);
    setComments(updatedComments);
    setEditingCommentId(null);
    setCurrentRating(0);
    // 通知 Detail 組件更新 totalRating
    onRatingUpdate();
  }

  function handleToggleLike(commentId: string) {
    dispatch(toggleLike(commentId));
  }

  function handleRatingChange(value: number) {
    setCurrentRating(value);
  }

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
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
                  backgroundColor: "#fff",
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
                value={currentRating}
                onChange={(value) => handleRatingChange(value)}
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <List.Item.Meta
              avatar={<Avatar src={item.userImage} />}
              title={
                <span style={{ color: isDarkMode ? "#fff" : "#000" }}>
                  {item.userName}
                </span>
              }
              description={
                <span style={{ color: isDarkMode ? "#fff" : "#000" }}>
                  {item.description}
                </span>
              }
            />
            <Rate
              value={item.rating}
              onChange={(value) => handleRatingChange(value)}
              disabled={true}
            />
          </div>
        </List.Item>
      )}
    />
  );
}

export default Comment;
