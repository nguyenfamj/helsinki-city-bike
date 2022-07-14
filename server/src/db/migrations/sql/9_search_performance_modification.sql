-- DROP existing search columns and indexes
ALTER TABLE journey_data DROP COLUMN ts;
ALTER TABLE station_data DROP COLUMN ts_name;

DROP INDEX IF EXISTS ts_idx;
DROP INDEX IF EXISTS ts_name_idx;

-- Journey Data table
ALTER TABLE journey_data ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('english', departure_station_name || ' ' || return_station_name)) STORED;

-- Station Data table
ALTER TABLE station_data ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('english', fi_name || ' ' || se_name)) STORED;

CREATE INDEX ts_journey ON journey_data USING GIN (ts);
CREATE INDEX ts_station ON station_data USING GIN (ts);