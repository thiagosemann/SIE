const editaisModel = require('../models/editaisModel');
const inscricoesModel = require('../models/inscritionModel');
const pgeModel = require('../models/pgeModel');

const getAllEditais = async (_request, response) => {
  try {
    const editais = await editaisModel.getAllEditais();
    return response.status(200).json(editais);
  } catch (error) {
    console.error('Erro ao obter editais:', error);
    return response.status(500).json({ error: 'Erro ao obter editais' });
  }
};

const createEdital = async (request, response) => {
  try {
    const createdEdital = await editaisModel.createEdital(request.body);
    return response.status(201).json(createdEdital);
  } catch (error) {
    console.error('Erro ao criar edital:', error);
    return response.status(500).json({ error: 'Erro ao criar edital' });
  }
};

const getEditalById = async (request, response) => {
  try {
    const { id } = request.params;
    const edital = await editaisModel.getEditalById(id);

    if (edital) {
      return response.status(200).json(edital);
    } else {
      return response.status(404).json({ message: 'Edital não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter edital por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter edital por ID' });
  }
};

const updateEditalById = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedEditalData = request.body;
    console.log(updatedEditalData)
    const result = await editaisModel.updateEditalById(id, updatedEditalData);

    if (result) {
      return response.status(200).json({ message: 'Edital atualizado com sucesso' });
    } else {
      return response.status(404).json({ message: 'Edital não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar edital por ID:', error);
    return response.status(500).json({ error: 'Erro ao atualizar edital por ID' });
  }
};

const deleteEditalById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await editaisModel.deleteEditalById(id);
    console.log(result)
    if (result) {
      return response.status(200).json({ message: 'Edital excluído com sucesso' });
    } else {
      return response.status(404).json({ message: 'Edital não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir edital por ID:', error);
    return response.status(500).json({ error: 'Erro ao excluir edital por ID' });
  }
};

const getEditaisByBBM = async (request, response) => {
  try {
    const { bbm } = request.params;
    const editais = await editaisModel.getEditaisByBBM(bbm);

    if (editais.length > 0) {
      return response.status(200).json(editais);
    } else {
      return response.status(404).json({ message: 'Editais não encontrados para o BBM fornecido' });
    }
  } catch (error) {
    console.error('Erro ao obter editais por BBM:', error);
    return response.status(500).json({ error: 'Erro ao obter editais por BBM' });
  }
};



const updateEditaisPeriodically = async () => {
  // Intervalo de atualização em milissegundos (ex: 1 hora)
   const updateInterval = 60 * 60 * 1000;

  // Função de atualização dos editais
  const updateEditais = async () => {
    try {
        const editais = await editaisModel.getAllEditais();
        const todayDate = new Date();
        for (const edital of editais) {
          const [day, month, year] = edital.endInscritiondate.split('/');
          const endInscritiondate = new Date(`${year}-${month}-${day}`);
          const inscricoes = await inscricoesModel.getInscricoesByDocument(edital.documentosCriadosId);
          if (todayDate.getTime() > endInscritiondate.getTime()) {
            // Passou da data limite
            // Verificar pendências nas inscrições.
            for (const inscricao of inscricoes) {
                if (inscricao.situacao === "Pendente") {
                    await editaisModel.updatePendencias(edital.id, {
                        pendenciasMensagem: "Faltou homologar inscrições.",
                        pendenciasInscricoes: "Pendencia"
                    });
                    // Pode dar problema em quantidade de cursos que não tenham as inscrições homologadas.
                }
            }
            if(inscricoes.length==0){
              await editaisModel.updatePendencias(edital.id, {
                pendenciasMensagem: "Curso com zero inscrições.",
                pendenciasInscricoes: "Pendencia"
              });
            }
            if(inscricoes.length> edital.vagas){
              await editaisModel.updatePendencias(edital.id, {
                pendenciasMensagem: "Curso com maior quantidade de inscritos que vagas.",
                pendenciasInscricoes: "Pendencia"
              });
            }

          }
        }
    } catch (error) {
        console.error('Erro ao atualizar editais:', error);
    }
};

  // Inicia a atualização no início e repete em intervalos
   updateEditais();
   setInterval(updateEditais, updateInterval);
};



// Inicie a atualização periódica ao iniciar o aplicativo
updateEditaisPeriodically();


module.exports = {
  getAllEditais,
  createEdital,
  getEditalById,
  updateEditalById,
  deleteEditalById,
  getEditaisByBBM
};
