 CREATE TABLE gifs(
        imageurl VARCHAR(100),
        gifid INTEGER NOT NULL,
        title VARCHAR(50),
        createdon TIMESTAMP,
        publicid VARCHAR(100),
        PRIMARY KEY (gifid)
    );
