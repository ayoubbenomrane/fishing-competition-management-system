-- Table: joueur
CREATE TABLE IF NOT EXISTS joueur (
    id SERIAL PRIMARY KEY , 
    name TEXT NOT NULL,
    birthdate DATE ,
    profile_picture,
    phone_number TEXT
    
);

-- Table: journee
CREATE TABLE IF NOT EXISTS journee (
    id SERIAL PRIMARY KEY ,
    name TEXT DEFAULT 'Journee X',
    date DATE DEFAULT CURRENT_DATE,
    place TEXT DEFAULT 'Tunisia',
    duration TIME DEFAULT '05:00:00'
);

-- Table: record
CREATE TABLE IF NOT EXISTS record (
    id SERIAL PRIMARY KEY ,
    journee_id INTEGER NOT NULL,
    joueur_id INTEGER NOT NULL,
    absent BOOLEAN NOT NULL DEFAULT FALSE,
    fish_count INTEGER NOT NULL,
    total_weight FLOAT NOT NULL,
    FOREIGN KEY (journee_id) REFERENCES journee (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (joueur_id) REFERENCES joueur (id) ON DELETE CASCADE ON UPDATE CASCADE
);
