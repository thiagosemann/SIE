const documentoModel = require('../../models/Documentos/documentoModel');
const capituloModel = require('../../models/Documentos/capituloModel');
const itemModel = require('../../models/Documentos/itemModel');
const subitemModel = require('../../models/Documentos/subitemModel');
const subsubitemModel = require('../../models/Documentos/subsubItemModel');
const tabelaDadosModel = require('../../models/Documentos/TabelaDadosModel');
const dadosModel = require('../../models/Documentos/dadosModel');
const vagasModel = require('../../models/Documentos/vagasModel');

const getAllDocumentos = async (_request, response) => {
  try {
    const documentos = await documentoModel.getAllDocumentos();
    return response.status(200).json(documentos);
  } catch (error) {
    console.error('Erro ao obter documentos:', error);
    return response.status(500).json({ error: 'Erro ao obter documentos' });
  }
};

const createDocumento = async (request, response) => {
  try {
    const createdDocumento = await documentoModel.createDocumento(request.body.tipo);
    return response.status(201).json(createdDocumento);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    return response.status(500).json({ error: 'Erro ao criar documento' });
  }
};

const deleteDocumento = async (request, response) => {
  try {
    const { id } = request.params;
    await documentoModel.deleteDocumento(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return response.status(500).json({ error: 'Erro ao excluir documento' });
  }
};
const getDocumentoByTipo = async (req, res) => {
  try {
    const { tipoDocumento } = req.params;

    // Buscar informações no banco de dados com base no tipo de documento
    const documento = await documentoModel.findOne({ tipo: tipoDocumento }).exec();
    const capitulos = await capituloModel.find({ documentoId: documento.id }).exec();
    const itens = await itemModel.find({ capituloId: { $in: capitulos.map(c => c.id) } }).exec();
    const subitens = await subitemModel.find({ itemId: { $in: itens.map(i => i.id) } }).exec();
    const subsubitens = await subsubitemModel.find({ subitemId: { $in: subitens.map(si => si.id) } }).exec();
    const tabelasDados = await tabelaDadosModel.find({ itemId: { $in: itens.map(i => i.id) } }).exec();
    const dados = await dadosModel.find({ tabelaDadosId: { $in: tabelasDados.map(td => td.id) } }).exec();
    const vagas = await vagasModel.find({ itemId: { $in: itens.map(i => i.id) } }).exec();

    // Montar o JSON formatado com as informações buscadas
    const json = {
      documento: {
        tipo: documento.tipo,
        data: documento.data.map(d => d.texto)
      },
      capitulos: capitulos.map(c => ({
        tipo: c.tipo,
        numero: c.numero,
        texto: c.texto,
        itens: itens
          .filter(i => i.capituloId === c.id)
          .map(i => ({
            tipo: i.tipo,
            numero: i.numero,
            texto: i.texto,
            subitens: subitens
              .filter(si => si.itemId === i.id)
              .map(si => ({
                tipo: si.tipo,
                texto: si.texto,
                letra: si.letra,
                subsubitens: subsubitens
                  .filter(ssi => ssi.subitemId === si.id)
                  .map(ssi => ({
                    tipo: ssi.tipo,
                    letra: ssi.letra,
                    texto: ssi.texto
                  }))
              })),
            tabelas: tabelasDados
              .filter(td => td.itemId === i.id)
              .map(td => ({
                tipo: td.tipo,
                content: td.content,
                hasHeader: td.hasHeader,
                dados: dados
                  .filter(d => d.tabelaDadosId === td.id)
                  .map(d => d.valor)
              })),
            vagas: vagas
              .filter(v => v.itemId === i.id)
              .map(v => ({
                bbm: v.bbm,
                quantidade: v.quantidade
              }))
          }))
      }))
    };

    // Retornar o JSON formatado
    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter o documento.' });
  }
};

module.exports = {
  getAllDocumentos,
  createDocumento,
  deleteDocumento,
  getDocumentoByTipo
};
