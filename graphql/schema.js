const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Aluno {
    nome: String!
    idade: Int!
    telefone: String!
    endereco: String!
    ativo: Boolean
    id: ID
  }
  type Curso {
    nome: String!
    cargaHorario: String!
    horario: String!
    id: ID
  }
  type User {
    username: String!
    role: String!
    token: String
  }
  type Query {
    alunos: [Aluno]
    cursos: [Curso]
    login(username: String!, password: String!): User
  }
  type Mutation {
    cadastrarAluno(nome: String!, idade: Int!, telefone: String!, endereco: String!): Aluno
    excluirAluno(id: ID!): Aluno
    cadastrarCurso(nome: String!, cargaHorario: String!, horario: String!): Curso
  }
`;

module.exports = typeDefs;
