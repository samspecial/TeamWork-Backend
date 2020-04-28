CREATE TABLE articles(
        articleid INTEGER NOT NULL,
        title VARCHAR(30),
        article TEXT,
        createdon DATES,
        authorid INTEGER,
        PRIMARY KEY (articleid)
);