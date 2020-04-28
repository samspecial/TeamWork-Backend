CREATE TABLE comments(
        commentid INTEGER NOT NULL,
        comment TEXT,
        gifid INTEGER,
        articleid INTEGER,
        authorid INTEGER,
        createdon DATE,
        
        PRIMARY KEY (commentid),
        FOREIGN KEY articleid REFERENCES comments(articleid),
        FOREIGN KEY gifid REFERENCES comments(gifid)
    );