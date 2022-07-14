-- Full text search using tsvector and tsquery
-- Journey Data table
ALTER TABLE journey_data ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('finnish', departure_station_name || ' ' || return_station_name)) STORED;

-- Station Data table
ALTER TABLE station_data ADD COLUMN ts_name tsvector
    GENERATED ALWAYS AS (to_tsvector('finnish', fi_name) || to_tsvector('swedish', se_name)) STORED;
