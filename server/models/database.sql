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

-- Conditional querying
    -- if (item_name !== null && item_cost !== null) {
    --   updateQuery = `
    --     UPDATE test_table
    --     SET item_name=$2, item_cost=$3
    --     WHERE ID=$1
    --   ;`
    -- } else if (item_name !== null) {
    --   updateQuery = `
    --     UPDATE test_table
    --     SET item_name=$2
    --     WHERE ID=$1
    --   ;`
    -- } else {
    --   updateQuery = `
    --     UPDATE test_table
    --     SET item_cost=$3
    --     WHERE ID=$1
    --   ;`
    -- }



-- PEOPLE TABLE
CREATE SCHEMA IF NOT EXISTS rebalance;

CREATE TABLE rebalance.counterparties (
  id SERIAL PRIMARY KEY,
  counterparty_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)

DELETE FROM rebalance.counterparties WHERE email='someemail@email.com';

-- LOGIN TABLE
CREATE TABLE rebalance.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

INSERT INTO rebalance.users (username, pass, email)
VALUES ('user1', 'pw', 'user1@test.com');

-- RECORDS TABLE
CREATE TABLE IF NOT EXISTS rebalance.records (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
  counterparty_username VARCHAR(255) NOT NULL,
	input_date TIMESTAMP DEFAULT NOW(),
	item_name VARCHAR(255) NOT NULL,
	item_cost NUMERIC(12,2) NOT NULL,
  user_split NUMERIC(12,2) NOT NULL,
  user_perc DECIMAL(5,2) NOT NULL CHECK(user_perc <= 100 AND user_perc >= 0),
);

INSERT INTO rebalance.records (username, counterparty_username, item_name, item_cost, user_split, user_perc)
VALUES ('CO', 'LL', 'oranges', '8', 6, 25);

SELECT * FROM rebalance.records;