import { Row, Col } from "antd";
import { Card } from 'antd';
import { bookDataType } from "../../assets/data";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import './bookCard.scss'
import CustomLink from "../CustomLink";

interface BookCardProps {
  book: bookDataType & { isFavorite?: boolean };
  handleFavorite: (book: bookDataType) => void;
}

const { Meta } = Card;
const BookCard = ({ book, handleFavorite }: BookCardProps) => {

  const image = "https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg";

  return (
    <Row>
      <Col>
        <CustomLink to={`detail/id/${book.id}`}>
          <Card
            hoverable
            className="card"
            style={{ width: 240 }}
            cover={<img alt="example" src={image} style={{ height: 240, objectFit: "cover" }} />}
          >
            <Meta title={book.title} description={book.body} />
          </Card>
        </CustomLink>
      </Col>
      <Col className="icon" onClick={() => handleFavorite(book)}>
        {book.isFavorite ? (
          <IoBookmark /> // Filled bookmark icon
        ) : (
          <IoBookmarkOutline /> // Outline bookmark icon
        )}
      </Col>
    </Row>
  )
}

export default BookCard;