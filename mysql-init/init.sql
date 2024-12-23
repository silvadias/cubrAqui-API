-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS cubraqui;
USE cubraqui;

-- Criação da Tabela 'User'
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de 10 Usuários de Teste
INSERT INTO User (cpf, fullName, email, password) VALUES
('12345678901', 'João Silva', 'joao@example.com', 'hashedpassword1'),
('98765432109', 'Maria Souza', 'maria@example.com', 'hashedpassword2'),
('11122233344', 'Carlos Pereira', 'carlos@example.com', 'hashedpassword3'),
('55566677788', 'Ana Lima', 'ana@example.com', 'hashedpassword4'),
('99988877766', 'Lucas Mendes', 'lucas@example.com', 'hashedpassword5'),
('44455566677', 'Juliana Costa', 'juliana@example.com', 'hashedpassword6'),
('33322211100', 'Pedro Santos', 'pedro@example.com', 'hashedpassword7'),
('77788899911', 'Beatriz Rocha', 'beatriz@example.com', 'hashedpassword8'),
('00011122233', 'Fernanda Oliveira', 'fernanda@example.com', 'hashedpassword9'),
('66655544433', 'Rafael Nunes', 'rafael@example.com', 'hashedpassword10');
