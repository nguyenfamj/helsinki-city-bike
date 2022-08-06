CREATE OR REPLACE FUNCTION journeys_query(_category text, _size int, _page int,  _order_by text, _sorting_direction text = 'ASC')
    RETURNS TABLE (
        id                    int,
        departure_time         TIMESTAMP,
        return_time            TIMESTAMP,
        departure_station_id   int,
        departure_station_name text,
        return_station_id      int,
        return_station_name    text,
        covered_distance       double precision,
        duration               int)

    LANGUAGE plpgsql AS
$func$
DECLARE _empty text := '';
BEGIN
    IF upper(_sorting_direction) IN ('ASC', 'DESC', 'ASCENDING', 'DESCENDING') THEN
    ELSE
        RAISE EXCEPTION 'Unexpected value for parameter _sorting_direction. Allowed: ASC, DESC, ASCENDING, DESCENDING. Default: ASC';
    END IF;

    RETURN QUERY EXECUTE format(
        'SELECT id, departure_time, return_time, departure_station_id, departure_station_name,
         return_station_id, return_station_name, covered_distance, duration
         FROM journey_data
         WHERE ($1 = $2 OR ts @@ to_tsquery($1))
         ORDER BY %I %s
         LIMIT $3
         OFFSET (($4 - 1) * $3)', _order_by, _sorting_direction)
    USING _category, _empty, _size, _page;
END
$func$;