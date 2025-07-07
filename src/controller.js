import { pool } from './database.js';

class BibliotecaController {

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM Libros');
        res.json(result);
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            
            const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [id]);
            
            if (result.length === 0) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            
            res.json(result[0]);
        } catch (error) {
            console.error('Error al obtener libro:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
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

    async update(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre`)
    }
}

export const libro = new BibliotecaController();