CREATE TABLE articles(
        articleid INTEGER NOT NULL,
        title VARCHAR(30),
        article TEXT,
        createdon DATE,
        authorid INTEGER,

        PRIMARY KEY (articleid)
);