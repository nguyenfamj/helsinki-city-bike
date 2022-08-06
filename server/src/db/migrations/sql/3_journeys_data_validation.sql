CREATE TABLE journey_data AS
SELECT *
FROM journey_data_staging
WHERE covered_distance >=10 AND duration >= 10;

DROP TABLE IF EXISTS journey_data_staging;

-- Add serial id to journey_data table
ALTER TABLE journey_data ADD COLUMN id SERIAL PRIMARY KEY;

-- Delete duplicates
DELETE FROM journey_data
WHERE id IN (
    SELECT id FROM
                  (SELECT id, row_number() over (PARTITION BY departure_time, return_time ORDER BY id)
                   AS row_num FROM journey_data) t
              WHERE t.row_num >1
    );