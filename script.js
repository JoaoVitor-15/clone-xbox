const slides = document.querySelectorAll(".slide");
const pontosBox = document.querySelector(".pontos");
const btnEsq = document.querySelector(".seta.esq");
const btnDir = document.querySelector(".seta.dir");
const btnPausa = document.querySelector(".pausa");

let atual = 0;
let tocando = true;
let timer = null;
const INTERVALO = 6000;

// cria os indicadores (bolinhas)
const pontos = [...slides].map((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", "Ir para o slide " + (i + 1));
  b.addEventListener("click", () => { ir(i); reiniciar(); });
  pontosBox.appendChild(b);
  return b;
});

function ir(n) {
  slides[atual].classList.remove("ativo");
  pontos[atual].classList.remove("ativo");
  atual = (n + slides.length) % slides.length;
  slides[atual].classList.add("ativo");
  pontos[atual].classList.add("ativo");
}

function iniciar() {
  parar();
  if (tocando) timer = setInterval(() => ir(atual + 1), INTERVALO);
}

function parar() {
  clearInterval(timer);
}

function reiniciar() {
  iniciar();
}

btnEsq.addEventListener("click", () => { ir(atual - 1); reiniciar(); });
btnDir.addEventListener("click", () => { ir(atual + 1); reiniciar(); });

btnPausa.addEventListener("click", () => {
  tocando = !tocando;
  btnPausa.innerHTML = tocando ? "&#10074;&#10074;" : "&#9654;";
  btnPausa.setAttribute("aria-label", tocando ? "Pausar" : "Reproduzir");
  iniciar();
});

ir(0);
iniciar();
