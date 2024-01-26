const pgeModel = require('../models/pgeModel');
const axios = require('axios');

const getAllPge = async (_request, response) => {
  try {
    const pges = await pgeModel.getAllPge();
    return response.status(200).json(pges);
  } catch (error) {
    console.error('Erro ao obter PGE:', error);
    return response.status(500).json({ error: 'Erro ao obter PGEs' });
  }
};

async function fetchDataAndSaveToDatabase() {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbw8kj_kuzysGzXrYEk6y7b7KUBOL5eJ9N9O0vRRW9ssKKFNATVzOKndbF8dhYZ4aYuK/exec?action=getPGE');
      const pgeData = response.data;
  
      // Verifique se a resposta contém os dados esperados
      if (!Array.isArray(pgeData)) {
        throw new Error('Os dados recebidos não estão no formato esperado');
      }
  
      // Salve os dados no banco de dados
      const updatedPges = [];
  
      for (const pge of pgeData) {
        const procNum = pge.id;
        pge.procNum = procNum;
        delete pge.id; // Remova o campo 'id'
  
        // Converter todos os campos para strings
        Object.keys(pge).forEach((key) => {
          if (typeof pge[key] !== 'string' && pge[key] !== null && pge[key] !== undefined) {
            pge[key] = pge[key].toString();
          }
        });
  
        const existingPge = await pgeModel.getPgeByProcNum(procNum);
  
        if (existingPge) {
          // Verificar se algum valor foi alterado
          let hasChanges = false;
          const changedFields = {};
  
          for (const key in pge) {
            if (key === 'apostilamento') {
              continue; // Ignorar a verificação da chave 'apostilamento'
            }
  
            const oldValue = String(existingPge[key]);
            const newValue = String(pge[key]);
  
            if (oldValue !== newValue) {
              hasChanges = true;
              changedFields[key] = { oldValue, newValue };
              existingPge[key] = newValue;
            }
          }
  
          if (hasChanges) {
            await pgeModel.updatePgeByProcNum(procNum, existingPge);
            updatedPges.push({ procNum, changedFields });
          }
        } else {
          await pgeModel.createPge(pge);
        }
      }
  
      // Exibir as mudanças no console
      const processedProcNums = new Set();
  
      for (const { procNum, changedFields } of updatedPges) {
        if (processedProcNums.has(procNum)) {
          continue; // Pular iteração se já processou esse procNum
        }
  
        console.log(`PGE com procNum ${procNum} teve as seguintes mudanças:`);
        for (const key in changedFields) {
          const { oldValue, newValue } = changedFields[key];
          console.log(`${key}: ${oldValue} -> ${newValue}`);
        }
        console.log('----------------------------------------');
  
        processedProcNums.add(procNum);
      }
  
      console.log('Os dados do PGE foram salvos no banco de dados com sucesso!');
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
  getAllPge,
  fetchDataAndSaveToDatabase
};
