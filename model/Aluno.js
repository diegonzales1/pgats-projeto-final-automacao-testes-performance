class Aluno {
  constructor(id, nome, idade, telefone, endereco, ativo = true) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.telefone = telefone;
    this.endereco = endereco;
    this.ativo = ativo;
  }
}

module.exports = Aluno;
