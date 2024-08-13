import React, { useContext } from "react";
import { Row, Col } from "antd";
import { Card } from 'antd';
import { bookDataType2 } from "../../assets/data";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import './bookCard.scss'
import CustomLink from "../Link";
interface BookCardProps {
  book: bookDataType2;
}

const { Meta } = Card;

const BookCard = ({ book }: BookCardProps) => {
  

  return (
    <Row>
      <Col>
        <CustomLink to={`/detail/id/${book.id}`}>
          <Card
            hoverable
            className="card"
            style={{ width: 240 }}
            cover={<img alt="example" src={"https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg"} style={{ height: 240, objectFit: "cover" }} />}
          >
            <Meta title={book.title} description={book.body} />
          </Card>
        </CustomLink>
      </Col>
      <Col className="icon">
        <IoBookmarkOutline />
        {/* {book.isFavorite ? (
         
        ) : (
          <IoBookmark className="icon__image" />
        )} */}
      </Col>
    </Row>
  )
}

export default BookCard;