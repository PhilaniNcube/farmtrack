ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(255);

-- Drop all affected tables
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS crops CASCADE;
DROP TABLE IF EXISTS finances CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS livestock CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS farms CASCADE;

-- Recreate the farms table
CREATE TABLE farms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    farm_id INTEGER REFERENCES farms(id),
    profile_image_url VARCHAR(512),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the activities table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    performed_by VARCHAR(255),
    performed_at TIMESTAMP NOT NULL,
    category VARCHAR(100) NOT NULL,
    related_to VARCHAR(255),
    notes TEXT,
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the crops table
CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255) NOT NULL,
    planting_date TIMESTAMP NOT NULL,
    expected_harvest_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    area NUMERIC NOT NULL,
    area_unit VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the finances table
CREATE TABLE finances (
    id SERIAL PRIMARY KEY,
    transaction_date TIMESTAMP NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount NUMERIC NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    payment_method VARCHAR(100),
    associated_with VARCHAR(255),
    receipt_url VARCHAR(512),
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the inventory table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity NUMERIC NOT NULL,
    unit VARCHAR(50) NOT NULL,
    purchase_date TIMESTAMP,
    expiry_date TIMESTAMP,
    purchase_price NUMERIC,
    supplier VARCHAR(255),
    storage_location VARCHAR(255),
    reorder_level NUMERIC,
    notes TEXT,
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the livestock table
CREATE TABLE livestock (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    count INTEGER NOT NULL,
    acquisition_date TIMESTAMP NOT NULL,
    source VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    health_status VARCHAR(50) NOT NULL,
    purpose VARCHAR(100),
    notes TEXT,
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Recreate the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    assigned_to VARCHAR(255),
    related_to VARCHAR(255),
    farm_id INTEGER REFERENCES farms(id) NOT NULL,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);