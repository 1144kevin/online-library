import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/layout';
import { message, Spin } from 'antd';
import './update.scss';
import { getBookData, updateBookData } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../../components/BookForm/bookForm';
import { useAuth } from '../../useAuth';
import { bookDataType } from '../../assets/data';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../supabaseClient';

const Update = () => {
	const { dataId } = useParams();
	const [data, setData] = useState<bookDataType[]>([]);
	const navigate = useNavigate();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [pageLoading, setPageLoading] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		async function fetchData() {
			setPageLoading(true);
			if (!user) return;
			try {
				await getBookData(user.id).then(setData);
			} catch (error: any) {
				message.error('Failed to fetch book data');
			} finally {
				setPageLoading(false);
			}
		}
		fetchData();
	}, [user]);

	const bookToUpdate = data.find((y) => y.id === dataId);
	console.log('bookToUpdate', bookToUpdate);

	const [formData, setFormData] = useState<bookDataType>({
		user_id: user?.id || '',
		id: bookToUpdate?.id || '',
		image: bookToUpdate?.image || '',
		title: bookToUpdate?.title || '',
		body: bookToUpdate?.body || '',
		total_rating: bookToUpdate?.total_rating || 0,
		comments: bookToUpdate?.comments || [],
	});

	useEffect(() => {
		if (bookToUpdate) {
			setFormData({
				user_id: user?.id || '',
				id: bookToUpdate.id,
				image: bookToUpdate.image,
				title: bookToUpdate.title,
				body: bookToUpdate.body,
				total_rating: bookToUpdate.total_rating || 0,
				comments: bookToUpdate.comments || [],
			});
		}
	}, [bookToUpdate, user]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (!user) {
				message.error('請先登入');
				return;
			}
			if (!formData.title || !formData.body) {
				message.error('Please fill in all required fields');
				return;
			}

			let imageUrl = formData.image || ''; // 默認使用現有的圖片 URL

			if (imageFile) {
				// 如果有舊檔案，先刪除
				const oldImageUrl = bookToUpdate?.image || '';
				const storagePath = oldImageUrl.replace(
					'https://hueqgjencebwwoogbidm.supabase.co/storage/v1/object/public/images/',
					''
				);

				if (storagePath) {
					const { error: deleteError } = await supabase.storage
						.from('images')
						.remove([storagePath]); // 刪除舊檔案
					if (deleteError) {
						console.error('Error deleting old file:', deleteError.message);
						throw new Error('Failed to delete image.');
					}
				}

				// 生成文件路徑
				const filePath = `${user.id}/${uuidv4()}`;

				let { error: uploadError } = await supabase.storage
					.from('images')
					.upload(filePath, imageFile);

				if (uploadError) throw uploadError;

				//獲取 publicUrl
				const { data: publicUrl } = supabase.storage
					.from('images')
					.getPublicUrl(filePath);

				imageUrl = publicUrl?.publicUrl || '';
			}

			const request = {
				...formData,
				image: imageUrl,
			};

			await updateBookData(request);
			message.success('更新成功');
			navigate(-1);
		} catch (error: any) {
			message.error(error.message || '更新失敗');
		} finally {
			setLoading(false);
		}
	};

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}
			const file = event.target.files[0];
			const previewUrl = URL.createObjectURL(file);
			setImageFile(file);
			setFormData((prevData) => ({ ...prevData, image: previewUrl }));
			message.success(`${file.name} 文件已準備好`);
			// setImageUrl(previewUrl);
		} catch (error: any) {
			message.error(`文件讀取失敗`);
			alert(error.message);
		}
	};

	return (
		<Layout>
			{pageLoading ? (
				<Spin size="large" className="loading" />
			) : (
				<BookForm
					loading={loading}
					formData={formData}
					onFormChange={handleChange}
					onSubmit={handleSubmit}
					onFileChange={
						handleFileSelect as (
							e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
						) => void
					}
					isUpdate
				/>
			)}
		</Layout>
	);
};

export default Update;
