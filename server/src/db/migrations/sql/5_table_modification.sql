ALTER TABLE station_data_staging
RENAME TO station_data;

DROP TABLE IF EXISTS journey_data_staging;

ALTER TABLE station_data ADD PRIMARY KEY (station_id);