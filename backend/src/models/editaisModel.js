const connection = require('./connection');


const createEdital = async (edital) => {
    try {
        const {
            documentosCriadosId,
            numeroProcesso,
            statusAssinatura,
            statusPublicacao,
            statusNotaEletronica,
            statusSgpe,
            statusNb,
            statusFinalizacao,
            auth,
            sgpe,
            dataEntrada,
            sigla,
            localAtiMunicipio,
            bbm,
            startInscritiondate,
            endInscritiondate,
            iniCur,
            fimCur,
            vagas,
            pgeId
        } = edital;

        // Validação dos dados de entrada
        if (!documentosCriadosId || !numeroProcesso || !sigla || !startInscritiondate || !endInscritiondate) {
            throw new Error('Dados insuficientes para criar um novo edital.');
        }

        // Adicione os valores fixos para as colunas pendenciasInscricoes e pendenciasMensagem
        const pendenciasInscricoes = "Homologar";
        const pendenciasMensagem = "";

        const query = `INSERT INTO editais (documentosCriadosId, numeroProcesso, statusAssinatura, statusPublicacao, statusNotaEletronica, statusSgpe, statusNb, statusFinalizacao, auth, sgpe, dataEntrada, sigla, localAtiMunicipio, bbm, startInscritiondate, endInscritiondate, iniCur, fimCur, vagas, pgeId, pendenciasInscricoes, pendenciasMensagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            documentosCriadosId,
            numeroProcesso,
            statusAssinatura,
            statusPublicacao,
            statusNotaEletronica,
            statusSgpe,
            statusNb,
            statusFinalizacao,
            auth,
            sgpe,
            dataEntrada,
            sigla,
            localAtiMunicipio,
            bbm,
            startInscritiondate,
            endInscritiondate,
            iniCur,
            fimCur,
            vagas,
            pgeId,
            pendenciasInscricoes,
            pendenciasMensagem
        ];

        const result = await connection.execute(query, values);

        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error('Erro ao criar novo edital:', error);
        throw error;
    }
};


const updatePendencias = async (id, obj) => {
    const {
        pendenciasInscricoes,
        pendenciasMensagem
    } = obj;
    
    const query = 'UPDATE editais SET pendenciasInscricoes = ?, pendenciasMensagem = ? WHERE id = ?';

    const values = [pendenciasInscricoes, pendenciasMensagem, id];

    try {
        const result = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            console.error(`Edital com o ID ${id} não encontrado`);
            throw new Error(`Edital com o ID ${id} não encontrado`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar pendências do edital por ID', error);
        throw error;
    }
}


const getAllEditais = async () => {
    const query = 'SELECT * FROM editais';

    try {
        const [editais] = await connection.execute(query);
        return editais;
    } catch (error) {
        console.error('Erro ao obter todos os editais', error);
        throw error;
    }
}

const getEditalById = async (id) => {
    const query = 'SELECT * FROM editais WHERE id = ?';
    
    try {
        const [edital] = await connection.execute(query, [id]);
        return edital[0];
    } catch (error) {
        console.error('Erro ao obter edital por ID', error);
        throw error;
    }
}

const updateEditalById = async (id, updatedEdital) => {
    // Construa a query de atualização com base nas colunas que você deseja permitir a atualização
    const query = 'UPDATE editais SET numeroProcesso = ?, statusAssinatura = ?, statusPublicacao = ?, statusNotaEletronica = ?, statusSgpe = ?, statusNb = ?, statusFinalizacao = ? WHERE id = ?';
    console.log("id",id)
    console.log("updatedEdital",updatedEdital)
    
    const values = [
        updatedEdital.numeroProcesso,
        updatedEdital.statusAssinatura,
        updatedEdital.statusPublicacao,
        updatedEdital.statusNotaEletronica,
        updatedEdital.statusSgpe,
        updatedEdital.statusNb,
        updatedEdital.statusFinalizacao,        
        id
    ];

    try {
        const result = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            console.error(`Inscrição com o ID ${id} não encontrada`);
            throw new Error(`Inscrição com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar edital por ID', error);
        throw error;
    }
}


const deleteEditalById = async (id) => {
    const query = 'DELETE FROM editais WHERE id = ?';
    try {
        const result = await connection.execute(query, [id]);
        if (result.affectedRows === 0) {
            console.error(`Inscrição com o ID ${id} não encontrada`);
            throw new Error(`Inscrição com o ID ${id} não encontrada`);
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir edital por ID', error);
        throw error;
    }
}

const getEditaisByBBM = async (bbm) => {
    const query = 'SELECT * FROM editais WHERE bbm = ?';

    try {
        // Validar dados de entrada
        if (!bbm) {
            throw new Error('Código BBM não fornecido.');
        }

        const [editais] = await connection.execute(query, [bbm]);
        return editais;
    } catch (error) {
        console.error('Erro ao obter editais por BBM', error);
        throw error;
    }
}


const getEditaisByProcNum = async (numeroProcesso) => {
    const query = 'SELECT * FROM editais WHERE numeroProcesso = ?';
    try {
        // Validar dados de entrada
        if (!numeroProcesso) {
            throw new Error('Código numeroProcesso não fornecido.');
        }
        const [editais] = await connection.execute(query, [numeroProcesso]);
        return editais;
    } catch (error) {
        console.error('Erro ao obter editais por numeroProcesso', error);
        throw error;
    }
}

module.exports = {
    createEdital,
    getAllEditais,
    getEditalById,
    updateEditalById,
    deleteEditalById,
    getEditaisByBBM,
    updatePendencias,
    getEditaisByProcNum
};
