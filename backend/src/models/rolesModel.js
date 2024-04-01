const connection = require('./connection');

const createRole = async (role) => {
    const { nome } = role;

    const query = 'INSERT INTO roles (nome) VALUES (?)';
    const values = [nome];

    try {
        const result = await connection.execute(query, values);
        return result.insertId;
    } catch (error) {
        console.error('Erro ao criar função', error);
        throw error;
    }
}

const getAllRoles = async () => {
    const query = 'SELECT * FROM roles';

    try {
        const [roles] = await connection.execute(query);
        return roles;
    } catch (error) {
        console.error('Erro ao obter todas as funções', error);
        throw error;
    }
}

const getRoleById = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = ?';

    try {
        const [role] = await connection.execute(query, [id]);
        return role[0];
    } catch (error) {
        console.error('Erro ao obter função por ID', error);
        throw error;
    }
}

const updateRoleById = async (id, updatedRole) => {
    const { nome } = updatedRole;

    const query = 'UPDATE roles SET nome = ? WHERE id = ?';
    const values = [nome, id];

    try {
        const result = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            console.error(`Função com o ID ${id} não encontrada`);
            throw new Error(`Função com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar função por ID', error);
        throw error;
    }
}

const deleteRoleById = async (id) => {
    const query = 'DELETE FROM roles WHERE id = ?';
    try {
        const result = await connection.execute(query, [id]);
        if (result.affectedRows === 0) {
            console.error(`Função com o ID ${id} não encontrada`);
            throw new Error(`Função com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir função por ID', error);
        throw error;
    }
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
};
