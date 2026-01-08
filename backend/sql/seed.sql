INSERT INTO boards (title)
VALUES 
('Sample Project Board'),
('Website Redesign'),
('Mobile App Launch');

INSERT INTO lists (title, position, board_id)
VALUES
-- Sample Project Board lists
('To Do', 1, (SELECT id FROM boards WHERE title = 'Sample Project Board')),
('In Progress', 2, (SELECT id FROM boards WHERE title = 'Sample Project Board')),
('Review', 3, (SELECT id FROM boards WHERE title = 'Sample Project Board')),
('Done', 4, (SELECT id FROM boards WHERE title = 'Sample Project Board')),
-- Website Redesign lists
('Planning', 1, (SELECT id FROM boards WHERE title = 'Website Redesign')),
('Design', 2, (SELECT id FROM boards WHERE title = 'Website Redesign')),
('Development', 3, (SELECT id FROM boards WHERE title = 'Website Redesign')),
('Testing', 4, (SELECT id FROM boards WHERE title = 'Website Redesign')),
('Deployment', 5, (SELECT id FROM boards WHERE title = 'Website Redesign')),
-- Mobile App Launch lists
('Backlog', 1, (SELECT id FROM boards WHERE title = 'Mobile App Launch')),
('Sprint 1', 2, (SELECT id FROM boards WHERE title = 'Mobile App Launch')),
('Sprint 2', 3, (SELECT id FROM boards WHERE title = 'Mobile App Launch')),
('QA', 4, (SELECT id FROM boards WHERE title = 'Mobile App Launch')),
('Released', 5, (SELECT id FROM boards WHERE title = 'Mobile App Launch'));

INSERT INTO cards (title, description, position, list_id)
VALUES
-- Sample Project Board - To Do
('Design DB schema', 'Create database schema for the application', 1, (SELECT id FROM lists WHERE title = 'To Do' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),
('Setup backend infrastructure', 'Configure Express.js, database connections, and API routes', 2, (SELECT id FROM lists WHERE title = 'To Do' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),
('Create user authentication', 'Implement login/signup functionality', 3, (SELECT id FROM lists WHERE title = 'To Do' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),

-- Sample Project Board - In Progress
('Build frontend UI', 'Develop React components and styling', 1, (SELECT id FROM lists WHERE title = 'In Progress' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),
('Implement drag and drop', 'Add drag and drop functionality for cards and lists', 2, (SELECT id FROM lists WHERE title = 'In Progress' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),

-- Sample Project Board - Review
('API testing', 'Test all API endpoints', 1, (SELECT id FROM lists WHERE title = 'Review' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),
('Code review', 'Review all code changes', 2, (SELECT id FROM lists WHERE title = 'Review' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),

-- Sample Project Board - Done
('Project setup', 'Initialize project structure', 1, (SELECT id FROM lists WHERE title = 'Done' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),
('Documentation', 'Write project documentation', 2, (SELECT id FROM lists WHERE title = 'Done' AND board_id = (SELECT id FROM boards WHERE title = 'Sample Project Board'))),

-- Website Redesign - Planning
('Market research', 'Analyze competitor websites and user feedback', 1, (SELECT id FROM lists WHERE title = 'Planning' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Create wireframes', 'Develop wireframes for all pages', 2, (SELECT id FROM lists WHERE title = 'Planning' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Define user flows', 'Map out user journeys and interactions', 3, (SELECT id FROM lists WHERE title = 'Planning' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),

-- Website Redesign - Design
('Homepage design', 'Design the new homepage', 1, (SELECT id FROM lists WHERE title = 'Design' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Product pages design', 'Design product listing and detail pages', 2, (SELECT id FROM lists WHERE title = 'Design' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Mobile responsiveness', 'Ensure responsive design for all devices', 3, (SELECT id FROM lists WHERE title = 'Design' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),

-- Website Redesign - Development
('Homepage implementation', 'Develop homepage with new design', 1, (SELECT id FROM lists WHERE title = 'Development' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Product pages development', 'Build product pages', 2, (SELECT id FROM lists WHERE title = 'Development' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),

-- Website Redesign - Testing
('Browser compatibility', 'Test on all major browsers', 1, (SELECT id FROM lists WHERE title = 'Testing' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Performance testing', 'Optimize and test performance', 2, (SELECT id FROM lists WHERE title = 'Testing' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),

-- Website Redesign - Deployment
('Production deployment', 'Deploy to production servers', 1, (SELECT id FROM lists WHERE title = 'Deployment' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),
('Monitor and fix issues', 'Monitor live performance and fix bugs', 2, (SELECT id FROM lists WHERE title = 'Deployment' AND board_id = (SELECT id FROM boards WHERE title = 'Website Redesign'))),

-- Mobile App Launch - Backlog
('User authentication system', 'Implement secure login/signup for mobile', 1, (SELECT id FROM lists WHERE title = 'Backlog' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('Push notifications', 'Setup push notification system', 2, (SELECT id FROM lists WHERE title = 'Backlog' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('Offline mode support', 'Enable app functionality offline', 3, (SELECT id FROM lists WHERE title = 'Backlog' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),

-- Mobile App Launch - Sprint 1
('Core UI implementation', 'Build main screens and navigation', 1, (SELECT id FROM lists WHERE title = 'Sprint 1' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('API integration', 'Connect app to backend APIs', 2, (SELECT id FROM lists WHERE title = 'Sprint 1' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),

-- Mobile App Launch - Sprint 2
('Feature refinement', 'Improve features based on feedback', 1, (SELECT id FROM lists WHERE title = 'Sprint 2' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('Performance optimization', 'Optimize app performance and battery usage', 2, (SELECT id FROM lists WHERE title = 'Sprint 2' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),

-- Mobile App Launch - QA
('Bug testing', 'Comprehensive testing across devices', 1, (SELECT id FROM lists WHERE title = 'QA' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('User acceptance testing', 'Beta testing with selected users', 2, (SELECT id FROM lists WHERE title = 'QA' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),

-- Mobile App Launch - Released
('App Store submission', 'Submitted to Apple App Store and Google Play', 1, (SELECT id FROM lists WHERE title = 'Released' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch'))),
('v1.0 Live', 'Mobile app launched to public', 2, (SELECT id FROM lists WHERE title = 'Released' AND board_id = (SELECT id FROM boards WHERE title = 'Mobile App Launch')));

INSERT INTO members (name, avatar)
VALUES
('Alice Johnson', 'AJ'),
('Bob Smith', 'BS'),
('Carol White', 'CW'),
('David Brown', 'DB'),
('Emma Davis', 'ED'),
('Frank Wilson', 'FW');

INSERT INTO labels (name, color)
VALUES
('Bug', '#FF0000'),
('Feature', '#0079BF'),
('Documentation', '#5E6C84'),
('Enhancement', '#91E1C0'),
('Question', '#F2CC8F'),
('Priority High', '#EB5757'),
('In Review', '#9013FE'),
('Testing', '#56CCF2');
