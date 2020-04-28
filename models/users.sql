
    CREATE TABLE users(
        id INTEGER NOT NULL,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email TEXT NOT NULL,
        gender VARCHAR(30),
        jobrole VARCHAR(50),
        department VARCHAR(30),
       address VARCHAR(100),
       createdon DATE,
       hash TEXT NOT NULL,
       
       PRIMARY KEY (id)
    );

   