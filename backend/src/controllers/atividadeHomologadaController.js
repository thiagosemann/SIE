const atividadeHomologadaModel = require('../models/atividadesHomologadaModel');
const axios = require('axios');

const getAllAtividadeHomologada = async (_request, response) => {
  try {
    const atividades = await atividadeHomologadaModel.getAllAtividadeHomologada();
    return response.status(200).json(atividades);
  } catch (error) {
    console.error('Erro ao obter atividadeHomologada:', error);
    return response.status(500).json({ error: 'Erro ao obter atividades homologadas' });
  }
};

const updateAtividadeHomologadaById = async (request, response) => {
  const { id } = request.params;
  const atividade = request.body;

  try {
    const result = await atividadeHomologadaModel.updateAtividadeHomologadaById(id, atividade);
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

async function fetchAtividadeDataAndSaveToDatabase() {
  try {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbz7564LnI_qSBAcvpWWN8r_5gMUGAuSAdPM0qkjIf40PpVGWGOkjDpjQ_a3OzJ2Q9-o0Q/exec?action=getAtividadeHomologada');
    const atividadesData = response.data;

    // Verifique se a resposta contém os dados esperados
    if (!Array.isArray(atividadesData)) {
      throw new Error('Os dados recebidos não estão no formato esperado');
    }

    // Salve os dados no banco de dados
    const updatedAtividades = [];

    for (const atividade of atividadesData) {
      const sigla = atividade.sigla;

      // Verificar se a sigla está definida
      if (sigla === undefined) {
        atividade.sigla = null;
      } else {
        atividade.sigla = sigla;
      }

      // Converter o campo 'vagas' para um valor inteiro, se não for nulo; caso contrário, atribuir 0
      atividade.vagas = atividade.vagas !== null && atividade.vagas !== '' ? parseInt(atividade.vagas) : 0;

      // Converter todos os campos para strings
      Object.keys(atividade).forEach((key) => {
        if (typeof atividade[key] !== 'string' && atividade[key] !== null && atividade[key] !== undefined) {
          atividade[key] = atividade[key].toString();
        }
      });

      const existingAtividade = await atividadeHomologadaModel.getAtividadeHomologadaBySigla(sigla);

      if (existingAtividade) {
        // Verificar se algum valor foi alterado
        let hasChanges = false;
        const changedFields = {};

        for (const key in atividade) {
          const oldValue = String(existingAtividade[key]);
          const newValue = String(atividade[key]);

          if (oldValue !== newValue) {
            hasChanges = true;
            changedFields[key] = { oldValue, newValue };
            existingAtividade[key] = newValue;
          }
        }

        if (hasChanges) {
          // Atualizar valores undefined para null
          Object.keys(existingAtividade).forEach((key) => {
            if (existingAtividade[key] === undefined) {
              existingAtividade[key] = null;
            }
          });

          await atividadeHomologadaModel.updateAtividadeHomologadaBySigla(sigla, existingAtividade);
          updatedAtividades.push({ sigla, changedFields });
        }
      } else {
        // Definir valores undefined como null antes de criar a atividade
        Object.keys(atividade).forEach((key) => {
          if (atividade[key] === undefined) {
            atividade[key] = null;
          }
        });

        await atividadeHomologadaModel.createAtividadeHomologada(atividade);
      }
    }

    // Exibir as mudanças no console
    const processedSiglas = new Set();

    for (const { sigla, changedFields } of updatedAtividades) {
      if (processedSiglas.has(sigla)) {
        continue; // Pular iteração se já processou essa sigla
      }

      console.log(`Atividade com sigla ${sigla} teve as seguintes mudanças:`);
      for (const key in changedFields) {
        const { oldValue, newValue } = changedFields[key];
        console.log(`${key}: ${oldValue} -> ${newValue}`);
      }
      console.log('----------------------------------------');

      processedSiglas.add(sigla);
    }

    console.log('Os dados das atividades foram salvos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Ocorreu um erro ao obter os dados do servidor ou ao salvar no banco de dados:', error);
  }
}


  
  

function scheduleAtividadeFunction() {
  const d = new Date();
  const currentMinutes = d.getMinutes();
  if (currentMinutes === 30) {
    fetchAtividadeDataAndSaveToDatabase();
  }
}

// Chamando a função inicialmente para verificar se deve ser executada imediatamente
scheduleAtividadeFunction();

// Configurando o setInterval para chamar a função a cada minuto
setInterval(scheduleAtividadeFunction, 60000); // 60000 milissegundos = 1 minuto

module.exports = {
  getAllAtividadeHomologada,
  updateAtividadeHomologadaById,
  createAtividadeHomologada,
  getAtividadeHomologadaBySigla
};
