const connection = require('./connection');

const createGraduacao = async (graduacao) => {
    const {
        nome,
        diariaCurso,
        abreviacao1,
        abreviacao2
    } = graduacao;

    const query = 'INSERT INTO graduacao (nome, diariaCurso, abreviacao1, abreviacao2) VALUES (?, ?, ?, ?)';
    const values = [nome, diariaCurso, abreviacao1, abreviacao2];

    try {
        const result = await connection.execute(query, values);
        return result.insertId;
    } catch (error) {
        console.error('Erro ao criar graduação', error);
        throw error;
    }
}

const getAllGraduacoes = async () => {
    const query = 'SELECT * FROM graduacao';

    try {
        const [graduacoes] = await connection.execute(query);
        return graduacoes;
    } catch (error) {
        console.error('Erro ao obter todas as graduações', error);
        throw error;
    }
}

const getGraduacaoById = async (id) => {
    const query = 'SELECT * FROM graduacao WHERE id = ?';

    try {
        const [graduacao] = await connection.execute(query, [id]);
        return graduacao[0];
    } catch (error) {
        console.error('Erro ao obter graduação por ID', error);
        throw error;
    }
}

const updateGraduacaoById = async (id, updatedGraduacao) => {
    const {
        nome,
        diariaCurso,
        abreviacao1,
        abreviacao2
    } = updatedGraduacao;

    const query = 'UPDATE graduacao SET nome = ?, diariaCurso = ?, abreviacao1 = ?, abreviacao2 = ? WHERE id = ?';
    const values = [nome, diariaCurso, abreviacao1, abreviacao2, id];

    try {
        const result = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            console.error(`Graduação com o ID ${id} não encontrada`);
            throw new Error(`Graduação com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar graduação por ID', error);
        throw error;
    }
}

const deleteGraduacaoById = async (id) => {
    const query = 'DELETE FROM graduacao WHERE id = ?';
    try {
        const result = await connection.execute(query, [id]);
        if (result.affectedRows === 0) {
            console.error(`Graduação com o ID ${id} não encontrada`);
            throw new Error(`Graduação com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir graduação por ID', error);
        throw error;
    }
}

module.exports = {
    createGraduacao,
    getAllGraduacoes,
    getGraduacaoById,
    updateGraduacaoById,
    deleteGraduacaoById
};
