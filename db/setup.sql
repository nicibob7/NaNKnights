DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS email_verify;
DROP TABLE IF EXISTS administrator;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS suggestion;
DROP TABLE IF EXISTS community_event;
DROP TABLE IF EXISTS member;

CREATE TABLE administrator (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    last_logged_in TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE member (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    postal_code VARCHAR(12) NOT NULL,
    is_activated BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE token (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_username VARCHAR(32) NOT NULL, -- add UNIQUE in order to prevent multiple tokens for the same user/admin
    token VARCHAR(128) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '30 minutes'
);
REVOKE UPDATE (token, expires_at, created_at) ON token FROM PUBLIC;

CREATE TABLE email_verify (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    token VARCHAR(128) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '10 minutes',
    CONSTRAINT fk_email_verify_user FOREIGN KEY (username) REFERENCES member(username)
);
REVOKE UPDATE (username, created_at, expires_at) ON email_verify FROM PUBLIC;

CREATE TABLE suggestion (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(32) NOT NULL,
    description VARCHAR(512) NOT NULL,
    date_posted TIMESTAMP DEFAULT NOW(),
    posted_by VARCHAR(32) NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    image BYTEA,
    urgency_level VARCHAR(16) NOT NULL,
    CONSTRAINT fk_suggestion_user FOREIGN KEY (posted_by) REFERENCES member(username)
);
REVOKE UPDATE (date_posted, posted_by) ON suggestion FROM PUBLIC;

CREATE TABLE comment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    suggestion_id INT NOT NULL,
    comment VARCHAR(128) NOT NULL,
    date_posted TIMESTAMP DEFAULT NOW(),
    posted_by VARCHAR(32) NOT NULL,
    CONSTRAINT fk_comment_suggestion FOREIGN KEY (suggestion_id) REFERENCES suggestion(id),
    CONSTRAINT fk_comment_user FOREIGN KEY (posted_by) REFERENCES member(username)
);
REVOKE UPDATE (date_posted, posted_by) ON comment FROM PUBLIC;

CREATE TABLE community_event (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(32) NOT NULL,
    description VARCHAR(512) NOT NULL,
    date_posted TIMESTAMP DEFAULT NOW(),
    posted_by VARCHAR(32) NOT NULL,
    CONSTRAINT fk_event_user FOREIGN KEY (posted_by) REFERENCES member(username)
);
REVOKE UPDATE (date_posted, posted_by) ON community_event FROM PUBLIC;

-- delete expired session tokens
CREATE OR REPLACE FUNCTION delete_expired_session_tokens() RETURNS void AS $$
BEGIN
  DELETE FROM token WHERE expires_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- delete expired email verification tokens
CREATE OR REPLACE FUNCTION delete_expired_email_verification_tokens() RETURNS void AS $$
BEGIN
  DELETE FROM email_verify WHERE expires_at <= NOW();
END;
$$ LANGUAGE plpgsql;