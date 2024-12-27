-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS cubraqui;
USE cubraqui;

-- Criação da Tabela 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nomeCompleto VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela 'empresas' sem chave estrangeira inicialmente
CREATE TABLE IF NOT EXISTS empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    razaoSocial VARCHAR(255) NOT NULL,
    nomeFantasia VARCHAR(100) NOT NULL,
    emailCorporativo VARCHAR(100) NOT NULL UNIQUE,
    matricialidade ENUM('matriz', 'filial') NOT NULL,
    subordinacao INT,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Adiciona a chave estrangeira para 'subordinacao'
ALTER TABLE empresas
ADD CONSTRAINT fk_subordinacao FOREIGN KEY (subordinacao) REFERENCES empresas(id) ON DELETE SET NULL;
