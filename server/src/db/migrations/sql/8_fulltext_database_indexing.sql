CREATE INDEX ts_idx ON journey_data USING GIN (ts);
CREATE INDEX ts_name_idx ON station_data USING GIN (ts_name);