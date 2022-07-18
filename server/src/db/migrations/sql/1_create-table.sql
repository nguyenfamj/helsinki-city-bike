CREATE TABLE journey_data_staging
(
    departure_time         TIMESTAMP,
    return_time            TIMESTAMP,
    departure_station_id   int,
    departure_station_name text,
    return_station_id      int,
    return_station_name    text,
    covered_distance       double precision,
    duration               int
);

CREATE TABLE station_data
(
    fid SERIAL,
    station_id  int PRIMARY KEY,
    fi_name text,
    se_name text,
    en_name text,
    fi_address text,
    se_address text,
    fi_city text,
    se_city text,
    operator_name text,
    capacity int,
    longitude NUMERIC(9,6),
    latitude NUMERIC(8,6)
);

CREATE UNIQUE INDEX station_data_fid_uindex
    ON station_data (fid);

CREATE UNIQUE INDEX station_data_id_uindex
    ON station_data (station_id);