DROP TABLE IF EXISTS shopping_list;
DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
  'Main',
  'Snack',
  'Lunch',
  'Breakfast'
);

CREATE TABLE shopping_list (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price numeric(5, 2),
  date_added timestamp default now() NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  category grocery NOT NULL
);