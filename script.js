const QTD_ESTADOS = 4;    
const ESTADO_INICIAL = 0;  
const ESTADOS_FINAIS = [2];

const M = {};

function inicializarMatriz() {
  for (let e = 0; e < QTD_ESTADOS; e++) {
    M[e] = {};
    for (let code = 97; code <= 122; code++) { 
      const letra = String.fromCharCode(code);
      M[e][letra] = -1;
    }
  }
}

inicializarMatriz();

for (let code = 97; code <= 122; code++) {
  const letra = String.fromCharCode(code);
  if (letra === 'a') {
    M[0][letra] = 1;
  } else {
    M[0][letra] = 0;
  }
}

for (let code = 97; code <= 122; code++) {
  const letra = String.fromCharCode(code);
  if (letra === 'a') {
    M[1][letra] = 1; 
  } else if (letra === 'b') {
    M[1][letra] = 2; 
  } else {
    M[1][letra] = 0; 
  }
}

for (let code = 97; code <= 122; code++) {
  const letra = String.fromCharCode(code);
  if (letra === 'a') {
    M[2][letra] = 1;
  } else {
    M[2][letra] = 0;
  }
}

for (let code = 97; code <= 122; code++) {
  const letra = String.fromCharCode(code);
  M[3][letra] = M[0][letra];
}

let estadoAtual = ESTADO_INICIAL;
let tokenAtual = "";

const input = document.getElementById('entrada');
const logDiv = document.getElementById('log');
const btnLimpar = document.getElementById('btn-limpar');
const btnResetar = document.getElementById('btn-resetar');

function adicionarLog(texto, tipo) {
  const linha = document.createElement('div');

  if (tipo === 'ok') {
    linha.className = 'resultado-ok';
  } else if (tipo === 'erro') {
    linha.className = 'resultado-erro';
  } else {
    linha.className = 'linha-estado';
  }

  linha.textContent = texto;
  logDiv.appendChild(linha);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function ehLetraMinuscula(ch) {
  return ch >= 'a' && ch <= 'z';
}

function processarSimbolo(simbolo) {
  if (!ehLetraMinuscula(simbolo)) {
    adicionarLog(`Ignorado símbolo '${simbolo}' (fora do alfabeto 'a'..'z')`);
    return;
  }

  const novoEstado = M[estadoAtual][simbolo];

  adicionarLog(`Lido '${simbolo}' → estado ${estadoAtual} → ${novoEstado}`);

  estadoAtual = novoEstado;
  tokenAtual += simbolo;
}

function finalizarToken() {
  if (tokenAtual.length === 0) return;

  const aceito = ESTADOS_FINAIS.includes(estadoAtual);

  if (aceito) {
    adicionarLog(`Token "${tokenAtual}" RECONHECIDO no estado ${estadoAtual}`, "ok");
  } else {
    adicionarLog(`Token "${tokenAtual}" REJEITADO no estado ${estadoAtual}`, "erro");
  }

  tokenAtual = "";
  estadoAtual = ESTADO_INICIAL;
  input.value = "";
  adicionarLog("--- novo token ---");
}

function limparLog() {
  logDiv.innerHTML = "";
}

function resetarAutomato() {
  estadoAtual = ESTADO_INICIAL;
  tokenAtual = "";
  input.value = "";
  adicionarLog("Autômato resetado para o estado inicial (0).");
}

input.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    finalizarToken();
    return;
  }

  if (event.key.length === 1) {
    const simbolo = event.key.toLowerCase();
    processarSimbolo(simbolo);
  }
});

// botões
btnLimpar.addEventListener("click", limparLog);
btnResetar.addEventListener("click", resetarAutomato);

// mensagem inicial
adicionarLog("Autômato iniciado no estado 0. Digite um token e pressione ESPAÇO.");
