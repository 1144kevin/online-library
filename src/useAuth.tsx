import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
	FC,
} from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

// 定義 Context 的型別
interface AuthContextType {
	user: User | null;
}

// 初始化 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				setUser(session?.user ?? null);
			} catch (error) {
				console.error('Error fetching session', error);
			}
		}

		fetchUser();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

// 自定義 Hook
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
