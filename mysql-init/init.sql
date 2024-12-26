-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS cubraqui;
USE cubraqui;

-- Criação da Tabela 'User'
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nomeCompleto VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de 10 Usuários de Teste

INSERT INTO usuarios (cpf, nomeCompleto, email, senha) VALUES
('12345678901', 'João Silva', 'joao@example.com', '$2a$10$K1D1iYsW2TpQ6E0PZyZ6qO7vGFY5GGjQYjr0pYhDFEj28V51Ll3wq'),
('98765432109', 'Maria Souza', 'maria@example.com', '$2a$10$5oK1A7K7kT7J.YwI9ZDm4pUSjOd6h75gY9hVAYX1bXLzaxPmz7D2m'),
('11122233344', 'Carlos Pereira', 'carlos@example.com', '$2a$10$Oe5HMEiOa6hsiFG9P0r0POfWHe9tzDpwgg8mjm8K6mh/OPvVvR/Sq'),
('55566677788', 'Ana Lima', 'ana@example.com', '$2a$10$E4JKROysSHdX44.EfCkUmA9OBflpSOYb9EzUS1NY9F5W2uYoF1yFm'),
('99988877766', 'Lucas Mendes', 'lucas@example.com', '$2a$10$Oe5HMEiOa6hsiFG9P0r0POfWHe9tzDpwgg8mjm8K6mh/OPvVvR/Sq'),
('44455566677', 'Juliana Costa', 'juliana@example.com', '$2a$10$9yE1pt0Ck0RbtRfF0IM7b0spmdFhFfs6Er/aVlfuxXgk9QwMRNYQK'),
('33322211100', 'Pedro Santos', 'pedro@example.com', '$2a$10$Oe5HMEiOa6hsiFG9P0r0POfWHe9tzDpwgg8mjm8K6mh/OPvVvR/Sq'),
('77788899911', 'Beatriz Rocha', 'beatriz@example.com', '$2a$10$vh5mtrT1kx7xS4cA3Yb/JOMtGrt0G71bbhpHtCgc2MiLfdQFeG3my'),
('00011122233', 'Fernanda Oliveira', 'fernanda@example.com', '$2a$10$0EvZB2P7mQrxP4eB2kX5POc3uOwJ5uPSaHXp0KlqFT5EdqyyXO1ae'),
('66655544433', 'Rafael Nunes', 'rafael@example.com', '$2a$10$Hg53zEyTxuDVoLplkMl5fukC6blwLlXQmePLntR2wnTlym31smHWSw');
/*
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
*/