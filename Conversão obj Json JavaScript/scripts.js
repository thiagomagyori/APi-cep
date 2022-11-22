

/*isso é um objeto javascrip NÃO É UM JSON VALIDO*/

const obj = [{
    nome: 'Thiao',
    idade: '30',
    esta_trabalhando: false,
    detalhe_prof: {
  
      profissao: 'empresario',
      empresa: 'open Connect'
  
    },
  
    hobbies: ['Programar', 'correr', 'Assistir series']
  },
  
  {
      nome: 'joão',
      idade: '25',
      esta_trabalhando: true,
      detalhe_prof: {
    
      profissao: 'null',
      empresa: 'null'
  },
  hobbies: ['Dormi', 'Sair', 'Assistir series']
  
  
  
  }]
  
  /*Conversão de um objeto javascript para um JSON VALIDO OU VICE VERSA*/
  
  
  
  //converte um objeto de javascrip para um patrão valido json
  const jsonDate = JSON.stringify(obj)
  console.log(jsonDate)
  //nesse jeito estamos enviando para API como se fosse um post queredo inserir esse usuario o sistema
  
  
  //agora vamos converter json para objeto como se fosse um get quero trazer pra minha tela
  const objDate = JSON.parse(jsonDate)
  console.log(objDate)
  
  