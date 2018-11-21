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