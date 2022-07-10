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