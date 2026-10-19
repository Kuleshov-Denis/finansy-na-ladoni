(() => {
  'use strict';

  const STORAGE_KEY = 'my-finances.transactions.v1';
  const CATEGORY_DATA = {
    expense: [
      { id: 'food', name: 'Продукты', icon: '🛒', tint: '#eaf3df', color: '#6f9f55' },
      { id: 'transport', name: 'Транспорт', icon: '🚇', tint: '#e8effa', color: '#6588bc' },
      { id: 'home', name: 'Дом', icon: '🏠', tint: '#f2ebdf', color: '#ba9258' },
      { id: 'cafe', name: 'Кафе', icon: '☕', tint: '#f7eadf', color: '#cd8b57' },
      { id: 'health', name: 'Здоровье', icon: '💊', tint: '#e9f4e7', color: '#71a36c' },
      { id: 'shopping', name: 'Покупки', icon: '🛍️', tint: '#f4e9f2', color: '#ad79a2' },
      { id: 'entertainment', name: 'Развлечения', icon: '🎟️', tint: '#e9eafa', color: '#777cbc' },
      { id: 'other-expense', name: 'Другое', icon: '•••', tint: '#ecefed', color: '#8b9690' },
    ],
    income: [
      { id: 'salary', name: 'Зарплата', icon: '💼', tint: '#e5f3e9', color: '#45865d' },
      { id: 'freelance', name: 'Подработка', icon: '💻', tint: '#e8effa', color: '#6588bc' },
      { id: 'gift', name: 'Подарок', icon: '🎁', tint: '#f6eaf0', color: '#bb7293' },
      { id: 'cashback', name: 'Возврат', icon: '↩️', tint: '#f2efdf', color: '#aa9656' },
      { id: 'other-income', name: 'Другое', icon: '•••', tint: '#ecefed', color: '#8b9690' },
    ],
  };
  const chartColors = ['#34835d', '#78a979', '#df9679', '#8c9ecb', '#d5b568', '#ba82a8', '#5eafb0', '#9aa39d'];
  const today = new Date();
  const toMonthValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const monthValue = toMonthValue(today);
  let transactions = loadTransactions();
  let selectedType = 'expense';
  let selectedTransactionId = null;
  let hideBalance = false;
  let toastTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const formatMoney = (amount, compact = false) => new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    notation: compact && Math.abs(amount) >= 1_000_000 ? 'compact' : 'standard',
  }).format(Math.round((amount + Number.EPSILON) * 100) / 100) + ' ₽';
  const monthDate = (value) => value ? new Date(`${value}-01T12:00:00`) : new Date();
  const monthLabel = (value, year = true) => new Intl.DateTimeFormat('ru-RU', { month: 'long', ...(year ? { year: 'numeric' } : {}) }).format(monthDate(value));
  const toLocalDateValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const getCategory = (type, id) => CATEGORY_DATA[type]?.find((item) => item.id === id) || CATEGORY_DATA[type].at(-1);
  const amountForMonth = (type, month) => transactions.filter((item) => item.type === type && item.date.slice(0, 7) === month).reduce((sum, item) => sum + item.amount, 0);
  const sortedTransactions = (items = transactions) => [...items].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
  const balanceTotal = () => transactions.reduce((sum, item) => sum + (item.type === 'income' ? item.amount : -item.amount), 0);
  const setMonthInputs = () => { $('#history-month').value = monthValue; $('#analytics-month').value = monthValue; };

  function loadTransactions() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) => item && ['income', 'expense'].includes(item.type) && Number.isFinite(Number(item.amount)) && item.date && item.categoryId)
        .map((item) => ({ ...item, amount: Number(item.amount), createdAt: Number(item.createdAt) || Date.now() }));
    } catch { return []; }
  }

  function saveTransactions() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); }
    catch { showToast('Не удалось сохранить. Проверьте свободное место в браузере.'); }
  }

  function render() {
    $('#today-label').textContent = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(today);
    $('#balance-period').textContent = monthLabel(monthValue, false);
    $('#total-balance').textContent = hideBalance ? '••••••' : formatMoney(balanceTotal());
    $('#toggle-balance').setAttribute('aria-label', hideBalance ? 'Показать баланс' : 'Скрыть баланс');
    $('#month-income').textContent = formatMoney(amountForMonth('income', monthValue));
    $('#month-expense').textContent = formatMoney(amountForMonth('expense', monthValue));
    renderRecent();
    renderHomeCategories();
    renderHistory();
    renderAnalytics();
  }

  function emptyState(title, detail, icon = '↗') {
    return `<div class="empty-state"><span class="empty-illustration" aria-hidden="true">${icon}</span><p><strong>${title}</strong>${detail}</p></div>`;
  }

  function transactionRow(item) {
    const category = getCategory(item.type, item.categoryId);
    const title = item.note?.trim() || category.name;
    const date = new Date(`${item.date}T12:00:00`);
    const dateText = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(date);
    return `<button class="transaction-row" type="button" data-tx-id="${escapeHtml(item.id)}">
      <span class="category-icon" style="background:${category.tint}" aria-hidden="true">${category.icon}</span>
      <span class="transaction-meta"><span class="transaction-name">${escapeHtml(title)}</span><span class="transaction-sub">${escapeHtml(category.name)} · ${dateText}</span></span>
      <span class="transaction-amount ${item.type}">${item.type === 'income' ? '+' : '−'}${formatMoney(item.amount)}</span>
    </button>`;
  }

  function renderRecent() {
    const current = sortedTransactions().slice(0, 4);
    $('#recent-list').innerHTML = current.length ? current.map(transactionRow).join('') : emptyState('Пока нет операций', 'Добавьте первую запись, чтобы увидеть баланс и статистику.');
  }

  function aggregateByCategory(items, type) {
    const totals = new Map();
    items.filter((item) => item.type === type).forEach((item) => {
      const category = getCategory(type, item.categoryId);
      const current = totals.get(category.id) || { ...category, amount: 0 };
      current.amount += item.amount;
      totals.set(category.id, current);
    });
    return [...totals.values()].sort((a, b) => b.amount - a.amount);
  }

  function renderHomeCategories() {
    const current = transactions.filter((item) => item.date.slice(0, 7) === monthValue);
    const expenses = aggregateByCategory(current, 'expense').slice(0, 4);
    if (!expenses.length) {
      $('#home-category-list').innerHTML = emptyState('Здесь появится статистика', 'Когда добавите расходы за месяц, покажем категории.');
      return;
    }
    const max = expenses[0].amount;
    $('#home-category-list').innerHTML = expenses.map((item) => `<div class="category-line"><span class="category-label"><span class="mini-emoji">${item.icon}</span>${escapeHtml(item.name)}</span><span class="progress-track"><span class="progress-fill" style="width:${Math.max(3, item.amount / max * 100)}%;background:${item.color}"></span></span><span class="category-amount">${formatMoney(item.amount, true)}</span></div>`).join('');
  }

  function renderHistory() {
    const value = $('#history-month').value;
    const items = sortedTransactions(value ? transactions.filter((item) => item.date.slice(0, 7) === value) : transactions);
    const income = items.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = items.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    $('#history-summary').innerHTML = `<span>${value ? monthLabel(value) : 'За всё время'} · ${items.length} ${pluralize(items.length, 'операция', 'операции', 'операций')}</span><strong><span class="income-text">+${formatMoney(income)}</span>&nbsp;&nbsp; <span class="expense-text">−${formatMoney(expense)}</span></strong>`;
    if (!items.length) {
      $('#history-list').innerHTML = emptyState('За этот месяц записей нет', 'Добавьте операцию или выберите другой месяц.', '▦');
      return;
    }
    const groups = new Map();
    items.forEach((item) => { if (!groups.has(item.date)) groups.set(item.date, []); groups.get(item.date).push(item); });
    $('#history-list').innerHTML = [...groups.entries()].map(([date, rows]) => {
      const d = new Date(`${date}T12:00:00`);
      const total = rows.reduce((sum, item) => sum + (item.type === 'income' ? item.amount : -item.amount), 0);
      const label = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
      return `<section class="date-group"><div class="date-group-title"><span>${label}</span><strong>${total >= 0 ? '+' : '−'}${formatMoney(Math.abs(total))}</strong></div>${rows.map(transactionRow).join('')}</section>`;
    }).join('');
  }

  function renderAnalytics() {
    const value = $('#analytics-month').value || monthValue;
    const items = transactions.filter((item) => item.date.slice(0, 7) === value);
    const expenses = aggregateByCategory(items, 'expense');
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    $('#analytics-period').textContent = monthLabel(value, false);
    $('#donut-total').textContent = formatMoney(total, true);
    const slices = [];
    let cursor = 0;
    expenses.forEach((item, index) => {
      const next = cursor + item.amount / (total || 1) * 100;
      slices.push(`${chartColors[index % chartColors.length]} ${cursor}% ${next}%`);
      cursor = next;
    });
    $('#expense-donut').style.background = slices.length ? `conic-gradient(${slices.join(', ')})` : 'conic-gradient(#e9eee9 0 100%)';
    $('#donut-legend').innerHTML = expenses.length ? expenses.slice(0, 4).map((item, index) => `<div class="legend-item"><i class="legend-color" style="background:${chartColors[index % chartColors.length]}"></i><span class="legend-name">${escapeHtml(item.name)}</span><span class="legend-share">${Math.round(item.amount / total * 100)}%</span></div>`).join('') : '<span class="legend-item">Пока нет расходов</span>';
    $('#analytics-category-list').innerHTML = expenses.length ? expenses.map((item) => `<div class="analytics-category-row"><span class="category-icon" style="background:${item.tint}" aria-hidden="true">${item.icon}</span><span class="transaction-meta"><span class="transaction-name">${escapeHtml(item.name)}</span><span class="transaction-sub">${Math.round(item.amount / total * 100)}% от расходов</span></span><span class="category-amount">${formatMoney(item.amount)}</span></div>`).join('') : emptyState('Нет расходов за этот месяц', 'Диаграмма заполнится после добавления операций.', '◌');
    renderTrend();
  }

  function renderTrend() {
    const months = [];
    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1, 12);
      const key = toMonthValue(date);
      months.push({ key, date, income: amountForMonth('income', key), expense: amountForMonth('expense', key) });
    }
    const maximum = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));
    $('#trend-chart').innerHTML = months.map((item) => {
      const incomeHeight = item.income ? Math.max(4, item.income / maximum * 100) : 3;
      const expenseHeight = item.expense ? Math.max(4, item.expense / maximum * 100) : 3;
      const label = new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(item.date).replace('.', '');
      return `<div class="trend-month" title="${label}: доход ${formatMoney(item.income)}, расход ${formatMoney(item.expense)}"><div class="trend-pair"><span class="trend-bar income-bar" style="height:${incomeHeight}%"></span><span class="trend-bar expense-bar" style="height:${expenseHeight}%"></span></div><span class="trend-label">${label}</span></div>`;
    }).join('');
  }

  function populateCategories(type) {
    const select = $('#category-input');
    select.innerHTML = CATEGORY_DATA[type].map((item) => `<option value="${item.id}">${item.icon} ${item.name}</option>`).join('');
  }

  function openAdd(type = 'expense') {
    selectedType = type;
    $$('.type-option').forEach((button) => {
      const selected = button.dataset.type === type;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    populateCategories(type);
    $('#date-input').value = toLocalDateValue(new Date());
    $('#transaction-form').reset();
    $('#date-input').value = toLocalDateValue(new Date());
    populateCategories(type);
    $('#transaction-dialog').showModal();
    setTimeout(() => $('#amount-input').focus(), 80);
  }

  function openDetails(id) {
    const item = transactions.find((row) => row.id === id);
    if (!item) return;
    selectedTransactionId = id;
    const category = getCategory(item.type, item.categoryId);
    const date = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${item.date}T12:00:00`));
    const title = item.note?.trim() || category.name;
    $('#detail-title').textContent = title;
    $('#detail-body').innerHTML = `<p class="detail-amount ${item.type}">${item.type === 'income' ? '+' : '−'}${formatMoney(item.amount)}</p><div class="detail-line"><span>Тип</span><strong>${item.type === 'income' ? 'Доход' : 'Расход'}</strong></div><div class="detail-line"><span>Категория</span><strong>${category.icon} ${escapeHtml(category.name)}</strong></div><div class="detail-line"><span>Дата</span><strong>${date}</strong></div>${item.note?.trim() ? `<div class="detail-line"><span>Комментарий</span><strong>${escapeHtml(item.note.trim())}</strong></div>` : ''}`;
    $('#detail-dialog').showModal();
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  function goTo(viewName) {
    const target = ['home', 'history', 'analytics'].includes(viewName) ? viewName : 'home';
    $$('.view').forEach((view) => {
      const active = view.id === `view-${target}`;
      view.classList.toggle('is-active', active);
      view.hidden = !active;
    });
    $$('.nav-item').forEach((button) => {
      const active = button.dataset.go === target;
      button.classList.toggle('is-current', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pluralize(number, one, few, many) {
    const n = Math.abs(number) % 100;
    const last = n % 10;
    if (n > 10 && n < 20) return many;
    if (last > 1 && last < 5) return few;
    return last === 1 ? one : many;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-open-add]');
    if (add) { openAdd(add.dataset.type || 'expense'); return; }
    const nav = event.target.closest('[data-go]');
    if (nav) { goTo(nav.dataset.go); return; }
    const close = event.target.closest('[data-close-dialog]');
    if (close) { close.closest('dialog').close(); return; }
    const type = event.target.closest('.type-option');
    if (type) {
      selectedType = type.dataset.type;
      $$('.type-option').forEach((button) => { const active = button === type; button.classList.toggle('is-selected', active); button.setAttribute('aria-pressed', String(active)); });
      populateCategories(selectedType);
      return;
    }
    const row = event.target.closest('[data-tx-id]');
    if (row) openDetails(row.dataset.txId);
  });

  $('#transaction-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = Math.round(Number(form.get('amount')) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) { showToast('Укажите сумму больше нуля.'); return; }
    const transaction = {
      id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: selectedType,
      amount,
      categoryId: String(form.get('category')),
      date: String(form.get('date')),
      note: String(form.get('note') || '').trim(),
      createdAt: Date.now(),
    };
    transactions.push(transaction);
    saveTransactions();
    render();
    $('#transaction-dialog').close();
    event.currentTarget.reset();
    showToast(selectedType === 'income' ? 'Доход сохранён' : 'Расход сохранён');
  });

  $('#delete-transaction').addEventListener('click', () => {
    transactions = transactions.filter((item) => item.id !== selectedTransactionId);
    saveTransactions();
    render();
    $('#detail-dialog').close();
    showToast('Операция удалена');
  });

  $('#toggle-balance').addEventListener('click', () => { hideBalance = !hideBalance; render(); });
  $('#history-month').addEventListener('change', renderHistory);
  $('#analytics-month').addEventListener('change', () => { renderAnalytics(); });
  $('#history-all').addEventListener('click', () => { $('#history-month').value = ''; renderHistory(); });
  $('#about-button').addEventListener('click', () => $('#about-dialog').showModal());
  [$('#transaction-dialog'), $('#detail-dialog'), $('#about-dialog')].forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));

  setMonthInputs();
  render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
