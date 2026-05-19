ALTER TABLE line_threads ADD COLUMN inferred_area TEXT NOT NULL DEFAULT '';
ALTER TABLE line_threads ADD COLUMN inferred_gender TEXT NOT NULL DEFAULT '';
ALTER TABLE line_threads ADD COLUMN inferred_confidence TEXT NOT NULL DEFAULT '';
ALTER TABLE line_threads ADD COLUMN location_address TEXT NOT NULL DEFAULT '';
ALTER TABLE line_threads ADD COLUMN location_latitude REAL;
ALTER TABLE line_threads ADD COLUMN location_longitude REAL;
