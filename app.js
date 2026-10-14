const sections = [
  {
    label: 'Креативы',
    children: [
      { id: 'creatives-expedition', label: 'Экспедиция', title: 'Экспедиция', eyebrow: 'Креативы / Кампания 01', description: 'Рекламные видео и статичные материалы с фокусом на фермерской экспедиции.' },
      { id: 'creatives-orders', label: 'Заказы', title: 'Заказы', eyebrow: 'Креативы / Кампания 02', description: 'Материалы рекламной кампании с механикой заказов в центре истории.' },
      { id: 'creatives-freeze', label: 'Замерзание', title: 'Замерзание', eyebrow: 'Креативы / Кампания 03', description: 'Концепты с замерзанием, спасением и контрастным игровым конфликтом.' }
    ]
  },
  {
    label: 'ASO',
    children: [
      { id: 'aso-expedition', label: 'Экспедиция', title: 'ASO: Экспедиция', eyebrow: 'ASO / Кампания 01', description: 'Скриншоты и store-материалы для экспедиционного направления.' },
      { id: 'aso-orders', label: 'Заказы', title: 'ASO: Заказы', eyebrow: 'ASO / Кампания 02', description: 'Store-набор для коммуникации механики заказов.' },
      { id: 'aso-freeze', label: 'Замерзание', title: 'ASO: Замерзание', eyebrow: 'ASO / Кампания 03', description: 'Store-набор для драматической истории с замерзанием.' }
    ]
  },
  { id: 'game-title', label: 'Название игры', title: 'Название игры', eyebrow: 'Брендинг / Нейминг', description: 'Варианты названия, написания и локализации для запуска.' },
  { id: 'icon-loading', label: 'Иконка и Loading screen', title: 'Иконка & Loading', eyebrow: 'Брендинг / Ключевые экраны', description: 'Иконка приложения и загрузочный экран новой версии.' },
  { id: 'tablet-art', label: 'Иллюстрации в планшете', title: 'Иллюстрации', eyebrow: 'Продукт / Планшет', description: 'Иллюстрации и промо-композиции, показанные внутри планшета.' },
  { id: 'start-expansion', label: 'Стартовое расширение', title: 'Стартовое расширение', eyebrow: 'Продукт / Новый контент', description: 'Визуальные материалы нового стартового расширения.' },
  { id: 'characters', label: 'Персонажи', title: 'Персонажи', eyebrow: 'Арт / Персонажи', description: 'Новые персонажи, позы, эмоции и ключевые взаимодействия.' },
  { id: 'match3', label: 'Мач-3 фоны и фишки', title: 'Мач-3', eyebrow: 'Арт / Игровое поле', description: 'Фоны, фишки и элементы игрового поля для запуска.' },
  {
    label: 'Мини-игры',
    children: [
      { id: 'minigames-launch', label: 'На старте', title: 'На старте', eyebrow: 'Мини-игры / Launch', description: 'Мини-игры, подготовленные для первого дня кампании.' },
      { id: 'minigames-flow', label: 'В потоке', title: 'В потоке', eyebrow: 'Мини-игры / Flow', description: 'Материалы мини-игр для последующего потока обновлений.' }
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

function materialCard(type, title, wide = false, portrait = false) {
  const article = document.createElement(type === 'playable' ? 'a' : 'article');
  article.className = `material${wide ? ' material--wide' : ''}${portrait ? ' material--portrait' : ''}`;
  if (type === 'playable') {
    article.href = '#';
    article.addEventListener('click', event => event.preventDefault());
    article.setAttribute('aria-label', `${title}: ссылка будет добавлена позже`);
  }

  const typeLabels = { image: 'Изображение', video: 'YouTube', playable: 'Playable link' };
  const frameClass = type === 'video' ? 'placeholder placeholder--video' : type === 'playable' ? 'placeholder placeholder--playable' : 'placeholder';
  article.innerHTML = `
    <div class="material__frame">
      <div class="${frameClass}">
        ${type === 'video' ? '<span class="play-mark" aria-hidden="true"></span>' : ''}
        ${type === 'playable' ? '<span class="external-mark" aria-hidden="true">↗</span>' : ''}
        <span class="placeholder__label">${typeLabels[type].toUpperCase()} / PLACEHOLDER</span>
      </div>
    </div>
    <div class="material__meta">
      <span class="material__title">${title}</span>
      <span class="material__type">${typeLabels[type]}</span>
    </div>`;
  return article;
}

function render(sectionId) {
  const section = allSections.find(item => item.id === sectionId) || allSections[0];
  const position = allSections.indexOf(section) + 1;
  const fragment = template.content.cloneNode(true);
  fragment.querySelector('.project__eyebrow').textContent = section.eyebrow;
  fragment.querySelector('.project__title').textContent = section.title;
  fragment.querySelector('.project__index').textContent = String(position).padStart(2, '0');
  fragment.querySelector('.project__description').textContent = section.description;
  const materials = fragment.querySelector('.materials');

  if (section.id === 'creatives-expedition') {
    materials.append(
      materialCard('video', 'Launch film / 16:9', true),
      materialCard('image', 'Key visual / 01'),
      materialCard('playable', 'Playable prototype / 01'),
      materialCard('image', 'Vertical / 9:16', false, true),
      materialCard('image', 'Vertical / 9:16', false, true),
      materialCard('image', 'Vertical / 9:16', false, true)
    );
  } else {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<span>Материалы будут добавлены сюда</span><span class="empty-state__hint">IMAGE · VIDEO · LINK</span>';
    materials.append(empty);
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
  document.title = `${section.title} — Homescapes`;
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
