DB name 'koala_holla'

CREATE TABLE koalas(
    id SERIAL PRIMARY KEY,
    name VARCHAR (250) NOT NULL,
    gender VARCHAR (100) NOT NULL,
    age INTEGER NOT NULL,
    ready_to_transfer BOOLEAN NOT NULL,
    notes VARCHAR (250)
);

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Jean', 'female', '5', 'true', 'allergic to lots of lava');

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Scotty', 'male', '4', 'true', 'Born in Guatamala');

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Ororo', 'female', '7', 'false', 'Loves listening to Paula (Abdul)');

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Logan', 'male', '15', 'false', 'Loves the sauna');

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Charlie', 'male', '9', 'true', 'Favorite band is Nirvana');

INSERT INTO koalas( name, gender, age, ready_to_transfer, notes)
VALUES ('Betsy', 'female', '4', 'true', 'Has a pet iguana');