import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { App as AntdApp } from 'antd';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { AuthProvider } from './useAuth';


// const supabase = createClient(
// 	'https://hueqgjencebwwoogbidm.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZXFnamVuY2Vid3dvb2diaWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0OTA2NTYsImV4cCI6MjA0NzA2NjY1Nn0.JIvPxnZQkc5xgJCqKCI_auC42r3eiUqCxdWPS05hVJE'
// );

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<AuthProvider>
		<AntdApp>
			<App />
		</AntdApp>
	</AuthProvider>
);
