CREATE TABLE journey_data_staging
(
    departure_time         TIMESTAMP,
    return_time            TIMESTAMP,
    departure_station_id   int,
    departure_station_name VARCHAR(50),
    return_station_id      int,
    return_station_name    VARCHAR(50),
    covered_distance       double precision,
    duration               int
);

CREATE TABLE station_data_staging
(
    fid SERIAL,
    station_id  int,
    fi_name VARCHAR(50),
    se_name VARCHAR(50),
    en_name VARCHAR(50),
    fi_address VARCHAR(50),
    se_address VARCHAR(50),
    fi_city VARCHAR(50),
    se_city VARCHAR(50),
    operator_name VARCHAR(50),
    capacity int,
    longitude NUMERIC(9,6),
    latitude NUMERIC(8,6)
);

CREATE UNIQUE INDEX station_data_staging_fid_uindex
    ON station_data_staging (fid);

CREATE UNIQUE INDEX station_data_staging_id_uindex
    ON station_data_staging (station_id);