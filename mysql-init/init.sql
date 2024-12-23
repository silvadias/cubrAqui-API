-- Criação do banco de dados e tabela
CREATE DATABASE IF NOT EXISTS cubraqui;

USE cubraqui;

-- Tabela de exemplo
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

-- Inserindo dados de teste
INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@example.com', 'admin123'),
('User1', 'user1@example.com', 'password1'),
('User2', 'user2@example.com', 'password2');
