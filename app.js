const creativeVideos = {
  'creatives-expedition': [
    ['hs_video17838v3', '_9kakYwymZo'],
    ['hs_video17708v3', 'B5ZXnjBhyAg'],
    ['hs_video16223v6', 'aFZftJ93dzo'],
    ['hs_video17891v3', 'BBDOjwaeZTg'],
    ['hs_video17523v3', 'sMmxA_DfdCk'],
    ['hs_video18776v3', 'jbuvl3rbgTM'],
    ['hs_video18510v3', 'sXO-8y_ICuk'],
    ['hs_video17923v3', 'fDMAxPeLzBA'],
    ['hs_video17618v3', 'q_dFwg7SPa0'],
    ['hs_video17462v3', 'whoAd1LpTBY'],
    ['hs_video17643v3', 'd4JjX_1cGG8']
  ],
  'creatives-orders': [
    ['hs_video18713v3', 'sGR4UA8TUjk'],
    ['hs_video18713v4', 'UPRPijcLHvg'],
    ['hs_video18713v5', 'qTcCnhdnHNA'],
    ['hs_video18673v3', 'qux--DL68Oo'],
    ['hs_video18714v3', 'Mf2LTnqSEIc'],
    ['hs_video18715v3', 'HWM8-g-d9fI'],
    ['hs_video18716v3', 'SR3WbvcEVOU'],
    ['hs_video17250v8', 'NceKFm4A9fw'],
    ['hs_video15743v5', 'Iw2X6EPCfE0']
  ],
  'creatives-freeze': [
    ['hs_video11760v3', 'xr6JaybE864'],
    ['hs_video14742v4', 'BQ5RyJLywuI']
  ]
};

const sections = [
  {
    label: 'Креативы',
    children: [
      { id: 'creatives-expedition', label: 'Экспедиция', eyebrow: 'КРЕАТИВЫ / ЭКСПЕДИЦИЯ' },
      { id: 'creatives-orders', label: 'Заказы', eyebrow: 'КРЕАТИВЫ / ЗАКАЗЫ' },
      { id: 'creatives-freeze', label: 'Замерзание', eyebrow: 'КРЕАТИВЫ / ЗАМЕРЗАНИЕ' }
    ]
  },
  {
    label: 'ASO',
    children: [
      { id: 'aso-expedition', label: 'Экспедиция', eyebrow: 'ASO / ЭКСПЕДИЦИЯ' },
      { id: 'aso-orders', label: 'Заказы', eyebrow: 'ASO / ЗАКАЗЫ' },
      { id: 'aso-freeze', label: 'Замерзание', eyebrow: 'ASO / ЗАМЕРЗАНИЕ' }
    ]
  },
  { id: 'game-title', label: 'Название игры', eyebrow: 'НАЗВАНИЕ ИГРЫ' },
  { id: 'icon-loading', label: 'Иконка и Loading screen', eyebrow: 'ИКОНКА И LOADING SCREEN' },
  { id: 'tablet-art', label: 'Иллюстрации в планшете', eyebrow: 'ИЛЛЮСТРАЦИИ В ПЛАНШЕТЕ' },
  { id: 'start-expansion', label: 'Стартовое расширение', eyebrow: 'СТАРТОВОЕ РАСШИРЕНИЕ' },
  { id: 'characters', label: 'Персонажи', eyebrow: 'ПЕРСОНАЖИ' },
  { id: 'match3', label: 'Мач-3 фоны и фишки', eyebrow: 'МАЧ-3 ФОНЫ И ФИШКИ' },
  {
    label: 'Мини-игры',
    children: [
      { id: 'minigames-launch', label: 'На старте', eyebrow: 'МИНИ-ИГРЫ / НА СТАРТЕ' },
      { id: 'minigames-flow', label: 'В потоке', eyebrow: 'МИНИ-ИГРЫ / В ПОТОКЕ' }
    ]
  }
];

const allSections = sections.flatMap(item => item.children || [item]);
const navigation = document.querySelector('#navigation');
const content = document.querySelector('#content');
const template = document.querySelector('#sectionTemplate');
const menuToggle = document.querySelector('#menuToggle');

function makeLink(item, className = 'nav-item') {
  const link = document.createElement('a');
  link.className = className;
  link.href = `#${item.id}`;
  link.dataset.section = item.id;
  link.textContent = item.label;
  return link;
}

sections.forEach((item, groupIndex) => {
  if (!item.children) {
    navigation.append(makeLink(item));
    return;
  }

  const group = document.createElement('div');
  group.className = 'nav-group';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-parent';
  button.setAttribute('aria-expanded', groupIndex === 0 ? 'true' : 'false');
  button.innerHTML = `<span class="nav-parent__label">${item.label}</span><span class="nav-parent__mark">(+)</span>`;

  const children = document.createElement('div');
  children.className = `nav-children${groupIndex === 0 ? ' is-open' : ''}`;
  const inner = document.createElement('div');
  inner.className = 'nav-children__inner';
  item.children.forEach(child => inner.append(makeLink(child)));
  children.append(inner);

  button.addEventListener('click', () => {
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(willOpen));
    children.classList.toggle('is-open', willOpen);
  });
  group.append(button, children);
  navigation.append(group);
});

function videoCard([name, youtubeId]) {
  const article = document.createElement('article');
  article.className = 'video-card';
  article.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${youtubeId}"
      title="${name}"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>`;
  return article;
}

function render(sectionId) {
  const section = allSections.find(item => item.id === sectionId) || allSections[0];
  const fragment = template.content.cloneNode(true);
  fragment.querySelector('.project__eyebrow').textContent = section.eyebrow;
  const materials = fragment.querySelector('.materials');
  const videos = creativeVideos[section.id];

  if (videos) {
    const grid = document.createElement('div');
    grid.className = 'video-grid';
    videos.forEach(video => grid.append(videoCard(video)));
    materials.append(grid);
  }

  content.replaceChildren(fragment);
  document.querySelectorAll('[data-section]').forEach(link => link.classList.toggle('is-active', link.dataset.section === section.id));
  document.querySelectorAll('.nav-group').forEach(group => {
    const activeChild = group.querySelector(`[data-section="${section.id}"]`);
    const parent = group.querySelector('.nav-parent');
    const children = group.querySelector('.nav-children');
    if (activeChild) {
      parent.classList.add('is-active');
      parent.setAttribute('aria-expanded', 'true');
      children.classList.add('is-open');
    } else {
      parent.classList.remove('is-active');
    }
  });
  document.title = `${section.label} — Homescapes`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function route() {
  render(location.hash.replace('#', '') || allSections[0].id);
}

navigation.addEventListener('click', event => {
  if (!event.target.closest('.nav-item')) return;
  navigation.classList.remove('is-mobile-open');
  menuToggle.setAttribute('aria-expanded', 'false');
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-mobile-open', !isOpen);
});

window.addEventListener('hashchange', route);
route();
