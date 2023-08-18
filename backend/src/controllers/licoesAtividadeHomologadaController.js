const licoesModel = require('../models/licoesAtividadeHomologadaModel');
const axios = require('axios');

const getAllLicoes = async (_request, response) => {
  try {
    const licoes = await licoesModel.getAllLicoes();
    return response.status(200).json(licoes);
  } catch (error) {
    console.error('Erro ao obter Lições:', error);
    return response.status(500).json({ error: 'Erro ao obter Lições' });
  }
};
const getLicoesBySigla = async (req, res) => {
    try {
      const { sigla } = req.params;
      const licoes = await licoesModel.getLicoesBySigla(sigla);
      if (licoes) {
        return res.status(200).json(licoes);
      } else {
        return res.status(404).json({ message: 'Lição não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao obter documento:', error);
      return res.status(500).json({ error: 'Erro ao obter lição' });
    }
  };

  async function fetchDataAndSaveToDatabase() {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbwbonOg8RpcVxdQfCjmUaFpi9dNsu4CXBAFPFGo0z4q-u9hkbUm_Tug0gqjlKJrxhiSmg/exec?action=getLicoes');
      const licoesData = response.data;
  
      // Verifique se a resposta contém os dados esperados
      if (!Array.isArray(licoesData)) {
        throw new Error('Os dados recebidos não estão no formato esperado');
      }
  
      // Salve os dados no banco de dados
      const updatedLicoes = [];
  
      for (const licao of licoesData) {
  
        // Converter todos os campos para strings
        Object.keys(licao).forEach((key) => {
          if (typeof licao[key] !== 'string' && licao[key] !== null && licao[key] !== undefined) {
            licao[key] = licao[key].toString();
          }
        });
        const existingLicao = await licoesModel.getLicaoByIdentifier(licao.identifier);

        if (existingLicao && existingLicao.length>0) {
          // Verificar se algum valor foi alterado
          let hasChanges = false;
          const changedFields = {};
  
          for (const key in licao) {
   
            const oldValue = String(existingLicao[key]);
            const newValue = String(licao[key]);
  
            if (oldValue !== newValue) {
              hasChanges = true;
              changedFields[key] = { oldValue, newValue };
              existingLicao[key] = newValue;
            }
          }
  
          if (hasChanges) {
            await licoesModel.updateLicaoByIdentifier(licao.identifier, existingLicao);
            const identifier = licao.identifier;
            updatedLicoes.push({ identifier, changedFields });
          }
        } else {
          await licoesModel.createLicao(licao);
        }
      }
  
      // Exibir as mudanças no console
      const processedProcNums = new Set();
  
      for (const { procNum, changedFields } of updatedLicoes) {
        if (processedProcNums.has(procNum)) {
          continue; // Pular iteração se já processou esse procNum
        }
  
        console.log(`Lição com nome  ${procNum} teve as seguintes mudanças:`);
        for (const key in changedFields) {
          const { oldValue, newValue } = changedFields[key];
          console.log(`${key}: ${oldValue} -> ${newValue}`);
        }
        console.log('----------------------------------------');
  
        processedProcNums.add(procNum);
      }
  
      console.log('Os dados das Lições foram salvos no banco de dados com sucesso!');
    } catch (error) {
      console.error('Ocorreu um erro ao obter os dados do servidor ou ao salvar no banco de dados:', error);
    }
  }

  //fetchDataAndSaveToDatabase() 
  function scheduleFunction( ) {
    const d = new Date();
    const currentMinutes = d.getMinutes();
  
    // Verifica se o minuto atual é igual a 30
    if (currentMinutes === 30) {
        fetchDataAndSaveToDatabase();
    }
  }
  
  // Chamando a função inicialmente para verificar se deve ser executada imediatamente
  scheduleFunction();

  // Configurando o setInterval para chamar a função a cada minuto
  setInterval(scheduleFunction, 60000); // 60000 milissegundos = 1 minuto

  
module.exports = {
  getAllLicoes,
  getLicoesBySigla
};
