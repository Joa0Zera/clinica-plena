/* =========================================================
   Clínica Plena — Landing Page
   Scroll reveal, parallax, menu mobile, carrossel, contadores,
   ripple nos botões e sistema de edição (config.json)
   ========================================================= */

let configData = {};

/* ---------- Carrega config.json ---------- */
fetch('./assets/config.json')
  .then(res => res.json())
  .then(data => {
    configData = data;
    atualizarPagina();
  })
  .catch(err => console.log('Config não carregado:', err));

/* ---------- Menu mobile ---------- */
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu-principal');

menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('aberto');
  menu.classList.toggle('mobile-aberto');
});

document.querySelectorAll('#menu-principal a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('aberto');
    menu?.classList.remove('mobile-aberto');
  });
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Diferenciais check-mark draw ---------- */
const diferenciaisEls = document.querySelectorAll('.item-diferencial');
const difObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      difObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
diferenciaisEls.forEach(el => difObserver.observe(el));

/* ---------- Contadores numéricos ---------- */
const contadores = document.querySelectorAll('.contador');
const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const alvo = parseInt(el.dataset.alvo, 10);
      const sufixo = el.dataset.sufixo || '';
      let atual = 0;
      const incremento = Math.max(1, Math.ceil(alvo / 60));
      const passo = () => {
        atual += incremento;
        if (atual >= alvo) {
          el.textContent = alvo.toLocaleString('pt-BR') + sufixo;
        } else {
          el.textContent = atual.toLocaleString('pt-BR') + sufixo;
          requestAnimationFrame(passo);
        }
      };
      passo();
      contadorObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
contadores.forEach(el => contadorObserver.observe(el));

/* ---------- Parallax no hero ---------- */
const heroImg = document.querySelector('.hero-imagem-wrap img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroImg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
});

/* ---------- Header shrink ---------- */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = '0 4px 20px rgba(51,43,34,0.12)';
  } else {
    header.style.boxShadow = '0 2px 15px rgba(51,43,34,0.06)';
  }
});

/* ---------- Carrossel de depoimentos ---------- */
const track = document.querySelector('.carrossel-track');
const dotsWrap = document.querySelector('.dots');
let slideAtual = 0;
let slides = [];
let dots = [];
let autoplayInterval;

if (track) {
  slides = Array.from(track.children);
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('ativo');
    dot.addEventListener('click', () => irParaSlide(i));
    dotsWrap.appendChild(dot);
  });
  dots = Array.from(dotsWrap.children);

  function irParaSlide(i) {
    slideAtual = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${slideAtual * 100}%)`;
    dots.forEach(d => d.classList.remove('ativo'));
    dots[slideAtual].classList.add('ativo');
  }

  document.querySelector('.carrossel-btn.prev')?.addEventListener('click', () => {
    irParaSlide(slideAtual - 1);
    reiniciarAutoplay();
  });
  document.querySelector('.carrossel-btn.next')?.addEventListener('click', () => {
    irParaSlide(slideAtual + 1);
    reiniciarAutoplay();
  });

  function autoplay() {
    autoplayInterval = setInterval(() => irParaSlide(slideAtual + 1), 5000);
  }
  function reiniciarAutoplay() {
    clearInterval(autoplayInterval);
    autoplay();
  }
  autoplay();

  const carrossel = document.querySelector('.carrossel');
  carrossel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carrossel.addEventListener('mouseleave', autoplay);
}

/* ---------- Ripple effect nos botões ---------- */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ---------- Sistema de edição ---------- */
function abrirEditorModal() {
  document.getElementById('editor-modal').style.display = 'flex';
  document.getElementById('edit-titulo').value = configData.pagina?.titulo || '';
  document.getElementById('edit-subtitulo').value = configData.pagina?.subtitulo || '';
  document.getElementById('edit-telefone').value = configData.empresa?.telefone || '';
  document.getElementById('edit-endereco').value = configData.empresa?.endereco || '';
  document.getElementById('edit-instagram').value = configData.empresa?.instagram || '';
}

function fecharEditorModal() {
  document.getElementById('editor-modal').style.display = 'none';
}

function salvarEdicoes() {
  configData.pagina.titulo = document.getElementById('edit-titulo').value;
  configData.pagina.subtitulo = document.getElementById('edit-subtitulo').value;
  configData.empresa.telefone = document.getElementById('edit-telefone').value;
  configData.empresa.endereco = document.getElementById('edit-endereco').value;
  configData.empresa.instagram = document.getElementById('edit-instagram').value;

  atualizarPagina();
  salvarJSON();
  fecharEditorModal();
  alert('Alterações salvas! Download do arquivo JSON iniciado.');
}

function valorAninhado(obj, caminho) {
  return caminho.split('.').reduce((acc, chave) => (acc && acc[chave] !== undefined) ? acc[chave] : undefined, obj);
}

function atualizarPagina() {
  document.querySelectorAll('[data-edit]').forEach(el => {
    const valor = valorAninhado(configData, el.dataset.edit);
    if (valor !== undefined) el.textContent = valor;
  });
}

function salvarJSON() {
  const dataStr = JSON.stringify(configData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'config-edicoes.json';
  link.click();
}

window.abrirEditorModal = abrirEditorModal;
window.fecharEditorModal = fecharEditorModal;
window.salvarEdicoes = salvarEdicoes;
