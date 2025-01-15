import { Row, Col } from 'antd';
import BookCard from '../BookCard/bookCard';
import { bookDataType } from '../../assets/data';
import './bookList.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import the RootState type

interface BookListProps {
	bookList: bookDataType[];
	handleFavorite: (book: bookDataType) => void;
}

const BookList = ({ bookList, handleFavorite }: BookListProps) => {
	const favoriteBooks = useSelector((state: RootState) => state.book.bookIds);

	// Convert the list of favorite books to a Set for quick lookups
	const favoriteBookIds = new Set(favoriteBooks.map((item) => item));

	// Determine if each book is a favorite
	const processedBookList = bookList.map((book) => ({
		...book,
		isFavorite: favoriteBookIds.has(book.id), // Check if the book's ID is in the set
	}));

	return (
		<Row style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			{processedBookList.map((book) => (
				<Col md={12} xl={8} xxl={6} key={book.id} className="book">
					<BookCard
						book={book}
						handleFavorite={handleFavorite}
					/>
				</Col>
			))}
		</Row>
	);
};

export default BookList;
