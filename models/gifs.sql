 CREATE TABLE gifs(
        imageurl VARCHAR(100),
        gifid INTEGER NOT NULL,
        title VARCHAR(50),
        createdon DATE,
        publicid VARCHAR(100),
        authorid INT,
        PRIMARY KEY (gifid)
    );
