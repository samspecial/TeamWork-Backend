CREATE TABLE articles(
        articleid INTEGER NOT NULL,
        title VARCHAR(30),
        article TEXT,
        createdon TIMESTAMP,
        authorid INTEGER,

        PRIMARY KEY (articleid)
       

);