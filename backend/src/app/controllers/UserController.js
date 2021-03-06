const { User } = require('../models');
const aws = require('aws-sdk');
const fs  = require('fs');
const path = require('path');
const { promisify } = require('util');
const insta = this;

const s3 = new aws.S3();

//Cadastro de categoria
exports.create = (req, res) => {
    // Validate request
    const { name, idade, email, foto_key, foto_url,escolaridade } = req.body;

    if (!name) {
        res.status(422).send({
            message: "O campo nome não pode ser vazio!"
        });
        return;
    }

    if (!idade) {
        res.status(422).send({
            message: "O campo idade não pode ser vazio!"
        });
        return;
    }

    if (!email) {
        res.status(422).send({
            message: "O campo e-mail não pode ser vazio!"
        });
        return;
    }
    if (!escolaridade) {
        res.status(422).send({
            message: "O campo escolaridade não pode ser vazio!"
        });
        return;
    }

    //Objeto user
    const user = {
        name: name,
        idade: idade,
        email: email,
        foto_key: foto_key,
        foto_url:foto_url,
        escolaridade: escolaridade
    };

    //Cadastro do usuario
    User.create(user)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao cadastrar o usuario."
            });
        });
};

//update user
exports.update = async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({where:{id:id}});

    if(user.foto_key !== null && user.foto_key !== '' && (user.foto_key != req.body.foto_key)){

        if(process.env.STORAGE_TYPE === 's3'){

            s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: user.foto_key,
            }).promise();
    
        }else{
            promisify(fs.unlink)(path.resolve(__dirname,'..','..','..','uploads',user.foto_key))
        }

    }

    User.update(req.body, {
        where: { id: id }
    })
        .then(result => {

            if (result == 1) {

                res.status(200).send({
                    message: "Usuário atualizado com sucesso."
                });

            } else {
                res.status(404).send({
                    message: "Usuário não encontrado"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar o usuário"
            });
        });
};

//Lista de usuário.
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao listar o usuário."
            });
        });
};

//Buscando um usuário
exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findOne({
        where:{id:id}
    })
        .then(data => {

            if(data == null)
            {
                res.status(404).send({
                    message: "Registro não encontrado."
                });

            }else res.status(200).send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao buscar o usuário com o id=" + id
            });
        });

};


// Deleta um usuário
exports.delete = async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({where:{id:id}});

    if(user.foto_key !== null && user.foto_key !== ''){

        if(process.env.STORAGE_TYPE === 's3'){

            s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: user.foto_key,
            }).promise();
    
        }else{
            promisify(fs.unlink)(path.resolve(__dirname,'..','..','..','uploads',user.foto_key))
        }

    }
    

    User.destroy({
        where: { id: id }
    })
        .then(result => {

            if (result == 1) {

                res.status(200).send({
                    message: "Usuário deletado com sucesso!"
                });

            } else {

                res.status(404).send({
                    message: "Registro não encontrado."
                });

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível excluir o usuário com o  id=" + id
            });
        });
};