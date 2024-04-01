const connection = require('./connection');

const createEscolaridade = async (escolaridade) => {
    const { nome, valor } = escolaridade;

    const query = 'INSERT INTO escolaridade (nome, valor) VALUES (?, ?)';
    const values = [nome, valor];

    try {
        const result = await connection.execute(query, values);
        return result.insertId;
    } catch (error) {
        console.error('Erro ao criar escolaridade:', error);
        throw error;
    }
}

const getAllEscolaridades = async () => {
    const query = 'SELECT * FROM escolaridade';

    try {
        const [escolaridades] = await connection.execute(query);
        return escolaridades;
    } catch (error) {
        console.error('Erro ao obter todas as escolaridades:', error);
        throw error;
    }
}

const getEscolaridadeById = async (id) => {
    const query = 'SELECT * FROM escolaridade WHERE id = ?';

    try {
        const [escolaridade] = await connection.execute(query, [id]);
        return escolaridade[0];
    } catch (error) {
        console.error('Erro ao obter escolaridade por ID:', error);
        throw error;
    }
}

const updateEscolaridadeById = async (id, updatedEscolaridade) => {
    const { nome, valor } = updatedEscolaridade;

    const query = 'UPDATE escolaridade SET nome = ?, valor = ? WHERE id = ?';
    const values = [nome, valor, id];

    try {
        const result = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            console.error(`Escolaridade com o ID ${id} não encontrada`);
            throw new Error(`Escolaridade com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar escolaridade por ID:', error);
        throw error;
    }
}

const deleteEscolaridadeById = async (id) => {
    const query = 'DELETE FROM escolaridade WHERE id = ?';
    try {
        const result = await connection.execute(query, [id]);
        if (result.affectedRows === 0) {
            console.error(`Escolaridade com o ID ${id} não encontrada`);
            throw new Error(`Escolaridade com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir escolaridade por ID:', error);
        throw error;
    }
}

module.exports = {
    createEscolaridade,
    getAllEscolaridades,
    getEscolaridadeById,
    updateEscolaridadeById,
    deleteEscolaridadeById
};
