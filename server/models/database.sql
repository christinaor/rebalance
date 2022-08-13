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

SELECT * FROM purchases;

ALTER TABLE purchases
ADD input_date TIMESTAMP DEFAULT NOW()
ADD name VARCHAR(30);

ALTER TABLE purchases
ADD name VARCHAR(30) NOT NULL;


ALTER TABLE purchases DROP COLUMN name;
ALTER TABLE purchases ALTER COLUMN name SET NOT NULL; 


-- TEST TABLE FOR RECORDS
CREATE TABLE test_table(
	id SERIAL PRIMARY KEY,
	input_date TIMESTAMP DEFAULT NOW(),
	username VARCHAR(255) NOT NULL,
	item_name VARCHAR(255) NOT NULL,
	item_cost NUMERIC(12,2) NOT NULL
);

INSERT INTO test_table (username, item_name, item_cost)
VALUES ('CO', 'pineapple', 3);
INSERT INTO test_table (username, item_name, item_cost)
VALUES ('LL', 'grapes', 1.5);
INSERT INTO test_table (username, item_name, item_cost)
VALUES ('CO', 'orange', 0.5);

-- PEOPLE SCHEMA
CREATE SCHEMA IF NOT EXISTS rebalance;

CREATE TABLE rebalance.counterparties (
  id SERIAL PRIMARY KEY,
  counterparty_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)