import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button, message, Spin, Skeleton } from 'antd';
import './detail.scss';
import CostumLink from '../../components/CustomLink/customLink';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavoriteById } from '../../redux/favoriteSlice';
import { getBookData, deleteBookData } from '../../api/api';
import { useEffect, useState } from 'react';
import { bookDataType } from '../../assets/data';
import { RootState } from '../../redux/store';
import Comment from '../../components/Comment/comment';
import { StarFilled } from '@ant-design/icons';
import Layout from '../../Layout/layout';
import { isEmpty } from 'lodash';
import { useAuth } from '../../useAuth';
import { supabase } from '../../supabaseClient';

function Detail() {
	const { dataId } = useParams(); //用來獲取 URL 中的 dataId
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [data, setData] = useState<bookDataType[]>([]);
	const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
	const [bookLoading, setBookLoading] = useState(true);
	const [totalRating, setTotalRating] = useState<number | undefined>(0);
	const book = data.find((y) => y.id === dataId);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!book?.image) return;
		// 嘗試加載圖片
		const img = document.createElement('img') as HTMLImageElement;
		img.src = book?.image || '';
		img.onload = () => setLoading(false); // 圖片加載完成
		img.onerror = () => setLoading(false); // 圖片加載失敗
	}, [book?.image]);

	function handleRatingUpdate(updatedRating: number) {
		setTotalRating(updatedRating); // 直接更新 totalRating
	}

	async function handleDelete() {
		if (user) {
			deleteBookData(dataId!);

			// 如果有舊檔案，先刪除
			const imageUrl = book?.image || '';
			const storagePath = imageUrl.replace(
				'https://hueqgjencebwwoogbidm.supabase.co/storage/v1/object/public/images/',
				''
			);
			console.log('storagePath', storagePath);

			if (storagePath) {
				const { error: deleteError } = await supabase.storage
					.from('images')
					.remove([storagePath]); // 刪除舊檔案
				if (deleteError) {
					console.error('Error deleting old file:', deleteError.message);
					throw new Error('Failed to delete image.');
				}
			}

			//用來測試每個陣列元素。返回值是 true 的元素會被包括在新的陣列中，返回值是 false 的元素則被排除。
			const updatedData = data.filter((item) => item.id !== dataId);
			// 更新狀態
			setData(updatedData);

			if (book) {
				dispatch(removeFavoriteById(book.id));
			}
			message.success('刪除成功');
			navigate('/');
		}
	}

	useEffect(() => {
		if (user) {
			setBookLoading(true);
			getBookData(user.id).then(setData);
			setBookLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (isEmpty(book)) return;

		setTotalRating(book?.total_rating || 0);
	}, [book]);

	return (
		<Layout>
			<Row
				className="detail"
				style={{
					backgroundColor: isDarkMode ? '#000' : '#fff',
					color: isDarkMode ? '#fff' : '#000',
				}}
			>
				{bookLoading ? (
					<Spin size="large" className="loading" />
				) : (
					<>
						<Col span={14}>
							<Row>
								<Col span={24} className="image">
									{loading ? (
										<Skeleton.Image
											className="skeletonImage"
											active={true}
											style={{
												width: '550px',
												height: '500px',
											}}
										/>
									) : (
										<Image
											style={{
												objectFit: 'cover',
												// objectPosition: '0% 65%',
												width: 550,
												height: 500,
											}}
											src={book?.image}
											alt="book"
										/>
									)}
								</Col>
								<Col
									span={24}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 5,
										justifyContent: 'flex-end',
										paddingInline: '1rem',
										marginTop: '0.5rem',
									}}
								>
									<StarFilled style={{ color: '#ffd700', fontSize: 20 }} />
									<h2 style={{ margin: 0 }}>{totalRating}</h2>
								</Col>
								<Col
									span={24}
									className="title"
									style={{ alignItems: 'center' }}
								>
									<h2 style={{ margin: 0 }}>{book?.title}</h2>
								</Col>
								<Col span={24} className="content">
									<p>{book?.body}</p>
								</Col>
								<Col span={4} offset={20} className="buttonContainer">
									<CostumLink to={`update`}>
										<Button type="link">更新</Button>
									</CostumLink>
									<Button type="link" danger onClick={() => handleDelete()}>
										刪除
									</Button>
								</Col>
							</Row>
						</Col>
						<Col span={8} offset={2} className={isDarkMode ? 'darkMode' : ''}>
							{book && (
								<Comment book={book} onRatingUpdate={handleRatingUpdate} />
							)}
						</Col>
					</>
				)}
			</Row>
		</Layout>
	);
}

export default Detail;
