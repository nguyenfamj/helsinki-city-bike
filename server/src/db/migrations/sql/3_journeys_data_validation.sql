CREATE TABLE journey_data AS
SELECT *
FROM journey_data_staging
WHERE covered_distance >=10 AND duration >= 10;

DROP TABLE IF EXISTS journey_data_staging;

-- Add serial fid to journey_data table
ALTER TABLE journey_data ADD COLUMN fid SERIAL PRIMARY KEY;