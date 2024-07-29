const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for an in-memory database or provide a file path for a file-based DB

// Create table
db.serialize(() => {
    db.run(`CREATE TABLE register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        confirm_password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }

        // Insert a record
        const insertStmt = db.prepare(`INSERT INTO register (username, password, confirm_password, email)
        VALUES (?, ?, ?, ?)`);
        insertStmt.run("tshego", "123456", "123456", "ytmotlhalane@gmail.com", (err) => {
            if (err) {
                console.error('Error inserting record:', err);
                return;
            }

            // Update a record
            db.run(`UPDATE register
            SET username = ?
            WHERE username = ?`, ["tshego", "yvette"], (err) => {
                if (err) {
                    console.error('Error updating record:', err);
                    return;
                }

                // Delete a record
                db.run(`DELETE FROM register
                WHERE username = ?`, ["Hans"], (err) => {
                    if (err) {
                        console.error('Error deleting record:', err);
                        return;
                    }

                    // Select records
                    db.all(`SELECT * FROM register
                    WHERE id = ?`, [1], (err, rows) => {
                        if (err) {
                            console.error('Error selecting records:', err);
                            return;
                        }
                        console.log('Selected records:', rows);

                        // Drop the table
                        db.run(`DROP TABLE register`, (err) => {
                            if (err) {
                                console.error('Error dropping table:', err);
                            }

                            // Close the database connection
                            db.close((err) => {
                                if (err) {
                                    console.error('Error closing database:', err);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});