let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Altere para o número total de cartas
const TOTAL_CARTAS = 8;
const MAX_TENTATIVAS = 5;
const IMG_ACERTO = "https://sig.ifc.edu.br/shared/verFoto?idFoto=617214&key=b070660457dc6eef831c2c2f0bdbc273";
const IMG_ERRO = "https://th.bing.com/th/id/OIP.Xdgu3Yyo4ykweCr_3IPAawHaGD?cb=iwc2&rs=1&pid=ImgDetMain";

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Alterna a visibilidade dos botões
  btnJogarNovamente.classList.replace('invisivel', 'visivel');
  btnReiniciar.classList.replace('visivel', 'invisivel');
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  // Reseta todas as cartas
  document.querySelectorAll(`div[id]:not([id=""]):not([id^=" "])`).forEach(div => {
    const id = Number(div.id);
    if (!isNaN(id) && id >= 0 && id < TOTAL_CARTAS) {
      div.className = "inicial";
      // Remove imagem se existir
      const img = div.querySelector("#imagem");
      if (img) img.remove();
      // Reseta estilos
      div.style.display = "";
      div.style.alignItems = "";
      div.style.justifyContent = "";
    }
  });

  // Remove imagem extra se existir fora das cartas
  const imagem = document.getElementById("imagem");
  if (imagem && (!imagem.parentNode || 
      isNaN(imagem.parentNode.id) || 
      Number(imagem.parentNode.id) < 0 || 
      Number(imagem.parentNode.id) >= TOTAL_CARTAS)) {
    imagem.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função genérica para manipular cartas
function manipulaCarta(obj, tipo, centralizar = false) {
  obj.className = tipo;
  // Remove imagem existente
  const imgAntiga = obj.querySelector("#imagem");
  if (imgAntiga) imgAntiga.remove();
  
  // Cria nova imagem
  const img = document.createElement("img");
  img.id = "imagem";
  img.width = 100;
  img.src = tipo === "acertou" ? IMG_ACERTO : IMG_ERRO;
  
  // Configura estilos
  if (centralizar) {
    obj.style.display = "flex";
    obj.style.alignItems = "center";
    obj.style.justifyContent = "center";
    img.style.margin = "0";
  } else {
    obj.style.display = "";
    obj.style.alignItems = "";
    obj.style.justifyContent = "";
    img.style.margin = "0 auto";
  }
  
  img.style.display = "block";
  obj.appendChild(img);
}

// Função que sorteia um número aleatório e verifica se o jogador acertou
function verifica(obj) {
  if (!jogar) return alert('Clique em "Jogar novamente"');
  
  jogar = false;
  tentativas++;
  
  if (tentativas === MAX_TENTATIVAS) {
    btnJogarNovamente.classList.replace('visivel', 'invisivel');
    btnReiniciar.classList.replace('invisivel', 'visivel');
  }
  
  const sorteado = Math.floor(Math.random() * TOTAL_CARTAS);
  const objSorteado = document.getElementById(sorteado.toString());
  
  if (obj.id === sorteado.toString()) {
    manipulaCarta(obj, "acertou");
    acertos++;
  } else {
    manipulaCarta(obj, "errou", true);
    // Mostra a carta correta apenas se for diferente da clicada
    if (objSorteado !== obj) {
      manipulaCarta(objSorteado, "acertou");
    }
  }
  
  atualizaPlacar(acertos, tentativas);
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);