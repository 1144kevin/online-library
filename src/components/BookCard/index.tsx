import React, { useContext } from "react";
import { Row, Col } from "antd";
import { Card } from 'antd';
import { bookDataType } from "../../assets/data";
import { BookContext } from "../../context/bookContext";
import { IoBookmarkOutline,IoBookmark } from "react-icons/io5";
import './bookCard.scss'

interface BookCardProps {
  book: bookDataType;
}

const { Meta } = Card;

const BookCard = ({ book }: BookCardProps) => {
  const { dispatch } = useContext(BookContext);
  const handleToggleBookmark = (id: string) => {
    dispatch({ type: "TOOGLE BOOKMARK", id })
  }
  return (
    <Row>
      <Col>
        <Card
          hoverable
          className="card"
          style={{ width: 240 }}
          cover={<img alt="example" src={book.image} style={{ height: 240, objectFit: "cover" }} />}
        >
          <Meta title={book.title} description={book.description} />
        </Card>
      </Col>
      <Col className="icon" onClick={() => handleToggleBookmark(book.id)}>
        {book.isFavorite ? (
          <IoBookmarkOutline/>
        ) : (
          <IoBookmark className="icon__image" />
        )}
      </Col>
    </Row>
  )
}

export default BookCard;