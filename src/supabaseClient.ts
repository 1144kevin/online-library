import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hueqgjencebwwoogbidm.supabase.co';

const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZXFnamVuY2Vid3dvb2diaWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0OTA2NTYsImV4cCI6MjA0NzA2NjY1Nn0.JIvPxnZQkc5xgJCqKCI_auC42r3eiUqCxdWPS05hVJE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
