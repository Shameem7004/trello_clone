-- Clear existing data
DELETE FROM labels;
DELETE FROM members;
DELETE FROM cards;
DELETE FROM lists;
DELETE FROM boards;

-- Insert boards and get their IDs
WITH inserted_boards AS (
  INSERT INTO boards (title)
  VALUES 
  ('Sample Project Board'),
  ('Website Redesign'),
  ('Mobile App Launch')
  RETURNING id, title
),
board_ids AS (
  SELECT 
    id,
    title,
    ROW_NUMBER() OVER (ORDER BY title) as rn
  FROM inserted_boards
),
-- Insert lists
inserted_lists AS (
  INSERT INTO lists (title, position, board_id)
  SELECT title, position, board_id FROM (
    SELECT 'To Do' as title, 1 as position, (SELECT id FROM board_ids WHERE title = 'Sample Project Board') as board_id
    UNION ALL SELECT 'In Progress', 2, (SELECT id FROM board_ids WHERE title = 'Sample Project Board')
    UNION ALL SELECT 'Review', 3, (SELECT id FROM board_ids WHERE title = 'Sample Project Board')
    UNION ALL SELECT 'Done', 4, (SELECT id FROM board_ids WHERE title = 'Sample Project Board')
    UNION ALL SELECT 'Planning', 1, (SELECT id FROM board_ids WHERE title = 'Website Redesign')
    UNION ALL SELECT 'Design', 2, (SELECT id FROM board_ids WHERE title = 'Website Redesign')
    UNION ALL SELECT 'Development', 3, (SELECT id FROM board_ids WHERE title = 'Website Redesign')
    UNION ALL SELECT 'Testing', 4, (SELECT id FROM board_ids WHERE title = 'Website Redesign')
    UNION ALL SELECT 'Deployment', 5, (SELECT id FROM board_ids WHERE title = 'Website Redesign')
    UNION ALL SELECT 'Backlog', 1, (SELECT id FROM board_ids WHERE title = 'Mobile App Launch')
    UNION ALL SELECT 'Sprint 1', 2, (SELECT id FROM board_ids WHERE title = 'Mobile App Launch')
    UNION ALL SELECT 'Sprint 2', 3, (SELECT id FROM board_ids WHERE title = 'Mobile App Launch')
    UNION ALL SELECT 'QA', 4, (SELECT id FROM board_ids WHERE title = 'Mobile App Launch')
    UNION ALL SELECT 'Released', 5, (SELECT id FROM board_ids WHERE title = 'Mobile App Launch')
  ) t
  RETURNING id, title, board_id
)
-- Insert cards
INSERT INTO cards (title, description, position, list_id)
SELECT title, description, position, list_id FROM (
  -- Sample Project Board - To Do
  SELECT 'Design DB schema' as title, 'Create database schema for the application' as description, 1 as position, 
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'To Do' AND b.title = 'Sample Project Board') as list_id
  UNION ALL SELECT 'Setup backend infrastructure', 'Configure Express.js, database connections, and API routes', 2,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'To Do' AND b.title = 'Sample Project Board')
  UNION ALL SELECT 'Create user authentication', 'Implement login/signup functionality', 3,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'To Do' AND b.title = 'Sample Project Board')
  
  -- Sample Project Board - In Progress
  UNION ALL SELECT 'Build frontend UI', 'Develop React components and styling', 1,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'In Progress' AND b.title = 'Sample Project Board')
  UNION ALL SELECT 'Implement drag and drop', 'Add drag and drop functionality for cards and lists', 2,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'In Progress' AND b.title = 'Sample Project Board')
  
  -- Sample Project Board - Review
  UNION ALL SELECT 'API testing', 'Test all API endpoints', 1,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'Review' AND b.title = 'Sample Project Board')
  UNION ALL SELECT 'Code review', 'Review all code changes', 2,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'Review' AND b.title = 'Sample Project Board')
  
  -- Sample Project Board - Done
  UNION ALL SELECT 'Project setup', 'Initialize project structure', 1,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'Done' AND b.title = 'Sample Project Board')
  UNION ALL SELECT 'Documentation', 'Write project documentation', 2,
    (SELECT l.id FROM inserted_lists l JOIN board_ids b ON l.board_id = b.id WHERE l.title = 'Done' AND b.title = 'Sample Project Board')
) t;

-- Insert members
INSERT INTO members (name, avatar, avatar_color)
VALUES
('Alice Johnson', 'AJ', '#FF6B6B'),
('Bob Smith', 'BS', '#4ECDC4'),
('Carol White', 'CW', '#45B7D1'),
('David Brown', 'DB', '#FFA07A'),
('Emma Davis', 'ED', '#98D8C8'),
('Frank Wilson', 'FW', '#6C5CE7');

-- Insert labels
INSERT INTO labels (name, color, board_id)
SELECT name, color, board_id FROM (
  SELECT 'Bug' as name, '#EB5A46' as color, (SELECT id FROM boards WHERE title = 'Sample Project Board') as board_id
  UNION ALL SELECT 'Feature', '#0079BF', (SELECT id FROM boards WHERE title = 'Sample Project Board')
  UNION ALL SELECT 'Documentation', '#61BD4F', (SELECT id FROM boards WHERE title = 'Sample Project Board')
  UNION ALL SELECT 'Enhancement', '#F2D600', (SELECT id FROM boards WHERE title = 'Sample Project Board')
) t;
