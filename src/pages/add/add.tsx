import React, { useState } from 'react';
import Layout from '../../Layout/layout';
import { message } from 'antd';
import './add.scss';
import { addBookData } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import BookForm from '../../components/BookForm/bookForm';
import { useAuth } from '../../useAuth';
import { commentDataType } from '../../assets/data';
import { supabase } from '../../supabaseClient';

function Add() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		user_id: '',
		id: '',
		image: '',
		title: '',
		body: '',
		comments: [] as commentDataType[],
		total_rating: 0,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
		} catch (error: any) {
			message.error(`文件讀取失敗`);
			alert(error.message);
		}
	};

	const handleSubmit = async () => {
		try {
			setLoading(true); 
			if (!user) {
				message.error('請先登入');
				return;
			}

			let imageUrl = '';
			if (imageFile) {
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
				id: uuidv4(),
				user_id: user.id,
				image: imageUrl,
			};

			await addBookData(request);
			message.success('新增成功');
			navigate('/');
		} catch (error: any) {
			message.error(error.message || '新增失敗');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout>
			<BookForm
				formData={formData}
				loading={loading}
				onFormChange={handleChange}
				onSubmit={handleSubmit}
				onFileChange={
					handleFileSelect as (
						e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
					) => void
				}
			/>
		</Layout>
	);
}

export default Add;
