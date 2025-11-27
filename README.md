# README

**Autores:**
- Guilherme dos Anjos Silva – Matrícula: 25173685
- João Vitor Colleto de Souza - Matrícula: 25173644

## 1. Configuração Prévia do Ambiente

Antes de iniciar as aplicações, é obrigatório configurar o banco de dados e obter os arquivos do projeto.

### 1.1. Criação do Banco de Dados (MySQL Workbench)

O banco de dados da aplicação deve ser criado e configurado no MySQL Workbench, na ordem que está definida:
```sql
-- 1. Criar o banco de dados
CREATE DATABASE aulajdbc;

-- 2. Selecionar o banco
USE aulajdbc;

-- 3. Criar tabela de categorias
CREATE TABLE categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- 4. Criar tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL,
    id_categoria BIGINT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);
```

> **Nota:** O banco estará vazio, pois os dados serão adicionados durante a utilização da aplicação.

### 1.2. Clonagem do Repositório

Obtenha o código-fonte do projeto clonando o repositório no local desejado.

1. **Abrir o Terminal/Prompt:** Navegue até a pasta onde deseja salvar o projeto
2. **Clonar:** Execute o comando de clonagem:
```bash
git clone [URL_DO_REPOSITORIO]
```

## 2. Instruções de Execução do Back-End (Java Spark)

A aplicação Back-End deve ser iniciada primeiro, pois o Front-End depende dela para comunicação via API.

1. **Acessar a Pasta Back-End:** No VS Code, abra o explorador de arquivos e navegue para a pasta que contém o código Java (`appFrontend`)
2. **Abrir em Nova Janela:** Clique com o botão direito na pasta do Back-End e selecione "Abrir em nova janela" (ou use `File > New Window` no VS Code e abra a pasta do Back-End)

### 2.1. Resolução de Dependências (Caso de erro dos Sparks)

Se a aplicação não reconhecer as bibliotecas do Spark, siga estes passos:

1. **Verificar Dependências:** No canto inferior esquerdo do VS Code, localize o painel "Java Projects" ou "Maven"
2. **Importar Bibliotecas:** Se houver erros ou dependências faltando:
   - No painel de projetos Java, clique no ícone `+` (Adicionar Dependência)
   - Navegue até a pasta de bibliotecas do seu projeto (geralmente `lib/` ou similar) e importe todos os arquivos `.jar` do Spark e do MySQL (ou de qualquer outro que esteja faltando)

> Este procedimento deve resolver o erro de "sparks" e garantir que todas as classes sejam reconhecidas.

### 2.2. Inicialização

1. **Localizar o Ponto de Entrada:** Abra o arquivo principal da aplicação Java (geralmente `Main.java` ou similar)
2. **Rodar a Aplicação:** Clique no botão "Run" (ou use o comando de execução Maven/Gradle, dependendo da sua configuração)
3. **Confirmação:** A aplicação estará rodando na porta configurada (4567). Verifique o console para a mensagem de sucesso de inicialização

## 3. Instruções de Execução do Front-End (React)

Com o Back-End rodando, podemos iniciar o Front-End para acessar a interface do usuário.

1. **Acessar a Pasta Front-End:** Abra uma nova janela do VS Code e navegue para a pasta Front-End (ex: `front/` ou `my-app`)
2. **Instalar Dependências:** Abra o terminal dentro desta pasta (`Terminal > New Terminal`) e execute:
```bash
npm install
```

3. **Iniciar o Servidor:** Execute:
```bash
npm start
```

4. **Acesso no Navegador:** O terminal irá exibir a URL local onde o Front-End foi iniciado (geralmente `http://localhost:3000/cadastrar`). Abra seu navegador e acesse o endereço fornecido para utilizar a aplicação.
