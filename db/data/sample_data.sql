-- administrator data
INSERT INTO administrator (username, password) VALUES ('admin', '$2b$12$SFKfbItlBxCaYp/OnMI/iOdC5AgJbuLC/fK0s2Dfr.CgyzwGLmWwy');
INSERT INTO administrator (username, password) VALUES ('linux', '$2b$12$A6wVaa5Hs09Ab3YKWTsqiObvXPCLTNebhOCGuFOLLaR4ngwoqAZDq');

-- member data
INSERT INTO member (username, password, email, first_name, last_name, phone_number, postal_code, is_activated) VALUES ('bob', '$2b$12$edxyaKda4of6CrWzZ28m5eEel3PFXFWbfgxhARZpB7ELwjPNEq2Ca', 'bob@bob.com', 'Bob', 'Bobson', '+32145678', 'NYC ITY', TRUE);
INSERT INTO member (username, password, email, first_name, last_name, phone_number, postal_code, is_activated) VALUES ('jane', '$2b$12$3ZoSaOHW68Hpz7Pj4mf/h.nwp6e7uw5gE6.wUDknM/QrX1tt2Mb5y', 'jane@jane.com', 'Jane', 'Janerson', '+1235678', 'NEW ICE', FALSE);

-- email_verify data
INSERT INTO email_verify (username, token) VALUES ('jane', 'jane_token');

-- token data
INSERT INTO token (account_username, token) VALUES ('bob', 'bob_token');

-- suggestion data
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 1', 'This is a suggestion 1', 'bob', 'Low');
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 2', 'This is a suggestion 2', 'bob', 'Low');
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 3', 'This is a suggestion 3', 'bob', 'High');
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 4', 'This is a suggestion 4', 'bob', 'Low');
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 5', 'This is a suggestion 5', 'bob', 'High');
INSERT INTO suggestion (title, description, posted_by, urgency_level) VALUES ('Suggestion 6', 'This is a suggestion 6', 'bob', 'Med');

-- comment data
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (1, 'bob', 'This is a comment 1');
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (2, 'bob', 'This is a comment 2');
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (3, 'bob', 'This is a comment 3');
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (4, 'bob', 'This is a comment 4');
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (5, 'bob', 'This is a comment 5');
INSERT INTO comment (suggestion_id, posted_by, comment) VALUES (6, 'bob', 'This is a comment 6');

-- community_event data THROWS ERROR CODE 23503
INSERT INTO community_event (title, description, date, location, posted_by, type) VALUES ('Event 1', 'This is an event', '2021-01-01', 'New York City', 'bob', 'sports');
INSERT INTO community_event (title, description, date, location, posted_by, type) VALUES ('Event 1', 'This is an event', '2021-01-01', 'New York City', 'bob', 'nature');
INSERT INTO community_event (title, description, date, location, posted_by, type) VALUES ('Event 1', 'This is an event', '2021-01-01', 'New York City', 'bob', 'amusements');
INSERT INTO community_event (title, description, date, location, posted_by, type) VALUES ('Event 1', 'This is an event', '2021-01-01', 'New York City', 'bob', 'community meeting');
INSERT INTO community_event (title, description, date, location, posted_by, type) VALUES ('Event 1', 'This is an event', '2021-01-01', 'New York City', 'bob', 'markets & commerce');

-- information data
INSERT INTO information (title, description, posted_by, type, image) VALUES ('Information 1', 'This is an information', 'admin', 'International news', 'image placeholder');
INSERT INTO information (title, description, posted_by, type, image) VALUES ('Information 2', 'This is another info about the world', 'admin', 'Science news', 'image placeholder');
INSERT INTO information (title, description, posted_by, type, image) VALUES ('Information 3', 'This is a piece of info', 'admin', 'IT news', 'image placeholder');
