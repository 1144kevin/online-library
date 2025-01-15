// get the fields values
import { useState, useEffect } from 'react';
import Layout from '../../Layout/layout';
import { supabase } from '../../supabaseClient';
import Avatar from '../../components/Avatar/Avatar';
import { Session } from '@supabase/supabase-js';
import { Row, Col, Form, Input, Button, Spin, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './profile.scss';

interface AccountProps {
	session: Session | null;
}

const Profile = ({ session }: AccountProps) => {
	const [loading, setLoading] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);
	const [avatar_url, setAvatarUrl] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	useEffect(() => {
		getProfile();
	}, [session]);

	const getProfile = async (useInitialLoading = true) => {
		try {
			// 根據參數決定是否啟用初次加載的 loading 狀態
			if (useInitialLoading) {
				setLoading(true);
			}
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) throw new Error('No user');

			let { data } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error: any) {
			console.error('Error loading profile:', error.message);
			alert(error.message);
		} finally {
			if (useInitialLoading) {
				setLoading(false);
			}
		}
	};

	const updateProfile = async (values: any) => {
		try {
			setUpdateLoading(true);
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) throw new Error('No user');

			let newAvatarUrl = avatar_url;
			if (avatarFile) {
				// 如果有舊檔案，先刪除
				if (avatar_url) {
					console.log('avatar_url', avatar_url);
					const { error: deleteError } = await supabase.storage
						.from('avatars')
						.remove([avatar_url]); // 刪除舊檔案
					if (deleteError) {
						console.error('Error deleting old file:', deleteError.message);
						throw new Error('Failed to delete old avatar.');
					}
				}

				const filePath = `${user.id + '/' + uuidv4()}`;

				let { error: uploadError } = await supabase.storage
					.from('avatars')
					.upload(filePath, avatarFile);

				if (uploadError) throw uploadError;
				newAvatarUrl = filePath;
			}

			const updates = {
				id: user.id,
				username: values.username,
				website: values.website,
				avatar_url: newAvatarUrl,
				updated_at: new Date(),
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;
			await getProfile(false);
			message.success('更新成功');
			// alert('Profile updated successfully!');
			setAvatarFile(null);
		} catch (error: any) {
			alert(error.message);
		} finally {
			setUpdateLoading(false);
		}
	};

	return (
		<Layout>
			<Row
				className="profile"
				gutter={[0, 10]}
				style={{
					height: '70vh',
					alignContent: 'center',
					paddingTop:'6rem'
				}}
			>
				{loading ? (
					<Spin size="large" className="loading" />
				) : (
					<>
						<Col span={24} className="title">
							<h1>Profile</h1>
						</Col>
						<Col className="profile_container" span={24}>
							<Form
								name="profile"
								initialValues={{
									username: username || '',
									website: website || '',
								}}
								onFinish={updateProfile}
							>
								<Row gutter={[0, 32]}>
									<Col span={24}>
										<Avatar
											url={avatar_url}
											onUpload={(file: File) => {
												setAvatarFile(file);
											}}
										/>
									</Col>
									<Col span={8} offset={8}>
										<Form.Item
											name="username"
											rules={[
												{ required: true, message: 'Please input your name!' },
											]}
											style={{ marginBottom: '2rem' }}
										>
											<Input type="text" placeholder="Your Name" />
										</Form.Item>
										<Form.Item
											name="website"
											rules={[
												{
													required: true,
													message: 'Please input your website!',
												},
											]}
											style={{ marginBottom: '3rem' }}
										>
											<Input type="text" placeholder="your@website.com" />
										</Form.Item>
										<Form.Item>
											<Button
												type="primary"
												htmlType="submit"
												className="button"
												loading={updateLoading}
											>
												Update Profile
											</Button>
										</Form.Item>
									</Col>
								</Row>
							</Form>
						</Col>
					</>
				)}
			</Row>
		</Layout>
	);
};

export default Profile;
