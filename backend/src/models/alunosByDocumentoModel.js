const connection = require('./connection');

const getAllAlunosByDocumento = async () => {
  try {
    const [alunos] = await connection.execute('SELECT * FROM alunosByDocumento');
    return alunos;
  } catch (error) {
    console.error('Erro ao obter todos os alunos:', error);
    throw error;
  }
};
const createAlunosByDocumento = async (alunosDataArray,documentosCriadosId) => {
  try {
    const results = [];

    for (const alunoData of alunosDataArray) {
      const {
        classificacao,
        name,
        cpf,
        mtcl,
        birthdate,
        situacaoInscricao,
        situacao,
        pesoGraduacao,
        nota,
        mediaFinal,
        exame,
        faltas,
        excluido,
        motivoExcluido,
        desistente,
        motivoDesistente,
        type,
        diariaDeCurso,
        diariaMilitar,
        diariaDeCursoQtd,
        escolaridade_id,
        graduacao_id,
        user_id,
        userCivil_id
      } = alunoData;

      const query = `
        INSERT INTO alunosByDocumento (
          classificacao, name, cpf, mtcl, birthdate, situacaoInscricao, situacao,
          pesoGraduacao, nota, mediaFinal, exame, faltas, excluido, motivoExcluido,
          desistente, motivoDesistente, type, diariaDeCurso, diariaMilitar, diariaDeCursoQtd,
          escolaridade_id, graduacao_id, user_id, userCivil_id,documentosCriadosId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
          classificacao || null,
          name || null,
          cpf || null,
          mtcl || null,
          birthdate || null,
          situacaoInscricao || null,
          situacao || null,
          pesoGraduacao || null,
          nota || null,
          mediaFinal || null,
          exame || null,
          faltas || null,
          excluido || null,
          motivoExcluido || null,
          desistente || null,
          motivoDesistente || null,
          type || null,
          diariaDeCurso || null,
          diariaMilitar || null,
          diariaDeCursoQtd || null,
          escolaridade_id || null,
          graduacao_id || null,
          user_id || null,
          userCivil_id || null,
          documentosCriadosId
        ];
  

      const [result] = await connection.execute(query, values);
      results.push({ insertId: result.insertId });
    }

    return results;
  } catch (error) {
    console.error('Erro ao inserir alunos:', error);
    throw error;
  }
};

const createAlunoByDocumento = async (alunoData) => {
  const {
    classificacao,
    name,
    cpf,
    mtcl,
    birthdate,
    situacaoInscricao,
    situacao,
    pesoGraduacao,
    nota,
    mediaFinal,
    exame,
    faltas,
    excluido,
    motivoExcluido,
    desistente,
    motivoDesistente,
    type,
    diariaDeCurso,
    diariaMilitar,
    diariaDeCursoQtd,
    escolaridade_id,
    graduacao_id,
    user_id,
    userCivil_id
  } = alunoData;
  
  const query = `
    INSERT INTO alunosByDocumento (
      classificacao, name, cpf, mtcl, birthdate, situacaoInscricao, situacao,
      pesoGraduacao, nota, mediaFinal, exame, faltas, excluido, motivoExcluido,
      desistente, motivoDesistente, type, diariaDeCurso, diariaMilitar, diariaDeCursoQtd,
      escolaridade_id, graduacao_id, user_id, userCivil_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    classificacao, name, cpf, mtcl, birthdate, situacaoInscricao, situacao,
    pesoGraduacao, nota, mediaFinal, exame, faltas, excluido, motivoExcluido,
    desistente, motivoDesistente, type, diariaDeCurso, diariaMilitar, diariaDeCursoQtd,
    escolaridade_id, graduacao_id, user_id, userCivil_id
  ];
  
  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir aluno:', error);
    throw error;
  }
};

const getAlunoByDocumentoId = async (id) => {
  const query = 'SELECT * FROM alunosByDocumento WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter aluno por ID:', error);
    throw error;
  }
};

const updateAlunoByDocumentoId = async (updatedAlunoData) => {
  const { id, ...alunoData } = updatedAlunoData;
  const keys = Object.keys(alunoData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(alunoData);
  values.push(id);

  const query = `UPDATE alunosByDocumento SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Aluno com o ID ${id} não encontrado`);
      throw new Error(`Aluno com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    throw error;
  }
};

const deleteAlunoByDocumentoId = async (id) => {
  const query = 'DELETE FROM alunosByDocumento WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Aluno com o ID ${id} não encontrado`);
      throw new Error(`Aluno com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw error;
  }
};

module.exports = {
  getAllAlunosByDocumento,
  createAlunoByDocumento,
  getAlunoByDocumentoId,
  updateAlunoByDocumentoId,
  deleteAlunoByDocumentoId,
  createAlunosByDocumento
};
