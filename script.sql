-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS parking;

-- Create users table (unchanged)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    saved_time NUMERIC DEFAULT 0,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

-- Optional explicit index (SQLAlchemy's index=True generates this)
CREATE INDEX ix_users_id ON users (id);
CREATE INDEX ix_users_email ON users (email);

-- Create GIS-enabled parking table
CREATE TABLE parking (
    id VARCHAR(200) PRIMARY KEY,
    address VARCHAR(255),
    capacity DECIMAL(10,2),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    parking_type VARCHAR(50),
    geom GEOGRAPHY(Point, 4326)  -- GIS column for coordinates
);

-- Import CSV (lat/lon will populate numeric columns)
COPY parking (id, address, capacity, latitude, longitude, parking_type)
FROM '/config/data/combined_parking_data.csv'
DELIMITER ','
CSV HEADER;

-- Populate the GIS column from latitude and longitude
UPDATE parking
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography;

-- Optional: create spatial index for faster GIS queries
CREATE INDEX idx_parking_geom ON parking USING GIST (geom);
