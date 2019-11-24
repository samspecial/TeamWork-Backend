
    CREATE TABLE users(
        id INTEGER NOT NULL,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email TEXT,
        gender VARCHAR(30) NOT NULL,
        jobrole VARCHAR(50) NOT NULL,
        department VARCHAR(30) NOT NULL,
       address VARCHAR(100) NOT NULL,
       createdon TIMESTAMP,
       hash TEXT NOT NULL,
       PRIMARY KEY (id),
       UNIQUE (email)
    );

   