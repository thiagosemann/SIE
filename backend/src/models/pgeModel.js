const connection = require('./connection');

const getAllPge = async () => {
  const [pges] = await connection.execute('SELECT * FROM pge');
  return pges;
};

const getPgeByProcNum = async (procNum) => {
  const query = 'SELECT * FROM pge WHERE procNum = ?';
  const [pges] = await connection.execute(query, [procNum]);
  return pges.length ? pges[0] : null;
};

const updatePgeByProcNum = async (procNum, pge) => {
  const {
    situacao,
    sigla,
    nome,
    coord,
    local,
    bbm,
    ha,
    hai,
    vagas,
    vagasBBM1,
    vagasBBM2,
    vagasBBM3,
    vagasBBM4,
    vagasBBM5,
    vagasBBM6,
    vagasBBM7,
    vagasBBM8,
    vagasBBM9,
    vagasBBM10,
    vagasBBM11,
    vagasBBM12,
    vagasBBM13,
    vagasBBM14,
    vagasBBM15,
    vagasBBMBOA,
    vagasBBMCapital,
    vagasBBMExternas,
    dataIni,
    dataFim,
    aeTipo,
    alojamento,
    valorPrevHA,
    valorPrevDiaCurso,
    valorPrevDiaMilitar,
    valorPrevAlimentacao,
    excluido,
    apostilamento,
  } = pge;

  const query = `UPDATE pge SET situacao = ?, sigla = ?, nome = ?, coord = ?, local = ?, bbm = ?, ha = ?, hai = ?, vagas = ?, vagasBBM1 = ?, vagasBBM2 = ?, vagasBBM3 = ?, vagasBBM4 = ?, vagasBBM5 = ?, vagasBBM6 = ?, vagasBBM7 = ?, vagasBBM8 = ?, vagasBBM9 = ?, vagasBBM10 = ?, vagasBBM11 = ?, vagasBBM12 = ?, vagasBBM13 = ?, vagasBBM14 = ?, vagasBBM15 = ?, vagasBBMBOA = ?, vagasBBMCapital = ?, vagasBBMExternas = ?, dataIni = ?, dataFim = ?, aeTipo = ?, alojamento = ?, valorPrevHA = ?, valorPrevDiaCurso = ?, valorPrevDiaMilitar = ?, valorPrevAlimentacao = ?, excluido = ?, apostilamento = ? WHERE procNum = ?`;

  const values = [
    situacao,
    sigla,
    nome,
    coord,
    local,
    bbm,
    ha,
    hai,
    vagas,
    vagasBBM1,
    vagasBBM2,
    vagasBBM3,
    vagasBBM4,
    vagasBBM5,
    vagasBBM6,
    vagasBBM7,
    vagasBBM8,
    vagasBBM9,
    vagasBBM10,
    vagasBBM11,
    vagasBBM12,
    vagasBBM13,
    vagasBBM14,
    vagasBBM15,
    vagasBBMBOA,
    vagasBBMCapital,
    vagasBBMExternas,
    dataIni,
    dataFim,
    aeTipo,
    alojamento,
    valorPrevHA,
    valorPrevDiaCurso,
    valorPrevDiaMilitar,
    valorPrevAlimentacao,
    excluido,
    "",
    procNum,
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Erro ao atualizar PGE:', error);
    throw error;
  }
};
const createPge = async (pge) => {
  const {
    situacao,
    procNum,
    sigla,
    nome,
    coord,
    local,
    bbm,
    ha,
    hai,
    vagas,
    dataIni,
    dataFim,
    aeTipo,
    alojamento,
    valorPrevHA,
    valorPrevDiaCurso,
    valorPrevDiaMilitar,
    valorPrevAlimentacao,
    excluido,
    apostilamento,
  } = pge;

  const bindParameters = [];

  bindParameters.push(situacao || null);
  bindParameters.push(procNum || null);
  bindParameters.push(sigla || null);
  bindParameters.push(nome || null);
  bindParameters.push(coord || null);
  bindParameters.push(local || null);
  bindParameters.push(bbm || null);
  bindParameters.push(ha !== undefined && ha !== '' ? ha : null);
  bindParameters.push(hai !== undefined && hai !== '' ? hai : null);
  bindParameters.push(vagas !== undefined && vagas !== '' ? vagas : null);
  bindParameters.push(dataIni || null);
  bindParameters.push(dataFim || null);
  bindParameters.push(aeTipo || null);
  bindParameters.push(alojamento || null);
  bindParameters.push(valorPrevHA !== undefined && valorPrevHA !== '' ? valorPrevHA : null);
  bindParameters.push(valorPrevDiaCurso !== undefined && valorPrevDiaCurso !== '' ? valorPrevDiaCurso : null);
  bindParameters.push(valorPrevDiaMilitar !== undefined && valorPrevDiaMilitar !== '' ? valorPrevDiaMilitar : null);
  bindParameters.push(valorPrevAlimentacao !== undefined && valorPrevAlimentacao !== '' ? valorPrevAlimentacao : null);
  bindParameters.push(excluido !== undefined && excluido !== '' ? excluido : null);
  bindParameters.push(apostilamento !== undefined && apostilamento !== '' ? "apostilamento" : null);

  const query = `INSERT INTO pge (situacao, procNum, sigla, nome, coord, local, bbm, ha, hai, vagas, dataIni, dataFim, aeTipo, alojamento, valorPrevHA, valorPrevDiaCurso, valorPrevDiaMilitar, valorPrevAlimentacao, excluido, apostilamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await connection.execute(query, bindParameters);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir PGE:', error);
    throw error;
  }
};

const updatePgeById = async (id, pge) => {

  const {
    situacao,
    editalId,
    documentoCriadoId  // Corrigido o nome da propriedade aqui
  } = pge;

  const query = `UPDATE pge SET situacao = ?, editalId = ?, documentosCriadosId = ? WHERE id = ?`;

  const values = [
    situacao,
    editalId,
    documentoCriadoId,  // Corrigido o nome da propriedade aqui
    id
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Erro ao atualizar PGE:', error);
    throw error;
  }
};

// Supondo que você tenha um modelo para inscrições chamado `inscricoesModel`

const updateSituacaoInscricao = async (id, situacao) => {
  try {
      const query = 'UPDATE pge SET situacao = ? WHERE id = ?';
      const values = [situacao, id];
      const [result] = await connection.execute(query, values);
      return { affectedRows: result.affectedRows };
  } catch (error) {
      console.error(`Erro ao atualizar situação da inscrição ${id}:`, error);
      throw error;
  }
};





module.exports = {
  getAllPge,
  getPgeByProcNum,
  updatePgeByProcNum,
  createPge,
  updatePgeById,
  updateSituacaoInscricao
};
