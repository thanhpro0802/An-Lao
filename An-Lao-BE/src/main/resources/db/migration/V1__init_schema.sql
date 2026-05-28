CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    full_name   VARCHAR(255),
    phone       VARCHAR(20),
    role        VARCHAR(50) DEFAULT 'USER',
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE facilities (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    address       VARCHAR(500),
    district      VARCHAR(100),
    description   TEXT,
    price_min     DECIMAL(15,2),
    price_max     DECIMAL(15,2),
    price_unit    VARCHAR(100),
    price_includes TEXT,
    price_excludes TEXT,
    image_url     VARCHAR(500),
    images        TEXT[],
    is_verified   BOOLEAN DEFAULT FALSE,
    is_warning    BOOLEAN DEFAULT FALSE,
    rating        DECIMAL(3,1) DEFAULT 0.0,
    review_count  INT DEFAULT 0,
    tags          TEXT[],
    created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
    id                   BIGSERIAL PRIMARY KEY,
    user_id              BIGINT REFERENCES users(id),
    facility_id          BIGINT REFERENCES facilities(id),
    contact_name         VARCHAR(255),
    contact_phone        VARCHAR(20),
    relative_type        VARCHAR(100),
    health_statuses      TEXT[],
    visit_date           DATE NOT NULL,
    visit_time           VARCHAR(50),
    note                 TEXT,
    status               VARCHAR(50) DEFAULT 'PENDING',
    admin_note           TEXT,
    cancel_reason        TEXT,
    has_reviewed         BOOLEAN DEFAULT FALSE,
    created_at           TIMESTAMP DEFAULT NOW(),
    updated_at           TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id             BIGSERIAL PRIMARY KEY,
    facility_id    BIGINT REFERENCES facilities(id),
    user_id        BIGINT REFERENCES users(id),
    booking_id     BIGINT REFERENCES bookings(id),
    reviewer_name  VARCHAR(255),
    reviewer_role  VARCHAR(255),
    rating         INT CHECK (rating BETWEEN 1 AND 5),
    content        TEXT,
    created_at     TIMESTAMP DEFAULT NOW()
);

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE facility_chunks (
    id          BIGSERIAL PRIMARY KEY,
    facility_id BIGINT REFERENCES facilities(id),
    content     TEXT NOT NULL,
    embedding   vector(768),
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON facility_chunks USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
