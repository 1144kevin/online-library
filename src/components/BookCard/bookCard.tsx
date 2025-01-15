import { Row, Col, Skeleton } from 'antd';
import { Card } from 'antd';
import { bookDataType } from '../../assets/data';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import './bookCard.scss';
import CustomLink from '../CustomLink/customLink';
import { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

interface BookCardProps {
	book: bookDataType & { isFavorite?: boolean };
	handleFavorite: (book: bookDataType) => void;
}

const { Meta } = Card;
const BookCard = ({ book,handleFavorite }: BookCardProps) => {

	// const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state

  const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 嘗試加載圖片
		const img = new Image();
		img.src = book.image || 'https://via.placeholder.com/200';
		img.onload = () => setLoading(false); // 圖片加載完成
		img.onerror = () => setLoading(false); // 圖片加載失敗
	}, [book.image]);

	return (
		<Row className="bookCard">
			<Col>
				<CustomLink to={`detail/id/${book.id}`}>
					<Card
						hoverable
						className="card"
						style={{ width: 240, height: 340 }}
						cover={
							loading ? (
								<Skeleton.Image
									active={true}
									style={{
										width: '240px',
										height: '240px',
									}}
								/>
							) : (
								<img
									alt="example"
									src={book.image}
									style={{ height: 240, objectFit: 'cover' }}
								/>
							)
						}
					>
						<Meta
							title={book.title}
							description={book.body}
							className="content"
						/>
					</Card>
				</CustomLink>
				<Col className="icon" onClick={() => handleFavorite(book)}>
					{book.isFavorite ? (
						<IoBookmark color="#000" /> // Filled bookmark icon
					) : (
						<IoBookmarkOutline color="#000" /> // Outline bookmark icon
					)}
				</Col>
			</Col>
		</Row>
	);
};

export default BookCard;
