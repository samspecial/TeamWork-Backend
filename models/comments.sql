CREATE TABLE comments(
        commentid INTEGER NOT NULL,
        comment TEXT,
        gifid INTEGER,
        articleid INTEGER,
        authorid INTEGER NOT NULL,
        createdon DATE,
        PRIMARY KEY (commentid),
       
    );