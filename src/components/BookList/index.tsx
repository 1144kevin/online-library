import { Row, Col,} from "antd";
import BookCard from "../BookCard";
import { bookDataType2 } from "../../assets/data";
import'./bookList.scss'

interface BookListProps {
    bookList: bookDataType2[];
}

const BookList = ({ bookList }: BookListProps) => {
    
    return (
        <Row>
            {bookList.map((book) => (
                <Col md={12} xl={8} xxl={6} key={book.id} className="book">
                    <BookCard book={book}/>
                </Col>
            ))}
        </Row>
    );
}

export default BookList;

