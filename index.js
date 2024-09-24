const express = require('express');
const knex = require('knex');
const cors = require('cors');

const app = express();
const PORT = 3000;
const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root', 
        password: '', 
        database: 'ifce' 
    }
});

app.use(cors()); 
app.use(express.json()); 

// Rota para listar registros
app.get('/registros', async (req, res) => {
    try {
        const registros = await db('alunos').select('*');
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar registros' });
    }
});

app.get('/registros/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const registro = await db('alunos').where({ id_usuario: id }).first();
      if (registro) {
          res.json(registro);
      } else {
          res.status(404).json({ error: 'Registro não encontrado' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar registro' });
  }
});

// Rota para adicionar registro
app.post('/registros', async (req, res) => {
    const { nome, email } = req.body;
    try {
        await db('alunos').insert({ nome, email });
        res.status(201).json({ message: 'Registro adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar registro' });
    }
});

// Rota para editar registro
app.put('/registros/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  console.log(`Editando registro com ID: ${id}, Nome: ${nome}, Email: ${email}`);

  try {
    const count = await db('alunos').where({ id_usuario: id }).update({ nome, email });
    if (count) {
        res.json({ message: 'Registro atualizado com sucesso!' });
    } else {
        res.status(404).json({ error: 'Registro não encontrado' });
    }
  } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
});

app.delete('/registros/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const count = await db('alunos').where({ id_usuario: id }).del();
      if (count) {
          res.json({ message: 'Registro deletado com sucesso!' });
      } else {
          res.status(404).json({ error: 'Registro não encontrado' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar registro' });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
