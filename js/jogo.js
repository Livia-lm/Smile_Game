//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Altere para o número total de cartas
const TOTAL_CARTAS = 8;
const MAX_TENTATIVAS = 5;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  //mostra o botao jogarnovamente alterando a classe css (className)
  btnJogarNovamente.className = 'visivel';
  //oculta o botao reiniciar alterando a classe css (className)
  btnReiniciar.className = 'invisivel';
}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;//variável jogar volta a ser verdadeira
  //armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  //percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    // Verifica se o id é um número entre 0 e TOTAL_CARTAS-1
    if (!isNaN(divis[i].id) && Number(divis[i].id) >= 0 && Number(divis[i].id) < TOTAL_CARTAS) {
      divis[i].className = "inicial";
      // Remove imagem se existir
      let img = divis[i].querySelector("#imagem");
      if (img) img.remove();
    }
  }

  // Remove imagem extra se existir fora das cartas
  let imagem = document.getElementById("imagem");
  if (imagem && imagem.parentNode && imagem.parentNode.id >= 0 && imagem.parentNode.id < TOTAL_CARTAS) {
    // já removido acima
  } else if (imagem) {
    imagem.remove();
  }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

}

//funçao executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  // Restaura o display padrão para não afetar outras cartas
  obj.style.display = "";
  obj.style.alignItems = "";
  obj.style.justifyContent = "";
  let imgAntiga = obj.querySelector("#imagem");
  if (imgAntiga) imgAntiga.remove();
  const img = document.createElement("img");
  img.id = "imagem";
  img.width = 100;
  img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=617214&key=b070660457dc6eef831c2c2f0bdbc273";
  img.style.display = "block";
  img.style.margin = "0 auto";
  obj.appendChild(img);
}

//função executada quando o jogador errou
function errou(obj) {
  obj.className = "errou";
  let imgAntiga = obj.querySelector("#imagem");
  if (imgAntiga) imgAntiga.remove();
  const img = document.createElement("img");
  img.id = "imagem";
  img.width = 100;
  img.src = "https://th.bing.com/th/id/OIP.Xdgu3Yyo4ykweCr_3IPAawHaGD?cb=iwc2&rs=1&pid=ImgDetMain";
  // Centraliza vertical e horizontalmente usando flexbox
  obj.style.display = "flex";
  obj.style.alignItems = "center";
  obj.style.justifyContent = "center";
  img.style.display = "block";
  img.style.margin = "0";
  obj.appendChild(img);
}

//função executada para mostrar a carta correta quando o jogador errou
function errouCerta(obj) {
  obj.className = "acertou";
  obj.style.display = "";
  obj.style.alignItems = "";
  obj.style.justifyContent = "";
  let imgAntiga = obj.querySelector("#imagem");
  if (imgAntiga) imgAntiga.remove();
  const img = document.createElement("img");
  img.id = "imagem";
  img.width = 100;
  img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=617214&key=b070660457dc6eef831c2c2f0bdbc273";
  img.style.display = "block";
  img.style.margin = "0 auto";
  obj.appendChild(img);
}

//Função que sorteia um número aleatório entre 0 e TOTAL_CARTAS-1 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas == MAX_TENTATIVAS) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
    let sorteado = Math.floor(Math.random() * TOTAL_CARTAS);
    if (obj.id == sorteado.toString()) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado.toString());
      // Só mostra a imagem na carta correta se ela não for a mesma carta clicada
      if (objSorteado !== obj) {
        errouCerta(objSorteado);
      }
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);