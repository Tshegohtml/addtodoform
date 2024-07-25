const db = require('better-sqlite3')('database.db')

const createTable = () => {
    const sql = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
    ` 
    db.prepare(sgl).run ()
}

const insertTable = (name, age) => {
    const sql = `
      INSERT INTO users (age, name)
      VALUES (?, ?)
    `
    db.prepare(sql).run(name, age)
}

const getUsers = () => {
    const sql = `
    SELECT * FROM users
    `
    const rows = db.prepare(sql).all()
    console.log(rows);
}
 
const getUsers = (id)=> {

}

getUsers()