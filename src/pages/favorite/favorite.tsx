import Layout from '../../Layout';
import BookList from '../../components/BookList/bookList';
import { bookDataType } from '../../assets/data';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/favoriteSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getBookData } from '../../api/api';

const Favorite = () => {
	const favoriteIds = useSelector((state: RootState) => state.book.bookIds);
	const [allBooks, setAllBooks] = useState<bookDataType[]>([]);
	const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

	const [localFavorites, setLocalFavorites] =
		useState<bookDataType[]>(allBooks);

	const dispatch = useDispatch();

	useEffect(() => {
		getBookData().then(setAllBooks);
	}, []);

	useEffect(() => {
		const favorites = allBooks.filter((book) => favoriteIds.includes(book.id));
		setLocalFavorites(favorites);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allBooks]);

	const handleFavoriteToggle = (book: bookDataType) => {
		console.log(12);
		dispatch(toggleFavorite(book.id));
	};

	return (
		<Layout>
			<Row
				style={{
					backgroundColor: isDarkMode ? '#000' : '#fff',
				}}
			>
				<Col span={24} className="title">
					<h1>Favorite</h1>
				</Col>
				<Col span={16} offset={4} style={{ minHeight: '100vh' }}>
					<BookList
						bookList={localFavorites}
						handleFavorite={handleFavoriteToggle}
					/>
				</Col>
			</Row>
		</Layout>
	);
};

export default Favorite;
