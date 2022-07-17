CREATE DATABASE balance;

DROP TABLE purchases;

CREATE TABLE purchases(
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  input_date TIMESTAMP DEFAULT NOW(),    
  purchase_date TIMESTAMP NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  cost NUMERIC(5,2) NOT NULL,
  category VARCHAR(50),
  notes VARCHAR(255)
);

INSERT INTO purchases (item_name, cost, purchase_date, category, notes)
VALUES ('pineapple', 2, '6/7/2022', 'groceries', 'craved pineapple :)');

SELECT * FROM purchases;

ALTER TABLE purchases
ADD input_date TIMESTAMP DEFAULT NOW()
ADD name VARCHAR(30);

ALTER TABLE purchases
ADD name VARCHAR(30) NOT NULL;


ALTER TABLE purchases DROP COLUMN name;
ALTER TABLE purchases ALTER COLUMN name SET NOT NULL; 