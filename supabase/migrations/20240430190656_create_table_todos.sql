-- Table TODO linked to users
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- enable rls for table todos
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- create rls policy
CREATE POLICY select_todos_policy ON todos FOR SELECT USING (user_id = auth.uid());
CREATE POLICY insert_todos_policy ON todos FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY update_todos_policy ON todos FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY delete_todos_policy ON todos FOR DELETE USING (user_id = auth.uid());
