const { Router } = require('express') // 
const Aluno = require('../models/Aluno')
const Curso = require('../models/Curso')
const Professor = require('../models/Professores')

const routes = new Router()



// GET - Lista alguma coisa
// POST - Criar/adicionar algo
// PUT - Atualizar algo
// DELETE - Deleta algo
// PATCH - depois

// criar uma rota
// tipo
// path
// implementacao

routes.get('/bem_vindo', (req, res) => {
    res.json({ name: 'Bem vindo' })
})


routes.post('/alunos', async (req, res) => {
try{
    const nome = req.body.nome
    const data_nascimento = req.body.data_nascimento
    const celular = req.body.celular

    if(!nome) {
        return res.status(400).json({messagem: 'O nome é obrigatório'})
    }

    if(!data_nascimento) {
        return res.status(400).json({messagem: 'A data de nascimento é obrigatória'})
    }

    const aluno = await Aluno.create({
        nome: nome,
        data_nascimento: data_nascimento,
        celular: celular
    })
    res.status(201).json(aluno)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Não foi possível cadastrar o aluno'})
    }
})

routes.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)
})

routes.post('/cursos', async (req, res) => {
    try{
    const nome = req.body.nome
    const duracao_horas = req.body.duracao_horas

    if(!nome) {
        return res.status(400).json({messagem: 'O nome do curso é obrigatório'})
    }

    if(!duracao_horas) {
        return res.status(400).json({messagem: 'A duração/horas do curso é obrigatória'})
    }

    const curso = await Curso.create({
        nome: nome,
        duracao_horas: duracao_horas
    })

    res.json(curso)
    } catch(error){
        res.status(500).json({error: 'Não foi possível cadastrar o curso'})
    }
})

routes.get('/cursos', async (req, res) => {
    try {
        let params = {}

        // SE for passado uma paramero QUERY chamado "nome" na requisição, então
           // esse parametro "nome" é adicionado dentro da variavel params
        if(req.query.nome)  {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = {...params, nome: req.query.nome}
        }

        if(req.query.duracao_horas)  {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = {...params, duracao_horas: req.query.duracao_horas}
        }
    
        const cursos = await Curso.findAll({
            where: params
        })
    
        res.json(cursos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível listar todos os cursos' })
    }
})


routes.delete('/cursos/:id', (req, res) => {
    const id =  req.params.id

    Curso.destroy({
        where: {
            id: id
        }
    })
    res.status(204).json({})
})

routes.put('/cursos/:id', async (req, res) => {
    const { id } = req.params

    const curso = await Curso.findByPk(id)

    if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontrado'})
    }

    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

// CRUD Professores


routes.post('/professores', async (req, res) => {
    try{
        const nome = req.body.nome
        const materia = req.body.materia
        const celular = req.body.celular
    
        if(!nome) {
            return res.status(400).json({messagem: 'O nome é obrigatório'})
        }
    
        if(!materia) {
            return res.status(400).json({messagem: 'O nome da matéria é obrigatória'})
        }
    
        const professor = await Professor.create({
            nome: nome,
            materia: materia,
            celular: celular
        })
        res.status(201).json(professor)
        }catch(error){
            console.log(error)
            res.status(500).json({error: 'Não foi possível cadastrar o professor'})
        }
    })
    
    routes.get('/professores', async (req, res) => {
        const professor = await Professor.findAll()
        res.json(professor)
    })

    routes.put('/professores/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, materia, celular } = req.body;
    
            if (!nome) {
                return res.status(400).json({ mensagem: 'O nome é obrigatório' });
            }
    
            if (!materia) {
                return res.status(400).json({ mensagem: 'O nome da matéria é obrigatória' });
            }
    
            const professor = await Professor.findByIdAndUpdate(id, {
                nome: nome,
                materia: materia,
                celular: celular
            }, { new: true });
    
            if (!professor) {
                return res.status(404).json({ mensagem: 'Professor não encontrado' });
            }
    
            res.status(200).json(professor);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Não foi possível atualizar o professor' });
        }
    });
    
    routes.delete('/professores/:id', (req, res) => {
        const id =  req.params.id
    
        Professor.destroy({
            where: {
                id: id
            }
        })
        res.status(204).json({})
    })



module.exports = routes
