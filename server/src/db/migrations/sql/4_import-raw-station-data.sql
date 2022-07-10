COPY station_data_staging(fid, station_id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude)
FROM '/var/rawData/station-data.csv'
DELIMITER ','
CSV HEADER;