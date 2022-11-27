/*selecionando os elementos tudo aqui em cima para depois chamar no codigo*/

/*criando variável constant para a div adress-form */
const addressForm = document.querySelector("#adress-form");
/*selecionando o input cep*/
const cepInput = document.querySelector("#cep");
/*selecionando input rua*/
const addressInput = document.querySelector("#address");
/*selecionando input cidade*/
const cidadeInput = document.querySelector("#cidade");
/*selecionando input bairro*/
const bairroIput = document.querySelector("#bairro");
/*selecionando input regiao*/
const regiaoInput = document.querySelector("#regiao");
/*OBS os outros 2 input que são do número e o complemento não precisa pq ele não vai vim da API vai ser o usúario que vai ter que digitar manualmente*/

const formInput = document.querySelectorAll("[data-input]");
/*selecionando todo input com data-input de uma só vez para fazer uma aleração em massa*/

const fadeElement = document.querySelector("#fade");             //aqui chama pra tela o fundo do loader e o loader

/*selecionando o botão de close janela modal*/
const closeBt = document.querySelector("#fx-mg");
//======================= FIM SELEÇÃO DE ELEMENOS ========================================================================







//=========================================== FUNÇÕES ====================================================================
//validação do campo CEP
//usei o keypress para pear o codigo de qualquer coisa digitado pelo teclado
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;                                         //console.log(e.keyCode); console.log(key); usei o console log para testar
    const key = String.fromCharCode(e.keyCode);
  
    //com isso em mão agora posso permitir apenas números entrando em uma condição

    if (!onlyNumbers.test(key))
    {
        e.preventDefault(); //preventDefault faz com que ele aceita só numeros e não letras
        return;
    }
    

});

//aqui uso o keyup para quando o usuario soltar a tecla pegar o cep todo

cepInput.addEventListener("keyup", (e) =>{

    const inputValue = e.target.value //pega o valor dentro de e e joga na variavel inputValue que é o cep digitado

    //check vendo se o que foi digitado pelo usuario tem a quantidade de 8 numeros

    if (inputValue.length === 8) // SE COMPRIMENTO DA VARIAVEL inputValue FOR IGUAL A 8

    {
        getAddress(inputValue) //vamos passa pra API
    }
});


// 2- função fazer a requisição na API via cep 

const getAddress = async (cep) => {

    toggleLoader();   //chama a função toggleLoader

    cepInput.blur(); //desabilita/ tira a seleção do campo cep após o usuario colocar o cep ISSO FAZ COM QUE ELE NÃO FICA MANDANDO REQUISIÇÕES PARA API

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`; //endereço da API via CEP no final /json é o tipo que arquivo que quero que é json, poderia ser xml

          const response = await fetch(apiUrl); //pegando a resposta da API 
          const data = await response.json();
          

//checando por CEP Invalidos e resetando o formulario
//só vai executar o SE quando o CEP for invalido caso contrario já vai preencher os campos
if (data.erro === true) 
{

    if(!addressInput.hasAttribute("disabled"))
    {
       toggleDisabled(); //chama a função
    }

 addressForm.reset();
 toggleLoader(); //chama a função loader
 toggleMessage("CEP inválido tente novamente!"); //chama a função para caixa de mensagem
 return;
}

if (addressInput.value == "")
{
    toggleDisabled(); //validação simples para quando os inputs for desabilitado pela primeira vez e se caso o usúario muda o cep ele não bloqueia os inputs novamente
}

//preenchendo os campos com os dados vindo da API
addressInput.value = data.logradouro;   
cidadeInput.value = data.localidade;
bairroIput.value = data.bairro;
regiaoInput.value = data.uf;


toggleLoader();    
     
};

//Função para habilitar os inputs
const toggleDisabled = () => {
    if (regiaoInput.hasAttribute("disabled")) {
        formInput.forEach((input) => {
        input.removeAttribute("disabled");
        });                                                          
    } else {
        formInput.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};
//Função pra chamar o Loader na tela 

const toggleLoader = () => {

    
    const loaderElement = document.querySelector("#loader");

      fadeElement.classList.toggle("hide");
      loaderElement.classList.toggle("hide");  //aqui que é legal o toggle faz a magica acontecer SE ELE ESTIVER SENDO EXIBIDO ELE ESCONDE SE ELE ESTIVER OCULTO ELE MOSTRA
                                             //TOGGLE FAZ COMO SE FOSSE O INVERSO 

};


// Show or hide message
const toggleMessage = (msg) => {
    const fadeElement = document.querySelector("#fade");
    const messageElement = document.querySelector("#message");
  
    const messageTextElement = document.querySelector("#message p");
  
    messageTextElement.innerText = msg;
  
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
  };





  //==================================== EVENTOS ======================================================================

  //Fechar janela modal
closeBt.addEventListener("click", () => toggleMessage()); //como o modal vai está aberto ele vai dar o toggle ai libera pra fechar
  
//Salvar endereço e posteriormente mandar para uma pagina de pagamento ou algo do tipo
addressForm.addEventListener("submit", (e) => {
    e.preventDefault(); //aqui faz com que ele não carregue uma nova página nova url

    toggleLoader(); //habilita o loader

    setTimeout(() => {

        toggleLoader(); //desativa o loader

        toggleMessage("Endereço Salvo Com Sucesso!"); //chama a função da mensagem

        addressForm.reset(); //reseta o formulario

        toggleDisabled(); //desabilita os inputs

    }, 1500); //tempo que o loader fica na tela para dar a impressão que está salvando algo no sistema
});