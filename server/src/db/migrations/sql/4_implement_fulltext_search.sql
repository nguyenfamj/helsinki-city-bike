-- Full text search using tsvector and tsquery
-- Journey Data table
ALTER TABLE journey_data ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', departure_station_name || ' ' || return_station_name)) STORED;

-- Station Data table
ALTER TABLE station_data ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', fi_name || ' ' || se_name)) STORED;

CREATE INDEX ts_journey ON journey_data USING GIN (ts);
CREATE INDEX ts_station ON station_data USING GIN (ts);