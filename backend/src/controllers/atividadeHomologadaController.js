const atividadeHomologadaModel = require('../models/atividadesHomologadaModel');
const axios = require('axios');

const getAllAtividadeHomologada = async (_request, response) => {
  try {
    const atividades = await atividadeHomologadaModel.getAllAtividadeHomologada();

    // Itera sobre cada atividade para obter a última versão de sgpe e linkSgpe
    const atividadesComUltimaVersao = await Promise.all(atividades.map(async (atividade) => {
      const versions = await atividadeHomologadaModel.getAllAtividadeHomologadaVersionsById(atividade.id);

      // Encontra a última versão
      const ultimaVersao = versions.length > 0 ? versions[versions.length - 1] : null;

      // Adiciona sgpe e linkSgpe da última versão à atividade
      if (ultimaVersao) {
        atividade.sgpe = ultimaVersao.sgpe;
        atividade.linkSgpe = ultimaVersao.linkSgpe;
      }

      return atividade;
    }));

    return response.status(200).json(atividadesComUltimaVersao);
  } catch (error) {
    console.error('Erro ao obter atividadeHomologada:', error);
    return response.status(500).json({ error: 'Erro ao obter atividades homologadas' });
  }
};
const getAllAtividadeHomologadaVersionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const versions = await atividadeHomologadaModel.getAllAtividadeHomologadaVersionsById(id);
    return res.status(200).json(versions);
  } catch (error) {
    console.error('Erro ao obter versões da atividadeHomologada:', error);
    return res.status(500).json({ error: 'Erro ao obter versões da atividade homologada' });
  }
};

const updateAtividadeHomologadaById = async (request, response) => {
  const { id } = request.params;
  const atividade = request.body;
  console.log(id)
  console.log(atividade)
  
  try {
    // Obtém a atividade homologada atual pelo ID
    const versions = await atividadeHomologadaModel.getAllAtividadeHomologadaVersionsById(atividade.id);

    // Encontra a última versão
    const ultimaVersao = versions.length > 0 ? versions[versions.length - 1] : null;

    // Verifica se o SGPE é diferente do último valor inserido
    if (ultimaVersao.sgpe !== atividade.sgpe) {
      // Cria uma nova versão na tabela de versionamento
      await atividadeHomologadaModel.createAtividadeHomologadaVersion(id, atividade.sgpe, atividade.linkSgpe);
    }

    // Atualiza a atividade homologada na tabela principal
    const result = await atividadeHomologadaModel.updateAtividadeHomologadaById(id, atividade);
    console.log(result)
    return response.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar atividadeHomologada:', error);
    return response.status(500).json({ error: 'Erro ao atualizar atividade homologada' });
  }
};

const getAtividadeHomologadaBySigla = async (req, res) => {
    try {
      const { sigla } = req.params;
      const atividade = await atividadeHomologadaModel.getAtividadeHomologadaBySigla(sigla);
      if (atividade) {
        return res.status(200).json(atividade);
      } else {
        return res.status(200).json({}); // Retornar objeto vazio
      }
    } catch (error) {
      console.error('Erro ao obter atividade:', error);
      return res.status(500).json({ error: 'Erro ao obter atividade' });
    }
  };

const createAtividadeHomologada = async (request, response) => {
  const atividade = request.body;

  try {
    const result = await atividadeHomologadaModel.createAtividadeHomologada(atividade);
    return response.status(201).json(result);
  } catch (error) {
    console.error('Erro ao criar atividadeHomologada:', error);
    return response.status(500).json({ error: 'Erro ao criar atividade homologada' });
  }
};


module.exports = {
  getAllAtividadeHomologada,
  updateAtividadeHomologadaById,
  createAtividadeHomologada,
  getAtividadeHomologadaBySigla,
  getAllAtividadeHomologadaVersionsById
};
