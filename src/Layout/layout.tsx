import { ReactNode, useEffect } from 'react';
import './layout.scss';
import { Row, Col, Button, message } from 'antd';
import NavBar from '../components/navBar/navBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { gsap } from 'gsap';
// @ts-ignore
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../supabaseClient';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
	children: ReactNode;
}

function Layout({ children }: LayoutProps) {
	const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state
	const navigate = useNavigate();

	useEffect(() => {
		ScrollTrigger.create({
			start: 'top -20',
			end: 99999,
			toggleClass: {
				className: 'custom-menu--scrolled',
				targets: '.custom-menu',
			},
		});
		// 清除 ScrollTrigger，防止內存洩漏
		return () =>
			ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) =>
				trigger.kill()
			);
	});

	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}
			console.log('User signed out');
			message.success('Sign out successful!');
		} catch (error: any) {
			console.error('Error signing out:', error);
			message.error(error.message);
		}
	};

	return (
		<Row className="layout">
			<Button
				type="primary"
				shape="circle"
				size="large"
				className="profile_button"
				onClick={() => navigate('/profile')}
			>
				Profile
			</Button>
			<Button
				type="primary"
				shape="circle"
				size="large"
				className="logout_button"
				onClick={handleSignOut}
			>
				Logout
			</Button>
			<Col
				span={24}
				style={{
					backgroundColor: isDarkMode ? '#000' : '#fff',
					color: isDarkMode ? '#fff' : '#000',
				}}
			>
				<Row className="header">
					<NavBar />
				</Row>
				<Row>
					<Col span={24}>{children}</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default Layout;
