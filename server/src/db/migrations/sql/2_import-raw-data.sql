COPY journey_data_staging(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM '/var/rawData/2021-05.csv'
DELIMITER ','
CSV HEADER;

COPY journey_data_staging(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM '/var/rawData/2021-06.csv'
DELIMITER ','
CSV HEADER;

COPY journey_data_staging(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM '/var/rawData/2021-07.csv'
DELIMITER ','
CSV HEADER;

COPY station_data(fid, station_id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude)
FROM '/var/rawData/station-data.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('station_data_fid_seq', (SELECT MAX(fid) FROM station_data) + 1);