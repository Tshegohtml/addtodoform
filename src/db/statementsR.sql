CREATE TABLE register (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT NOT NULL,
password TEXT NOT NULL,
email TEXT NOT NULL,
confirm passord TEXT NOT NULL
);

INSERT INTO register ( username, password, confirm passord, email)
VALUES("tshego", "123456", "123456","ytmotlhalane@gamil.com);

    UPDATE register
    SET username = "tshego"
    WHERE username = "yvette";

    DELETE FROM register
    WHERE username = "Hans";

    SELECT * FROM register
    WHERE id = 1;

    DROP TABLE register;