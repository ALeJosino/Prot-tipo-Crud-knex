CREATE DATABASE ifce;
use ifce;

CREATE TABLE alunos (
    id_usuario INTEGER PRIMARY KEY auto_increment,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE prioridade (
    id_prioridade INTEGER PRIMARY KEY auto_increment,
    nome_prioridade VARCHAR(45) NOT NULL
);

CREATE TABLE status (
    id INTEGER PRIMARY KEY auto_increment,
    nome_status VARCHAR(45) NOT NULL
);

CREATE TABLE chamados (
    id_chamado INTEGER PRIMARY KEY auto_increment,
    id_usuario INTEGER,
    id_problema INTEGER,
    id_prioridade INTEGER,
    localizacao VARCHAR(255),
    descricao TEXT,
    data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    aluno_id_usuario INTEGER,
    status_id_status INTEGER,
    prioridade_id_prioridade INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES alunos (id_usuario),
    FOREIGN KEY (status_id_status) REFERENCES status (id),
    FOREIGN KEY (prioridade_id_prioridade) REFERENCES prioridade (id_prioridade)
);

INSERT INTO alunos (nome, email) 
VALUES ('João Silva', 'joao.silva@example.com');

INSERT INTO prioridade (nome_prioridade) 
VALUES ('Alta');

INSERT INTO status (nome_status) 
VALUES ('Em andamento');

INSERT INTO chamados (id_usuario, id_problema, id_prioridade, localizacao, descricao, status_id_status, prioridade_id_prioridade) 
VALUES (1, 101, 1, 'Sala de Aulas', 'Computador não liga', 1, 1);

