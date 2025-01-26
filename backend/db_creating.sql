-- Table: joueur
CREATE TABLE IF NOT EXISTS joueur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT,
    total_score FLOAT NOT NULL DEFAULT 0.0
);

-- Table: journee
CREATE TABLE IF NOT EXISTS journee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT 'Journee X',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    place TEXT DEFAULT 'Tunisia',
    duration TIME DEFAULT '05:00:00'
);

-- Table: record
CREATE TABLE IF NOT EXISTS record (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journee_id INTEGER NOT NULL,
    joueur_id INTEGER NOT NULL,
    absent BOOLEAN NOT NULL DEFAULT 0,
    fish_count INTEGER NOT NULL,
    total_weight FLOAT NOT NULL,
    score INTEGER,
    FOREIGN KEY (journee_id) REFERENCES journee (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (joueur_id) REFERENCES joueur (id) ON DELETE CASCADE ON UPDATE CASCADE
);
