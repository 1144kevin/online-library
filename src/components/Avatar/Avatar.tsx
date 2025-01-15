import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Col, Row, Image, Button, Spin, Skeleton } from 'antd';
import './Avatar.scss';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';

interface AvatarProps {
	url: string | null;
	onUpload: (file: File) => void;
}

export default function Avatar({ url, onUpload }: AvatarProps) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [imageLoading, setImageLoading] = useState<boolean | null>(null);

	useEffect(() => {
		if (url) downloadImage(url);
	}, [url]);

	const downloadImage = async (path: string) => {
		try {
			setImageLoading(true);
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
		} catch (error: any) {
			console.log('Error downloading image: ', error.message);
		} finally {
			setImageLoading(false);
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
			setAvatarUrl(previewUrl);
			onUpload(file);
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<Row gutter={[0, 16]} className="avatar">
			<Col span={24}>
				{imageLoading ? (
					<Skeleton.Image
						className="skeletonImage"
						active={true}
						style={{ width: '200px', height: '200px', borderRadius: '50%' }}
					/>
				) : (
					<Image
						src={avatarUrl || 'default_avatar_url'}
						alt={avatarUrl ? 'Avatar' : 'No image'}
						style={{
							height: 200,
							width: 200,
							objectFit: 'cover',
							borderRadius: '50%',
						}}
					/>
				)}
			</Col>
			<Col span={24} className="imagePicker__button">
				<input
					type="file"
					id="upload"
					accept="image/*"
					onChange={handleFileSelect}
					style={{ display: 'none' }}
				/>
				<Button
					type="primary"
					onClick={() => document.getElementById('upload')?.click()}
				>
					Select Avatar
				</Button>
			</Col>
		</Row>
	);
}
