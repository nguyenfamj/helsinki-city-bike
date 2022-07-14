-- Change data type of columns from VARCHAR to text
ALTER TABLE journey_data
    ALTER COLUMN departure_station_name TYPE text,
    ALTER COLUMN return_station_name TYPE text;

ALTER TABLE station_data
    ALTER COLUMN fi_name TYPE text,
    ALTER COLUMN se_name TYPE text,
    ALTER COLUMN en_name TYPE text,
    ALTER COLUMN fi_address TYPE text,
    ALTER COLUMN se_address TYPE text,
    ALTER COLUMN fi_city TYPE text,
    ALTER COLUMN se_city TYPE text,
    ALTER COLUMN operator_name TYPE text;
