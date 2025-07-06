import { pool } from './database.js';

class BibliotecaController {

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM Libros');
        res.json(result);
    }

    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN])
        res.json({"Id insertado": result.insertId})
    }

    async delete(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [libro.id])
        res.json({"Registros eliminados": result.affectedRows});
    }
}

export const libro = new BibliotecaController();