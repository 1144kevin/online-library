import { Row, Col, } from "antd";
import BookCard from "../BookCard";
import { bookDataType2 } from "../../assets/data";
import './bookList.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Import the RootState type

interface BookListProps {
  bookList: bookDataType2[];
  handleFavorite: (book: bookDataType2) => void;
}

const BookList = ({ bookList, handleFavorite }: BookListProps) => {

  const favoriteBooks = useSelector((state: RootState) => state.book.book);

  // Convert the list of favorite books to a Set for quick lookups
  const favoriteBookIds = new Set(favoriteBooks.map(item => item.book.id));

  // Determine if each book is a favorite
  const processedBookList = bookList.map(book => ({
    ...book,
    isFavorite: favoriteBookIds.has(book.id) // Check if the book's ID is in the set
  }));

  return (
    <Row>
      {processedBookList.map((book) => (
        <Col md={12} xl={8} xxl={6} key={book.id} className="book">
          <BookCard book={book} handleFavorite={handleFavorite} />
        </Col>
      ))}
    </Row>
  );
}

export default BookList;

