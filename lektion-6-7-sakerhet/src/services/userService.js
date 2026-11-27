// hämtar bcrypt för hash
import bcrypt from 'bcrypt';
// hämtar databasenpoolen
import pool from '../../db/db.js';
import { id } from 'zod/locales';
// antal arbete för bcrypt
const SALT_ROUNDS =10;

// sparar ny användare (uppgift 1)
export const registerUser = async(username, password) => {
    // gör lösenordet till hash innan den når databasen
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // platshållare värderna skickas seperat $1 och $2 skyddar mot SQL-injektion
    const newUser = await pool.query('INSERT INTO users( username, password_hash) VALUES($1,$2) RETURNING id, username, role',
        [username, passwordHash]
    );
    // ger användaren, utan hash
    return newUser.rows[0];

};
// hämtar en användare med namn (uppgift 2)
export const findUserByUsername = async (username) =>{
    // hämtar raden $1 skyddar mot SQL-injection
    const foundUser = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
// ge användaren, eller undefined om namnet inte finns
return foundUser.rows[0]
};
//hämtar alla användare, utan hash
export const getAllUsers = async () =>{
    const allUsers = await pool.query('SELECT id, username, role FROM users');
    return allUsers.rows;
}

export const deleteUser = async(id) =>{
    const deleteUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, username',[id]);
    return deleteUser.rows[0];
}