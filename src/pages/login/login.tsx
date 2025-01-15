import { Col, Row } from 'antd';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

import './login.scss';

const Login = () => {
	const [session, setSession] = useState<null | { user: { email: string } }>(
		null
	);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [resetPasswordMode, setResetPasswordMode] = useState(false);
	// const [showChangePassword, setShowChangePassword] = useState(false);
	// const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		async function fetchSession() {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (session?.user?.email) {
					setSession({ user: { email: session.user.email } });
				} else {
					setSession(null);
				}
			} catch (error: any) {
				console.error('Error fetching session:', error.message);
			}
		}

		fetchSession();
	}, []);

	async function handleSignUp() {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) {
				throw error;
			}
			console.log('User signed up:', data.user);
			message.success('Sign up successful!');
		} catch (error: any) {
			console.log('Error signing up:', error);
			message.error(error.message);
		}
	}

	async function handleSignIn() {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				throw error;
			}
			if (data?.user?.email) {
				setSession({ user: { email: data.user.email } });
			} else {
				throw new Error('Email is undefined');
			}
			message.success('Sign in successful!');
		} catch (error: any) {
			console.error('Error signing in:', error.message);
			message.error(error.message);
		}
	}

	// async function handleGoogleSignIn() {
	// 	try {
	// 		const { data, error } = await supabase.auth.signInWithOAuth({
	// 			provider: 'google',
	// 		});
	// 		if (error) {
	// 			throw error;
	// 		}

	// 		const userResponse = await supabase.auth.getUser();

	// 		// 嚴格型別檢查
	// 		const user = userResponse.data?.user;
	// 		if (user && user.email) {
	// 			setSession({ user: { email: user.email } });
	// 			message.success('Sign in with Google successful!');
	// 		} else {
	// 			throw new Error('Failed to retrieve user email.');
	// 		}
	// 	} catch (error: any) {
	// 		console.error('Error signing in with Google:', error.message);
	// 		message.error(error.message);
	// 	}
	// }

	async function handleForgotPassword() {
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email);
			if (error) {
				throw error;
			}
			message.success('Password reset email sent. Please check your inbox.');
		} catch (error: any) {
			console.error('Error resetting password:', error);
			message.error(error.message);
		}
	}

	// async function handleResetPassword() {
	// 	try {
	// 		const { error } = await supabase.auth.updateUser({
	// 			password: newPassword,
	// 		});
	// 		if (error) {
	// 			throw error;
	// 		}
	// 		message.success('Password updated successfully.');
	// 		setResetPasswordMode(false);
	// 	} catch (error: any) {
	// 		console.error('Error updating password:', error);
	// 		message.error(error.message);
	// 	}
	// }

	// async function handleChangePassword() {
	// 	try {
	// 		const { error } = await supabase.auth.updateUser({
	// 			password: newPassword,
	// 		});
	// 		if (error) {
	// 			throw error;
	// 		}
	// 		message.success('Password updated successfully.');
	// 		setShowChangePassword(false);
	// 	} catch (error: any) {
	// 		console.error('Error updating password:', error);
	// 		message.error(error.message);
	// 	}
	// }
	// const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

	return (
		<Row
			className="login"
			gutter={[0, 10]}
			style={{
				height: '80vh',
				alignContent: 'center',
			}}
		>
			<Col span={24} className="title">
				<h1>Login</h1>
			</Col>
			<Col className="login_Container" span={8} offset={8}>
				<Form name="login" initialValues={{ remember: true }}>
					<Form.Item
						name="Email"
						rules={[{ required: true, message: 'Please input your Email!' }]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							value={email}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined />}
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</Form.Item>
					<Form.Item>
						<Flex justify="space-between" align="center">
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<a href=" " onClick={handleForgotPassword}>
								Forgot password
							</a>
						</Flex>
					</Form.Item>
				</Form>
			</Col>
			<Col
				span={8}
				offset={8}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<Button
					type="primary"
					htmlType="submit"
					className="button"
					onClick={handleSignIn}
				>
					Sign In
				</Button>
				<Button
					type="primary"
					htmlType="submit"
					className="button"
					onClick={handleSignUp}
				>
					Sign Up
				</Button>
				{/* or <a href=" " onClick={handleForgotPassword}>Register now!</a> */}
			</Col>
		</Row>
	);
};

export default Login;
