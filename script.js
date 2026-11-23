// ===== 1. TEMA CLARO / ESCURO (lousa) =====
const temaBtn = document.getElementById('temaBtn');

function aplicarTema(escuro) {
  document.body.classList.toggle('escuro', escuro);
  temaBtn.textContent = escuro ? '☀️' : '🌙';
}

try { aplicarTema(localStorage.getItem('tema') === 'escuro'); } catch (e) {}

temaBtn.addEventListener('click', () => {
  const escuro = !document.body.classList.contains('escuro');
  aplicarTema(escuro);
  try { localStorage.setItem('tema', escuro ? 'escuro' : 'claro'); } catch (e) {}
});

// ===== 2. MENU MOBILE =====
const menuBtn = document.getElementById('menuBtn');
const menuLinks = document.getElementById('menuLinks');

menuBtn.addEventListener('click', () => {
  const aberto = menuLinks.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
});
menuLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => menuLinks.classList.remove('aberto'))
);

// ===== 3. DICAS DE EDUCADOR (botão interativo) =====
const dicas = [
  '“Ensinar não é transferir conhecimento.” — Paulo Freire',
  'Toda criança aprende de um jeito: observe antes de ensinar.',
  'Brincar também é aprender.',
  'Um elogio sincero pode mudar o dia de um aluno.',
  'Errar faz parte do aprendizado!',
  'Ouvir é a primeira habilidade de um bom professor.'
];
let ultima = -1;

document.getElementById('dicaBtn').addEventListener('click', () => {
  let n;
  do { n = Math.floor(Math.random() * dicas.length); } while (n === ultima);
  ultima = n;
  document.getElementById('dicaTexto').textContent = dicas[n];
});

// ===== 4. LINHA DO TEMPO EXPANSÍVEL =====
document.querySelectorAll('.etapa-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const etapa = btn.parentElement;
    const aberta = etapa.classList.toggle('aberta');
    btn.setAttribute('aria-expanded', aberta);
  });
});

// ===== 5. CARTÕES QUE VIRAM =====
document.querySelectorAll('.cartao').forEach(c => {
  const virar = () => {
    const virado = c.classList.toggle('virado');
    c.setAttribute('aria-pressed', virado);
  };
  c.addEventListener('click', virar);
  c.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); virar(); }
  });
});

// ===== 6. ABAS =====
document.querySelectorAll('.aba').forEach(aba => {
  aba.addEventListener('click', () => {
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    document.querySelectorAll('.aba-painel').forEach(p => p.classList.remove('mostrar'));
    aba.classList.add('ativa');
    document.getElementById(aba.dataset.alvo).classList.add('mostrar');
  });
});

// ===== 7. ANIMAÇÕES AO ROLAR (barras + revelar) =====
document.querySelectorAll('.secao > *, .hero-texto').forEach(el => el.classList.add('revelar'));

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visivel');
    e.target.querySelectorAll?.('.barra').forEach(b => {
      b.querySelector('.preenche').style.width = b.dataset.valor + '%';
    });
    if (e.target.classList.contains('barras')) {
      e.target.querySelectorAll('.barra').forEach(b => {
        b.querySelector('.preenche').style.width = b.dataset.valor + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.revelar, .barras').forEach(el => observador.observe(el));

// ===== 8. LINK ATIVO NO MENU =====
const secoes = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
  let atual = '';
  secoes.forEach(s => { if (window.scrollY >= s.offsetTop - 120) atual = s.id; });
  document.querySelectorAll('.menu-links a').forEach(a =>
    a.classList.toggle('ativo', a.getAttribute('href') === '#' + atual)
  );
});
