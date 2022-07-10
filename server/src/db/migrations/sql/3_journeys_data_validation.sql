CREATE TABLE journey_data AS
SELECT *
FROM journey_data_staging
WHERE covered_distance >=10 AND duration >= 10;