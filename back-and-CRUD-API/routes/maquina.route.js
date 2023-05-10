const express = require('express');
const app = express();
const maquinaRoutes = express.Router();

let Maquina = require('../model/Maquina');

// api to add maquina
maquinaRoutes.route('/add').post(function (req, res) {
  let maquina = new Maquina(req.body);
  maquina.save()
    .then(maquina => {
      res.status(200).json({ 'status': 'success', 'mssg': 'maquina added successfully' });
    })
    .catch(err => {
      res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
    });
});


maquinaRoutes.route('/').get(async function (req, res) {
  try {
    const livrosResultado = await Maquina.find();
    res.status(200).json(livrosResultado)
  } catch (err) {
    res.status(500).json(err);
  }
});

// api to get maquina
maquinaRoutes.route('/maquina/:id').get(function (req, res) {
  let id = req.params.id;
  Maquina.findById(id, function (err, maquina) {
    if (err) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
    else {
      res.status(200).json({ 'status': 'success', 'maquina': maquina });
    }
  });
});

// api to update route
maquinaRoutes.route('/update/:id').put(function (req, res) {
  Maquina.findById(req.params.id, function (err, maquina) {
    if (!maquina) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
    } else {
      maquina.capacidade = req.body.capacidade;
      maquina.materiaisDeConstrucao = req.body.materiaisDeConstrucao;
      maquina.sistemaDeAquecimento = req.body.sistemaDeAquecimento;
      maquina.sistemaDeRefrigeracao = req.body.sistemaDeRefrigeracao;
      maquina.dimensoes = req.body.dimensoes;
      maquina.marca = req.body.marca;
      maquina.modelo = req.body.modelo;


      maquina.save().then(business => {
        res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
      })
    }
  });
});

// api for delete
maquinaRoutes.route('/delete/:id').delete(function (req, res) {
  Maquina.findByIdAndRemove({ _id: req.params.id }, function (err,) {
    if (err) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
    else {
      res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
    }
  });
});

module.exports = maquinaRoutes;