const entradaTexto = document.querySelector('#text-input');
const botaoCriptografar = document.querySelector('#encrypt-button');
const botaoDescriptografar = document.querySelector('#decrypt-button');
const secaoTextoFinal = document.querySelector('#final-text-section');
const mensagemSucesso = document.createElement('p');

function caesarEncrypt(input, shift) {
  return input
    .split('')
    .map(caractere => {
      if (/[a-zA-Z]/.test(caractere)) {
        const codigoBase = caractere.toLowerCase() === caractere ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const codigoChar = (caractere.charCodeAt(0) - codigoBase + shift) % 26 + codigoBase;
        return String.fromCharCode(codigoChar);
      }
      return caractere;
    })
    .join('');
}

function caesarDecrypt(input, shift) {
  return caesarEncrypt(input, 26 - shift);
}

function appendAnswer(criptographyFunction, shift) {
  const textoOriginal = entradaTexto.value;
  const textoModificado = criptographyFunction(textoOriginal, shift);
  const paragrafo = document.createElement('p');
  const botao = document.createElement('button');

  if (textoOriginal !== '') {
    secaoTextoFinal.innerHTML = '';

    paragrafo.innerHTML = textoModificado;
    paragrafo.classList.add('final-text');
    paragrafo.id = 'final-text';
    secaoTextoFinal.append(paragrafo);

    botao.addEventListener('click', () => {
      navigator.clipboard.writeText(textoModificado).then(() => {
        // O texto foi copiado com sucesso!
        mensagemSucesso.innerText = "Texto copiado!";
        secaoTextoFinal.append(mensagemSucesso); // Adiciona a mensagem de sucesso abaixo do botão

        // Faz a mensagem desaparecer após 10 segundos
        setTimeout(() => {
          mensagemSucesso.style.display = 'none';
        }, 10000);
      })
      .catch(function(error) {
        // Houve um erro ao tentar copiar o texto
        console.error('Erro ao copiar texto: ', error);
      });
    });
    botao.innerHTML = 'Copiar';
    botao.classList.add('button-white');
    secaoTextoFinal.append(botao);
  }
}

botaoCriptografar.addEventListener('click', (event) => {
  event.preventDefault();
  // Use um deslocamento de 3 para criptografia
  appendAnswer(caesarEncrypt, 3);
});

botaoDescriptografar.addEventListener('click', (event) => {
  event.preventDefault();
  // Use um deslocamento de 3 para descriptografia
  appendAnswer(caesarDecrypt, 3);
});
