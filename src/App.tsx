import './App.scss';

import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/redux/store';
import Router from './router';
import Login from './pages/login/login';
import { useAuth } from './useAuth';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';
// import Auth from './Auth';

function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
	}, []);
	// const user = useUser();
	const { user } = useAuth();

	return (
		<>
			{user === null ? (
				<Login />
			) : (
				<ReduxProvider store={store}>
					<Router session={session} />
				</ReduxProvider>
			)}
		</>
	);
}

export default App;
