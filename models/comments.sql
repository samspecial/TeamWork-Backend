CREATE TABLE comments(
        commentid INTEGER NOT NULL,
        comment TEXT,
        gifid INTEGER,
        authorid INTEGER NOT NULL,
        createdon TIMESTAMP,
        PRIMARY KEY (commentid),
       
    );