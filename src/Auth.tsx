import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const Auth = () => {
	const [session, setSession] = useState<null | { user: { email: string } }>(
		null
	);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [resetPasswordMode, setResetPasswordMode] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		async function fetchSession(){
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
		};

		fetchSession();
	}, []);

	async function handleSignUp(){
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) {
				throw error;
			}
			console.log('User signed up:', data.user);
			alert('Sign up successful!');
		} catch (error: any) {
			console.log('Error signing up:', error);
			alert(error.message);
		}
	};

	async function handleSignIn(){
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
			alert('Sign in successful!');
		} catch (error: any) {
			console.error('Error signing in:', error.message);
			alert(error.message);
		}
	};

	async function handleGoogleSignIn(){
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
			});
			if (error) {
				throw error;
			}

			const userResponse = await supabase.auth.getUser();

			// 嚴格型別檢查
			const user = userResponse.data?.user;
			if (user && user.email) {
				setSession({ user: { email: user.email } });
				alert('Sign in with Google successful!');
			} else {
				throw new Error('Failed to retrieve user email.');
			}
		} catch (error: any) {
			console.error('Error signing in with Google:', error.message);
			alert(error.message);
		}
	};

	async function handleSignOut(){
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}
			console.log('User signed out');
			setSession(null);
			alert('Sign out successful!');
		} catch (error: any) {
			console.error('Error signing out:', error);
			alert(error.message);
		}
	};

	async function handleForgotPassword(){
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email);
			if (error) {
				throw error;
			}
			alert('Password reset email sent. Please check your inbox.');
		} catch (error: any) {
			console.error('Error resetting password:', error);
			alert(error.message);
		}
	};

	async function handleResetPassword(){
		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) {
				throw error;
			}
			alert('Password updated successfully.');
			setResetPasswordMode(false);
		} catch (error: any) {
			console.error('Error updating password:', error);
			alert(error.message);
		}
	};

	async function handleChangePassword(){
		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) {
				throw error;
			}
			alert('Password updated successfully.');
			setShowChangePassword(false);
		} catch (error: any) {
			console.error('Error updating password:', error);
			alert(error.message);
		}
	};

	return (
		<div>
			<h2>Supabase Auth</h2>
			<p>User: {session ? session.user.email : 'Not signed in'}</p>
			{!session && !resetPasswordMode && (
				<div>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleSignUp}>Sign Up</button>
					<button onClick={handleForgotPassword}>Forgot Password</button>
					<button onClick={handleSignIn}>Sign In</button>
					<button onClick={handleGoogleSignIn}>Sign In with Google</button>
				</div>
			)}
			{resetPasswordMode && (
				<div>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button onClick={handleResetPassword}>Reset Password</button>
					<button onClick={() => setResetPasswordMode(false)}>Cancel</button>
				</div>
			)}
			{session && (
				<div>
					<button onClick={handleSignOut}>Sign Out</button>
					{!showChangePassword && (
						<button onClick={() => setShowChangePassword(true)}>
							Change Password
						</button>
					)}
					{showChangePassword && (
						<div>
							<input
								type="password"
								placeholder="New password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<button onClick={handleChangePassword}>Update Password</button>
							<button onClick={() => setShowChangePassword(false)}>
								Cancel
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Auth;
