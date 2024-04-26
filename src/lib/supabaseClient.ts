import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://doqbasqizdamoxbuzzim.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcWJhc3FpemRhbW94YnV6emltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNzI0NDgsImV4cCI6MjAyNzg0ODQ0OH0.PzKVSN5hNhwjq_uT_bEaC2XqisU69DyG_8XI-xiShhQ'
);
