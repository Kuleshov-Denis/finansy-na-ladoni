(() => {
  'use strict';

  const STORAGE = {
    transactions: 'my-finances.transactions.v1',
    accounts: 'my-finances.accounts.v1',
    budgets: 'my-finances.budgets.v1',
    goals: 'my-finances.goals.v1',
    recurring: 'my-finances.recurring.v1',
  };
  const THEME_STORAGE_KEY = 'my-finances.theme.v1';
  const MAIN_ACCOUNT_ID = 'account-main';
  const CATEGORY_DATA = {
    expense: [
      { id: 'food', name: 'Продукты', icon: '🛒', tint: '#f1f1f1', color: '#171717' },
      { id: 'transport', name: 'Транспорт', icon: '🚇', tint: '#ededed', color: '#303030' },
      { id: 'home', name: 'Дом', icon: '🏠', tint: '#e9e9e9', color: '#494949' },
      { id: 'cafe', name: 'Кафе и рестораны', icon: '☕', tint: '#f3f3f3', color: '#626262' },
      { id: 'health', name: 'Здоровье', icon: '💊', tint: '#ececec', color: '#7a7a7a' },
      { id: 'shopping', name: 'Покупки', icon: '🛍️', tint: '#f0f0f0', color: '#929292' },
      { id: 'entertainment', name: 'Развлечения', icon: '🎟️', tint: '#e8e8e8', color: '#ababab' },
      { id: 'housing', name: 'Аренда жилья', icon: '🔑', tint: '#f1f1f1', color: '#242424' },
      { id: 'utilities', name: 'Коммунальные услуги', icon: '💡', tint: '#ededed', color: '#3c3c3c' },
      { id: 'internet', name: 'Интернет', icon: '🌐', tint: '#e9e9e9', color: '#555555' },
      { id: 'phone', name: 'Мобильная связь', icon: '📱', tint: '#f3f3f3', color: '#6c6c6c' },
      { id: 'fuel', name: 'Топливо', icon: '⛽', tint: '#ececec', color: '#838383' },
      { id: 'taxi', name: 'Такси', icon: '🚕', tint: '#f0f0f0', color: '#999999' },
      { id: 'car', name: 'Автомобиль', icon: '🚘', tint: '#e8e8e8', color: '#b0b0b0' },
      { id: 'clothing', name: 'Одежда и обувь', icon: '👕', tint: '#f1f1f1', color: '#303030' },
      { id: 'beauty', name: 'Красота и уход', icon: '🧴', tint: '#ededed', color: '#494949' },
      { id: 'education', name: 'Образование', icon: '📚', tint: '#e9e9e9', color: '#626262' },
      { id: 'sport', name: 'Спорт', icon: '🏋️', tint: '#f3f3f3', color: '#7a7a7a' },
      { id: 'pets', name: 'Питомцы', icon: '🐾', tint: '#ececec', color: '#929292' },
      { id: 'children', name: 'Дети', icon: '🧸', tint: '#f0f0f0', color: '#ababab' },
      { id: 'travel', name: 'Путешествия', icon: '✈️', tint: '#e8e8e8', color: '#242424' },
      { id: 'subscriptions', name: 'Подписки', icon: '▣', tint: '#f1f1f1', color: '#3c3c3c' },
      { id: 'insurance', name: 'Страхование', icon: '🛡️', tint: '#ededed', color: '#555555' },
      { id: 'taxes', name: 'Налоги и сборы', icon: '▤', tint: '#e9e9e9', color: '#6c6c6c' },
      { id: 'loans', name: 'Кредиты и долги', icon: '↘', tint: '#f3f3f3', color: '#838383' },
      { id: 'gifts-expense', name: 'Подарки', icon: '🎁', tint: '#ececec', color: '#999999' },
      { id: 'charity', name: 'Благотворительность', icon: '♡', tint: '#f0f0f0', color: '#b0b0b0' },
      { id: 'services', name: 'Услуги и быт', icon: '🔧', tint: '#e8e8e8', color: '#303030' },
      { id: 'other-expense', name: 'Другое', icon: '•••', tint: '#ededed', color: '#494949' },
    ],
    income: [
      { id: 'salary', name: 'Зарплата', icon: '💼', tint: '#f1f1f1', color: '#171717' },
      { id: 'freelance', name: 'Подработка', icon: '💻', tint: '#ededed', color: '#303030' },
      { id: 'gift', name: 'Подарок', icon: '🎁', tint: '#e9e9e9', color: '#494949' },
      { id: 'cashback', name: 'Возврат', icon: '↩️', tint: '#f3f3f3', color: '#626262' },
      { id: 'business', name: 'Бизнес', icon: '▥', tint: '#ececec', color: '#7a7a7a' },
      { id: 'sale', name: 'Продажа вещей', icon: '◇', tint: '#f0f0f0', color: '#929292' },
      { id: 'rent-income', name: 'Сдача в аренду', icon: '⌂', tint: '#e8e8e8', color: '#ababab' },
      { id: 'interest', name: 'Проценты по вкладу', icon: '％', tint: '#f1f1f1', color: '#242424' },
      { id: 'dividends', name: 'Дивиденды', icon: '▤', tint: '#ededed', color: '#3c3c3c' },
      { id: 'investment-income', name: 'Доход от инвестиций', icon: '↗', tint: '#e9e9e9', color: '#555555' },
      { id: 'pension', name: 'Пенсия', icon: '◷', tint: '#f3f3f3', color: '#6c6c6c' },
      { id: 'benefits', name: 'Пособия и выплаты', icon: '＋', tint: '#ececec', color: '#838383' },
      { id: 'bonus', name: 'Премия', icon: '✦', tint: '#f0f0f0', color: '#999999' },
      { id: 'other-income', name: 'Другое', icon: '•••', tint: '#e8e8e8', color: '#b0b0b0' },
    ],
  };
  const ACCOUNT_TYPES = {
    card: { label: 'Банковская карта', icon: '💳' },
    cash: { label: 'Наличные', icon: '💵' },
    savings: { label: 'Накопительный счёт', icon: '🏦' },
    investment: { label: 'Инвестиционный счёт', icon: '📈' },
    goal: { label: 'Счёт цели', icon: '🎯' },
  };
  const chartColors = ['#79ab00', '#00a992', '#168ddd', '#8757e8', '#db4b97', '#73818d', '#c28300', '#2099b4'];
  const darkChartColors = ['#aaff18', '#00d9c4', '#16a6ff', '#9b6bff', '#ff66b8', '#8d9ba5', '#f4b942', '#4fd6ff'];
  const today = new Date();
  const toMonthValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const monthValue = toMonthValue(today);
  const accounts = loadAccounts();
  let transactions = loadTransactions();
  let budgets = loadBudgets();
  let goals = loadGoals();
  let recurringItems = loadRecurring();
  let selectedType = 'expense';
  let selectedTransactionId = null;
  let editingTransactionId = null;
  let editingRecurringId = null;
  let editingAccountId = null;
  let editingBudgetCategoryId = null;
  let editingGoalId = null;
  let selectedHomeAccountId = 'all';
  let hideBalance = false;
  let pendingConfirmation = null;
  let toastTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const createId = (prefix) => `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
  const formatMoney = (amount, compact = false) => new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    notation: compact && Math.abs(amount) >= 1_000_000 ? 'compact' : 'standard',
  }).format(Math.round((amount + Number.EPSILON) * 100) / 100) + ' ₽';
  const monthDate = (value) => value ? new Date(`${value}-01T12:00:00`) : new Date();
  const monthLabel = (value, year = true) => new Intl.DateTimeFormat('ru-RU', { month: 'long', ...(year ? { year: 'numeric' } : {}) }).format(monthDate(value));
  const toLocalDateValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const getCategory = (type, id) => CATEGORY_DATA[type]?.find((item) => item.id === id) || CATEGORY_DATA[type].at(-1);
  const activeChartColors = () => document.documentElement.dataset.theme === 'dark' ? darkChartColors : chartColors;
  const categoryAccent = (type, id) => {
    const categories = CATEGORY_DATA[type] || [];
    const index = categories.findIndex((item) => item.id === id);
    return activeChartColors()[Math.max(0, index) % activeChartColors().length];
  };
  const getAccount = (id) => accounts.find((item) => item.id === id) || accounts[0];
  const getAccountName = (id) => getAccount(id)?.name || 'Счёт';
  const amountForMonth = (type, month) => transactions.filter((item) => item.type === type && item.date.slice(0, 7) === month).reduce((sum, item) => sum + item.amount, 0);
  const transactionBelongsToHomeAccount = (item) => selectedHomeAccountId === 'all'
    || (item.type === 'transfer'
      ? item.fromAccountId === selectedHomeAccountId || item.toAccountId === selectedHomeAccountId
      : item.accountId === selectedHomeAccountId);
  const homeTransactions = () => transactions.filter(transactionBelongsToHomeAccount);
  const amountForHomeMonth = (type, month) => transactions
    .filter((item) => item.type === type && item.date.slice(0, 7) === month && transactionBelongsToHomeAccount(item))
    .reduce((sum, item) => sum + item.amount, 0);
  const sortedTransactions = (items = transactions) => [...items].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
  const accountBalance = (accountId) => {
    const account = getAccount(accountId);
    if (!account) return 0;
    return transactions.reduce((sum, item) => {
      if (item.type === 'transfer') {
        if (item.fromAccountId === accountId) return sum - item.amount;
        if (item.toAccountId === accountId) return sum + item.amount;
        return sum;
      }
      if (item.accountId !== accountId) return sum;
      return sum + (item.type === 'income' ? item.amount : -item.amount);
    }, Number(account.openingBalance) || 0);
  };
  const balanceTotal = () => accounts.reduce((sum, account) => sum + accountBalance(account.id), 0);
  const setMonthInputs = () => { $('#history-month').value = monthValue; $('#analytics-month').value = monthValue; };

  function readStored(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value === null ? fallback : value;
    } catch { return fallback; }
  }

  function loadAccounts() {
    const saved = readStored(STORAGE.accounts, []);
    const valid = Array.isArray(saved) ? saved.filter((item) => item && item.id && item.name).map((item) => ({
      ...item,
      type: ACCOUNT_TYPES[item.type] ? item.type : 'card',
      openingBalance: Number.isFinite(Number(item.openingBalance)) ? Number(item.openingBalance) : 0,
    })) : [];
    return valid.length ? valid : [{ id: MAIN_ACCOUNT_ID, name: 'Основной счёт', type: 'card', openingBalance: 0 }];
  }

  function loadTransactions() {
    const saved = readStored(STORAGE.transactions, []);
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) => item && ['income', 'expense', 'transfer'].includes(item.type) && Number.isFinite(Number(item.amount)) && Number(item.amount) > 0 && item.date && (item.type === 'transfer' || item.categoryId))
      .map((item) => {
        const row = { ...item, amount: Number(item.amount), createdAt: Number(item.createdAt) || Date.now() };
        const findSavedAccount = (id) => accounts.find((account) => account.id === id);
        if (row.type === 'transfer') {
          row.fromAccountId = findSavedAccount(row.fromAccountId)?.id || accounts[0].id;
          row.toAccountId = findSavedAccount(row.toAccountId)?.id || accounts.find((account) => account.id !== row.fromAccountId)?.id || accounts[0].id;
        } else {
          row.accountId = findSavedAccount(row.accountId)?.id || accounts[0].id;
        }
        return row;
      });
  }

  function loadBudgets() {
    const saved = readStored(STORAGE.budgets, []);
    return Array.isArray(saved) ? saved.filter((item) => item && CATEGORY_DATA.expense.some((category) => category.id === item.categoryId) && Number(item.amount) > 0)
      .map((item) => ({ categoryId: item.categoryId, amount: Number(item.amount) })) : [];
  }

  function loadGoals() {
    const saved = readStored(STORAGE.goals, []);
    return Array.isArray(saved) ? saved.filter((item) => item && item.id && item.name && Number(item.targetAmount) > 0)
      .map((item) => ({ ...item, targetAmount: Number(item.targetAmount) })) : [];
  }

  function loadRecurring() {
    const saved = readStored(STORAGE.recurring, []);
    return Array.isArray(saved) ? saved.filter((item) => item && item.id && ['income', 'expense'].includes(item.type) && Number(item.amount) > 0 && item.startDate)
      .map((item) => ({ ...item, amount: Number(item.amount), accountId: accounts.find((account) => account.id === item.accountId)?.id || accounts[0].id, active: item.active !== false, frequency: ['weekly', 'monthly'].includes(item.frequency) ? item.frequency : 'monthly' })) : [];
  }

  function saveStored(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { showToast('Не удалось сохранить. Проверьте свободное место в браузере.'); }
  }

  function saveTransactions() { saveStored(STORAGE.transactions, transactions); }
  function saveAccounts() { saveStored(STORAGE.accounts, accounts); }
  function saveBudgets() { saveStored(STORAGE.budgets, budgets); }
  function saveGoals() { saveStored(STORAGE.goals, goals); }
  function saveRecurring() { saveStored(STORAGE.recurring, recurringItems); }

  function applyTheme(theme, persist = true) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const toggle = $('#theme-toggle');
    toggle.setAttribute('aria-checked', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
    $('meta[name="theme-color"]').content = dark ? '#101010' : '#f4f5f3';
    if (persist) {
      try { localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light'); } catch { /* Theme still applies for this session. */ }
    }
  }

  function render() {
    $('#today-label').textContent = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(today);
    $('#balance-period').textContent = monthLabel(monthValue, false);
    const selectedAccount = selectedHomeAccountId === 'all' ? null : getAccount(selectedHomeAccountId);
    $('#balance-label').textContent = selectedAccount ? `На счёте «${selectedAccount.name}»` : 'На всех счетах';
    $('#balance-scope-caption').textContent = selectedAccount ? 'Остаток выбранного счёта' : 'Общий баланс';
    $('#total-balance').textContent = hideBalance ? '••••••' : formatMoney(selectedAccount ? accountBalance(selectedAccount.id) : balanceTotal());
    $('#toggle-balance').setAttribute('aria-label', hideBalance ? 'Показать баланс' : 'Скрыть баланс');
    renderBalanceSparkline(selectedAccount?.id || null);
    $('#month-income').textContent = formatMoney(amountForHomeMonth('income', monthValue));
    $('#month-expense').textContent = formatMoney(amountForHomeMonth('expense', monthValue));
    renderHomeAccounts();
    renderRecent();
    renderHomeCategories();
    renderHistoryAccountFilter();
    renderHistory();
    renderAnalytics();
    renderPlan();
    renderHomePlanPreview();
  }

  function renderBalanceSparkline(accountId) {
    const chart = $('#balance-sparkline');
    const line = $('.sparkline-line', chart);
    const area = $('.sparkline-area', chart);
    const chartTitle = $('#balance-sparkline-title');
    chart.hidden = hideBalance;

    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 12);
    const startKey = toLocalDateValue(startDate);
    const endKey = toLocalDateValue(endDate);
    const scopedAccounts = accountId ? accounts.filter((account) => account.id === accountId) : accounts;
    let runningBalance = scopedAccounts.reduce((sum, account) => sum + (Number(account.openingBalance) || 0), 0);
    const dailyChanges = new Map();

    const effectForScope = (item) => {
      if (item.type === 'transfer') {
        if (!accountId) return 0;
        if (item.fromAccountId === accountId) return -item.amount;
        if (item.toAccountId === accountId) return item.amount;
        return 0;
      }
      if (accountId && item.accountId !== accountId) return 0;
      return item.type === 'income' ? item.amount : -item.amount;
    };

    transactions.forEach((item) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || item.date > endKey) return;
      const change = effectForScope(item);
      if (!change) return;
      if (item.date < startKey) runningBalance += change;
      else dailyChanges.set(item.date, (dailyChanges.get(item.date) || 0) + change);
    });

    const values = [];
    for (let day = 0; day < 30; day += 1) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + day, 12);
      runningBalance += dailyChanges.get(toLocalDateValue(date)) || 0;
      values.push(runningBalance);
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const spread = maximum - minimum;
    const points = values.map((value, index) => {
      const x = 3 + index * (104 / (values.length - 1));
      const y = spread ? 48 - ((value - minimum) / spread) * 40 : 28;
      return [x, y];
    });
    const linePath = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
    line.setAttribute('d', linePath);
    area.setAttribute('d', `${linePath} L107 52 L3 52 Z`);

    const startBalance = values[0];
    const endBalance = values[values.length - 1];
    const change = endBalance - startBalance;
    const trend = change === 0 ? 'без изменений' : `${change > 0 ? 'рост' : 'снижение'} на ${formatMoney(Math.abs(change))}`;
    const scopeLabel = accountId ? `счёт «${getAccountName(accountId)}»` : 'все счета';
    const description = `Динамика баланса: ${scopeLabel}, ${trend} за последние 30 дней. Сейчас ${formatMoney(endBalance)}.`;
    chart.setAttribute('aria-label', description);
    chartTitle.textContent = description;
  }

  function emptyState(title, detail, icon = '↗') {
    return `<div class="empty-state"><span class="empty-illustration" aria-hidden="true">${icon}</span><p><strong>${title}</strong>${detail}</p></div>`;
  }

  function renderHomeAccounts() {
    const items = [{ id: 'all', name: 'Все счета', icon: '▦', balance: balanceTotal() }, ...accounts.map((account) => ({
      id: account.id,
      name: account.name,
      icon: ACCOUNT_TYPES[account.type]?.icon || '💳',
      balance: accountBalance(account.id),
    }))];
    $('#home-account-tabs').innerHTML = items.map((item) => `<button class="home-account-tab${selectedHomeAccountId === item.id ? ' is-selected' : ''}" type="button" data-home-account="${escapeHtml(item.id)}" aria-pressed="${selectedHomeAccountId === item.id}">
      <span class="home-account-tab-name"><span aria-hidden="true">${item.icon}</span><span>${escapeHtml(item.name)}</span></span>
      <span class="home-account-tab-balance">${hideBalance ? '••••••' : formatMoney(item.balance)}</span>
    </button>`).join('');
  }

  function transactionRow(item) {
    const isTransfer = item.type === 'transfer';
    const category = isTransfer ? null : getCategory(item.type, item.categoryId);
    const title = item.note?.trim() || (isTransfer ? 'Перевод между счетами' : category.name);
    const date = new Date(`${item.date}T12:00:00`);
    const dateText = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(date);
    const subText = isTransfer ? `${getAccountName(item.fromAccountId)} → ${getAccountName(item.toAccountId)} · ${dateText}` : `${category.name} · ${getAccountName(item.accountId)} · ${dateText}`;
    const icon = isTransfer ? '↔' : category.icon;
    const accent = isTransfer ? '#00d9c4' : categoryAccent(item.type, item.categoryId);
    const prefix = item.type === 'income' ? '+' : item.type === 'expense' ? '−' : '↔ ';
    return `<button class="transaction-row" type="button" data-tx-id="${escapeHtml(item.id)}">
      <span class="category-icon" style="--category-accent:${accent}" aria-hidden="true">${icon}</span>
      <span class="transaction-meta"><span class="transaction-name">${escapeHtml(title)}</span><span class="transaction-sub">${escapeHtml(subText)}</span></span>
      <span class="transaction-amount ${item.type}">${prefix}${formatMoney(item.amount)}</span>
    </button>`;
  }

  function renderRecent() {
    const current = sortedTransactions(homeTransactions()).slice(0, 4);
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
    const current = homeTransactions().filter((item) => item.date.slice(0, 7) === monthValue);
    const allExpenses = aggregateByCategory(current, 'expense');
    if (!allExpenses.length) {
      $('#home-category-list').innerHTML = emptyState('Здесь появится статистика', 'Когда добавите расходы за месяц, покажем категории.');
      return;
    }
    const visible = allExpenses.slice(0, 5);
    const rest = allExpenses.slice(5).reduce((sum, item) => sum + item.amount, 0);
    const entries = rest > 0 ? [...visible, { id: 'remaining-categories', name: 'Остальные', amount: rest }] : visible;
    const total = allExpenses.reduce((sum, item) => sum + item.amount, 0);
    let cursor = 0;
    const palette = activeChartColors();
    const slices = entries.map((item, index) => {
      const next = cursor + item.amount / total * 100;
      const slice = `${palette[index % palette.length]} ${cursor}% ${next}%`;
      cursor = next;
      return slice;
    });
    const legend = entries.map((item, index) => `<div class="home-donut-legend-row"><i style="--slice-color:${palette[index % palette.length]}" aria-hidden="true"></i><span>${escapeHtml(item.name)}</span><strong>${Math.round(item.amount / total * 100)}%</strong></div>`).join('');
    $('#home-category-list').innerHTML = `<div class="home-donut-layout"><div class="home-donut" style="background:conic-gradient(${slices.join(', ')})" role="img" aria-label="Расходы за месяц: ${formatMoney(total)}"><div class="home-donut-hole"><strong>${formatMoney(total, true)}</strong><span>в этом месяце</span></div></div><div class="home-donut-legend">${legend}</div></div>`;
  }

  function renderHistoryAccountFilter() {
    const select = $('#history-account');
    const selected = select.value || 'all';
    select.innerHTML = `<option value="all">Все счета</option>${accounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(account.name)}</option>`).join('')}`;
    select.value = accounts.some((account) => account.id === selected) ? selected : 'all';
  }

  function transactionMatchesFilters(item, query, type, accountId) {
    if (type !== 'all' && item.type !== type) return false;
    if (accountId !== 'all' && (item.type === 'transfer' ? ![item.fromAccountId, item.toAccountId].includes(accountId) : item.accountId !== accountId)) return false;
    if (!query) return true;
    const category = item.type === 'transfer' ? 'перевод перевод между счетами' : getCategory(item.type, item.categoryId).name;
    const searchable = [item.note, category, formatMoney(item.amount), getAccountName(item.accountId), getAccountName(item.fromAccountId), getAccountName(item.toAccountId)].join(' ').toLocaleLowerCase('ru-RU');
    return searchable.includes(query);
  }

  function renderHistory() {
    const value = $('#history-month').value;
    const query = $('#history-search').value.trim().toLocaleLowerCase('ru-RU');
    const type = $('#history-type').value;
    const accountId = $('#history-account').value;
    const inMonth = value ? transactions.filter((item) => item.date.slice(0, 7) === value) : transactions;
    const items = sortedTransactions(inMonth.filter((item) => transactionMatchesFilters(item, query, type, accountId)));
    const income = items.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = items.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    const scope = value ? monthLabel(value) : 'За всё время';
    $('#history-summary').innerHTML = `<span>${scope} · ${items.length} ${pluralize(items.length, 'операция', 'операции', 'операций')}</span><strong><span class="income-text">+${formatMoney(income)}</span>&nbsp;&nbsp; <span class="expense-text">−${formatMoney(expense)}</span></strong>`;
    if (!items.length) {
      const hasFilters = query || type !== 'all' || accountId !== 'all';
      $('#history-list').innerHTML = emptyState(hasFilters ? 'Ничего не найдено' : 'За этот месяц записей нет', hasFilters ? 'Измените запрос или фильтры.' : 'Добавьте операцию или выберите другой месяц.', '▦');
      return;
    }
    const groups = new Map();
    items.forEach((item) => { if (!groups.has(item.date)) groups.set(item.date, []); groups.get(item.date).push(item); });
    $('#history-list').innerHTML = [...groups.entries()].map(([date, rows]) => {
      const d = new Date(`${date}T12:00:00`);
      const total = rows.reduce((sum, item) => sum + (item.type === 'income' ? item.amount : item.type === 'expense' ? -item.amount : 0), 0);
      const label = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
      return `<section class="date-group"><div class="date-group-title"><span>${label}</span><strong>${total >= 0 ? '+' : '−'}${formatMoney(Math.abs(total))}</strong></div>${rows.map(transactionRow).join('')}</section>`;
    }).join('');
  }

  function renderAnalytics() {
    const value = $('#analytics-month').value || monthValue;
    const items = transactions.filter((item) => item.date.slice(0, 7) === value);
    const expenses = aggregateByCategory(items, 'expense');
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    const colors = activeChartColors();
    $('#analytics-period').textContent = monthLabel(value, false);
    $('#donut-total').textContent = formatMoney(total, true);
    const slices = [];
    let cursor = 0;
    expenses.forEach((item, index) => {
      const next = cursor + item.amount / (total || 1) * 100;
      slices.push(`${colors[index % colors.length]} ${cursor}% ${next}%`);
      cursor = next;
    });
    $('#expense-donut').style.background = slices.length ? `conic-gradient(${slices.join(', ')})` : 'conic-gradient(var(--chart-empty) 0 100%)';
    $('#donut-legend').innerHTML = expenses.length ? expenses.slice(0, 4).map((item, index) => `<div class="legend-item"><i class="legend-color" style="background:${colors[index % colors.length]}"></i><span class="legend-name">${escapeHtml(item.name)}</span><span class="legend-share">${Math.round(item.amount / total * 100)}%</span></div>`).join('') : '<span class="legend-item">Пока нет расходов</span>';
    $('#analytics-category-list').innerHTML = expenses.length ? expenses.map((item) => `<div class="analytics-category-row"><span class="category-icon" style="--category-accent:${categoryAccent('expense', item.id)}" aria-hidden="true">${item.icon}</span><span class="transaction-meta"><span class="transaction-name">${escapeHtml(item.name)}</span><span class="transaction-sub">${Math.round(item.amount / total * 100)}% от расходов</span></span><span class="category-amount">${formatMoney(item.amount)}</span></div>`).join('') : emptyState('Нет расходов за этот месяц', 'Диаграмма заполнится после добавления операций.', '◌');
    renderTrend();
  }

  function renderTrend() {
    const months = [];
    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1, 12);
      const key = toMonthValue(date);
      months.push({ key, date, income: amountForMonth('income', key), expense: amountForMonth('expense', key) });
    }
    const maximum = Math.max(1, ...months.flatMap((month) => [month.income, month.expense]));
    $('#trend-chart').innerHTML = months.map((item) => {
      const incomeHeight = item.income ? Math.max(4, item.income / maximum * 100) : 3;
      const expenseHeight = item.expense ? Math.max(4, item.expense / maximum * 100) : 3;
      const label = new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(item.date).replace('.', '');
      return `<div class="trend-month" title="${label}: доход ${formatMoney(item.income)}, расход ${formatMoney(item.expense)}"><div class="trend-pair"><span class="trend-bar income-bar" style="height:${incomeHeight}%"></span><span class="trend-bar expense-bar" style="height:${expenseHeight}%"></span></div><span class="trend-label">${label}</span></div>`;
    }).join('');
  }

  function categoryBudgetSpent(categoryId, month = monthValue) {
    return transactions.filter((item) => item.type === 'expense' && item.categoryId === categoryId && item.date.slice(0, 7) === month).reduce((sum, item) => sum + item.amount, 0);
  }

  function renderBudgets() {
    const list = $('#budget-list');
    if (!budgets.length) {
      list.innerHTML = emptyState('Лимиты пока не заданы', 'Выберите категорию и установите сумму на месяц.', '◌');
      return;
    }
    list.innerHTML = budgets.map((budget) => {
      const category = getCategory('expense', budget.categoryId);
      const spent = categoryBudgetSpent(budget.categoryId);
      const percent = spent / budget.amount * 100;
      const over = spent > budget.amount;
      const near = !over && percent >= 80;
      const status = over ? `Превышение ${formatMoney(spent - budget.amount)}` : near ? 'Лимит почти исчерпан' : `Осталось ${formatMoney(budget.amount - spent)}`;
      return `<article class="budget-card ${over ? 'is-over' : near ? 'is-near' : ''}">
        <div class="plan-card-heading"><span class="category-icon" style="--category-accent:${categoryAccent('expense', category.id)}" aria-hidden="true">${category.icon}</span><div class="plan-card-title"><strong>${escapeHtml(category.name)}</strong><span>${formatMoney(spent)} из ${formatMoney(budget.amount)}</span></div><div class="plan-card-actions"><button class="mini-action" type="button" data-budget-edit="${escapeHtml(budget.categoryId)}">Изменить</button><button class="mini-action remove-action" type="button" data-budget-delete="${escapeHtml(budget.categoryId)}" aria-label="Удалить лимит для категории ${escapeHtml(category.name)}">×</button></div></div>
        <div class="plan-progress"><span style="width:${Math.min(100, Math.max(0, percent))}%"></span></div>
        <p class="budget-status">${status}</p>
      </article>`;
    }).join('');
  }

  function renderGoals() {
    const list = $('#goal-list');
    if (!goals.length) {
      list.innerHTML = emptyState('Целей пока нет', 'Создайте цель и пополняйте её переводами со своих счетов.', '◎');
      return;
    }
    list.innerHTML = goals.map((goal) => {
      const saved = Math.max(0, accountBalance(goal.accountId));
      const percent = Math.min(100, saved / goal.targetAmount * 100);
      const goalDate = goal.date ? new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${goal.date}T12:00:00`)) : '';
      const detail = saved >= goal.targetAmount ? 'Цель достигнута!' : `Осталось ${formatMoney(goal.targetAmount - saved)}`;
      return `<article class="goal-card">
        <div class="goal-topline"><span class="goal-mark" aria-hidden="true">◎</span><div class="plan-card-title"><strong>${escapeHtml(goal.name)}</strong><span>${goalDate ? `Срок: ${goalDate}` : 'Накопительная цель'}</span></div><div class="plan-card-actions"><button class="mini-action" type="button" data-goal-edit="${escapeHtml(goal.id)}" aria-label="Изменить цель ${escapeHtml(goal.name)}">Изменить</button><button class="mini-action remove-action goal-delete-action" type="button" data-goal-delete="${escapeHtml(goal.id)}" aria-label="Удалить цель ${escapeHtml(goal.name)}">Удалить</button></div></div>
        <div class="goal-amounts"><strong>${formatMoney(saved)}</strong><span>из ${formatMoney(goal.targetAmount)}</span></div>
        <div class="plan-progress goal-progress"><span style="width:${Math.max(0, percent)}%"></span></div>
        <div class="goal-footer"><span>${detail}</span><button class="text-button" type="button" data-goal-topup="${escapeHtml(goal.id)}">Пополнить <span aria-hidden="true">→</span></button></div>
      </article>`;
    }).join('');
  }

  function renderAccounts() {
    $('#account-list').innerHTML = accounts.map((account) => {
      const type = ACCOUNT_TYPES[account.type] || ACCOUNT_TYPES.card;
      const goal = Boolean(account.goalId);
      const markClass = goal ? 'goal-account-mark' : account.type === 'investment' ? 'investment-account-mark' : '';
      const actions = goal ? '' : `<div class="account-actions"><button class="mini-action" type="button" data-account-edit="${escapeHtml(account.id)}">Изменить</button><button class="mini-action remove-action" type="button" data-account-delete="${escapeHtml(account.id)}" aria-label="Удалить счёт ${escapeHtml(account.name)}">×</button></div>`;
      return `<article class="account-card"><span class="account-mark ${markClass}" aria-hidden="true">${type.icon}</span><span class="account-copy"><strong>${escapeHtml(account.name)}</strong><small>${goal ? 'Цель накопления' : type.label}</small></span><strong class="account-total">${formatMoney(accountBalance(account.id))}</strong>${actions}</article>`;
    }).join('');
  }

  function renderRecurring() {
    const list = $('#recurring-list');
    if (!recurringItems.length) {
      list.innerHTML = emptyState('Регулярных операций нет', 'Добавьте повторение в форме нового дохода или расхода.', '↻');
      return;
    }
    list.innerHTML = recurringItems.map((item) => {
      const category = getCategory(item.type, item.categoryId);
      const title = item.note?.trim() || category.name;
      const frequency = item.frequency === 'weekly' ? 'Каждую неделю' : 'Каждый месяц';
      const next = item.nextDate ? new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(`${item.nextDate}T12:00:00`)) : 'при следующем открытии';
      return `<article class="recurring-card ${item.active ? '' : 'is-paused'}"><span class="recurring-mark" aria-hidden="true">↻</span><span class="recurring-copy"><strong>${escapeHtml(title)}</strong><small>${category.icon} ${escapeHtml(category.name)} · ${escapeHtml(getAccountName(item.accountId))}</small><small>${frequency} · следующая запись ${next}</small></span><span class="recurring-end"><strong class="transaction-amount ${item.type}">${item.type === 'income' ? '+' : '−'}${formatMoney(item.amount)}</strong><span class="recurring-actions"><button class="mini-action" type="button" data-recurring-edit="${escapeHtml(item.id)}">Изменить</button><button class="mini-action" type="button" data-recurring-toggle="${escapeHtml(item.id)}">${item.active ? 'Пауза' : 'Продолжить'}</button><button class="mini-action remove-action" type="button" data-recurring-remove="${escapeHtml(item.id)}" aria-label="Удалить регулярную операцию">×</button></span></span></article>`;
    }).join('');
  }

  function renderPlan() {
    renderAccounts();
    renderBudgets();
    renderGoals();
    renderRecurring();
    const budgetSelect = $('#budget-category-input');
    const previous = budgetSelect.value;
    budgetSelect.innerHTML = CATEGORY_DATA.expense.map((category) => `<option value="${category.id}">${category.icon} ${category.name}</option>`).join('');
    if (CATEGORY_DATA.expense.some((category) => category.id === previous)) budgetSelect.value = previous;
  }

  function renderHomePlanPreview() {
    const rows = [];
    budgets.slice(0, 2).forEach((budget) => {
      const category = getCategory('expense', budget.categoryId);
      const spent = categoryBudgetSpent(budget.categoryId);
      const percent = Math.min(100, Math.max(0, spent / budget.amount * 100));
      rows.push(`<div class="home-plan-row"><span class="home-plan-label">${category.icon} ${escapeHtml(category.name)}</span><span class="home-plan-meter"><i style="width:${percent}%"></i></span><strong>${formatMoney(spent, true)} / ${formatMoney(budget.amount, true)}</strong></div>`);
    });
    goals.slice(0, 2).forEach((goal) => {
      const saved = Math.max(0, accountBalance(goal.accountId));
      const percent = Math.min(100, saved / goal.targetAmount * 100);
      rows.push(`<div class="home-plan-row"><span class="home-plan-label">◎ ${escapeHtml(goal.name)}</span><span class="home-plan-meter goal-meter"><i style="width:${percent}%"></i></span><strong>${formatMoney(saved, true)} / ${formatMoney(goal.targetAmount, true)}</strong></div>`);
    });
    $('#home-plan-list').innerHTML = rows.length ? rows.join('') : emptyState('Планов пока нет', 'Задайте лимит расходов или создайте цель накопления.', '◎');
  }

  function populateCategories(type) {
    const select = $('#category-input');
    select.innerHTML = CATEGORY_DATA[type].map((item) => `<option value="${item.id}">${item.icon} ${item.name}</option>`).join('');
  }

  function populateAccountSelect(select, preferredId) {
    select.innerHTML = accounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(account.name)} · ${formatMoney(accountBalance(account.id))}</option>`).join('');
    select.value = accounts.some((account) => account.id === preferredId) ? preferredId : accounts[0].id;
  }

  function updateTransactionForm() {
    const transfer = selectedType === 'transfer';
    $$('.type-option').forEach((button) => {
      const selected = button.dataset.type === selectedType;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (!transfer) populateCategories(selectedType);
    $('#category-field').hidden = transfer;
    $('#category-input').required = !transfer;
    $('#account-field').hidden = transfer;
    $('#account-input').required = !transfer;
    $('#transfer-fields').hidden = !transfer;
    $('#from-account-input').required = transfer;
    $('#to-account-input').required = transfer;
    const recurringEdit = Boolean(editingRecurringId);
    $('#repeat-control').hidden = transfer || (Boolean(editingTransactionId) && !recurringEdit);
    $('#repeat-toggle-label').hidden = recurringEdit;
    $('#repeat-frequency-wrap').hidden = transfer || (!recurringEdit && !$('#repeat-input').checked);
    populateAccountSelect($('#account-input'), $('#account-input').value || accounts[0].id);
    populateAccountSelect($('#from-account-input'), $('#from-account-input').value || accounts[0].id);
    const destination = accounts.find((account) => account.id !== $('#from-account-input').value)?.id || accounts[0].id;
    populateAccountSelect($('#to-account-input'), $('#to-account-input').value || destination);
  }

  function restoreTransactionDialogMode() {
    editingTransactionId = null;
    editingRecurringId = null;
    $('#transaction-dialog').classList.remove('is-recurring-edit');
    $('#transfer-type-option').hidden = false;
    $('#repeat-toggle-label').hidden = false;
    $('#date-label-text').textContent = 'Дата';
    $('#add-title').textContent = 'Добавить операцию';
    $('#save-transaction').textContent = 'Сохранить операцию';
  }

  function openAdd(type = 'expense', defaults = {}) {
    restoreTransactionDialogMode();
    selectedType = ['income', 'expense', 'transfer'].includes(type) ? type : 'expense';
    $('#transaction-form').reset();
    $('#date-input').value = toLocalDateValue(new Date());
    updateTransactionForm();
    if (defaults.fromAccountId) $('#from-account-input').value = defaults.fromAccountId;
    if (defaults.toAccountId) $('#to-account-input').value = defaults.toAccountId;
    if (selectedType === 'transfer' && $('#from-account-input').value === $('#to-account-input').value) {
      $('#to-account-input').value = accounts.find((account) => account.id !== $('#from-account-input').value)?.id || accounts[0].id;
    }
    $('#transaction-dialog').showModal();
    setTimeout(() => $('#amount-input').focus(), 80);
  }

  function openGoalTopUp(goalId) {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) return;
    const source = accounts.find((account) => account.id !== goal.accountId);
    openAdd('transfer', { fromAccountId: source?.id, toAccountId: goal.accountId });
  }

  function openTransactionEditor(id) {
    const item = transactions.find((row) => row.id === id);
    if (!item) return;
    restoreTransactionDialogMode();
    editingTransactionId = id;
    selectedType = item.type;
    $('#transaction-form').reset();
    $('#amount-input').value = item.amount;
    $('#date-input').value = item.date;
    $('#note-input').value = item.note || '';
    $('#repeat-input').checked = false;
    $('#repeat-frequency-wrap').hidden = true;
    updateTransactionForm();
    if (item.type === 'transfer') {
      $('#from-account-input').value = item.fromAccountId;
      $('#to-account-input').value = item.toAccountId;
    } else {
      $('#category-input').value = item.categoryId;
      $('#account-input').value = item.accountId;
    }
    $('#add-title').textContent = 'Изменить операцию';
    $('#save-transaction').textContent = 'Сохранить изменения';
    $('#detail-dialog').close();
    $('#transaction-dialog').showModal();
  }

  function openRecurringEditor(id) {
    const item = recurringItems.find((row) => row.id === id);
    if (!item) return;
    restoreTransactionDialogMode();
    editingTransactionId = null;
    editingRecurringId = id;
    selectedType = item.type;
    $('#transaction-form').reset();
    $('#amount-input').value = item.amount;
    $('#date-input').value = item.nextDate || item.startDate || toLocalDateValue(new Date());
    $('#note-input').value = item.note || '';
    $('#repeat-input').checked = true;
    $('#transaction-dialog').classList.add('is-recurring-edit');
    $('#transfer-type-option').hidden = true;
    $('#date-label-text').textContent = 'Следующее списание';
    updateTransactionForm();
    $('#category-input').value = item.categoryId;
    $('#account-input').value = item.accountId;
    $('#repeat-frequency-input').value = item.frequency;
    $('#repeat-toggle-label').hidden = true;
    $('#repeat-frequency-wrap').hidden = false;
    $('#add-title').textContent = 'Изменить повторение';
    $('#save-transaction').textContent = 'Сохранить изменения';
    $('#transaction-dialog').showModal();
  }

  function closePlanEditors(exceptId) {
    $$('.plan-editor').forEach((editor) => { editor.open = editor.id === exceptId; });
  }

  function resetAccountEditor() {
    editingAccountId = null;
    $('#account-form').reset();
    $('#account-balance-input').value = '0';
    $('#account-editor-summary').textContent = 'Добавить счёт';
    $('#account-submit').textContent = 'Сохранить счёт';
    $('#cancel-account-edit').hidden = true;
    $('#account-editor').open = false;
  }

  function resetBudgetEditor() {
    editingBudgetCategoryId = null;
    $('#budget-form').reset();
    $('#budget-editor-summary').textContent = 'Задать или изменить лимит';
    $('#budget-submit').textContent = 'Сохранить лимит';
    $('#cancel-budget-edit').hidden = true;
    $('#budget-editor').open = false;
  }

  function openAccountEditor(id) {
    const account = accounts.find((row) => row.id === id && !row.goalId);
    if (!account) return;
    closePlanEditors('account-editor');
    editingAccountId = id;
    $('#account-name-input').value = account.name;
    $('#account-type-input').value = account.type;
    $('#account-balance-input').value = account.openingBalance;
    $('#account-editor-summary').textContent = 'Изменить счёт';
    $('#account-submit').textContent = 'Сохранить изменения';
    $('#cancel-account-edit').hidden = false;
    $('#account-editor').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetGoalEditor() {
    editingGoalId = null;
    $('#goal-form').reset();
    $('#goal-editor-summary').textContent = 'Создать цель';
    $('#goal-submit').textContent = 'Создать цель';
    $('#cancel-goal-edit').hidden = true;
    $('#goal-editor').open = false;
  }

  function openGoalEditor(id) {
    const goal = goals.find((row) => row.id === id);
    if (!goal) return;
    closePlanEditors('goal-editor');
    editingGoalId = id;
    $('#goal-name-input').value = goal.name;
    $('#goal-target-input').value = goal.targetAmount;
    $('#goal-date-input').value = goal.date || '';
    $('#goal-editor-summary').textContent = 'Изменить цель';
    $('#goal-submit').textContent = 'Сохранить изменения';
    $('#cancel-goal-edit').hidden = false;
    $('#goal-editor').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function openBudgetEditor(categoryId) {
    const budget = budgets.find((row) => row.categoryId === categoryId);
    if (!budget) return;
    closePlanEditors('budget-editor');
    editingBudgetCategoryId = categoryId;
    $('#budget-category-input').value = categoryId;
    $('#budget-amount-input').value = budget.amount;
    $('#budget-editor-summary').textContent = 'Изменить лимит';
    $('#budget-submit').textContent = 'Сохранить изменения';
    $('#cancel-budget-edit').hidden = false;
    $('#budget-editor').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function openDetails(id) {
    const item = transactions.find((row) => row.id === id);
    if (!item) return;
    selectedTransactionId = id;
    const date = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${item.date}T12:00:00`));
    if (item.type === 'transfer') {
      $('#detail-title').textContent = item.note?.trim() || 'Перевод между счетами';
      $('#detail-body').innerHTML = `<p class="detail-amount transfer">↔ ${formatMoney(item.amount)}</p><div class="detail-line"><span>Тип</span><strong>Перевод</strong></div><div class="detail-line"><span>Откуда</span><strong>${escapeHtml(getAccountName(item.fromAccountId))}</strong></div><div class="detail-line"><span>Куда</span><strong>${escapeHtml(getAccountName(item.toAccountId))}</strong></div><div class="detail-line"><span>Дата</span><strong>${date}</strong></div>${item.note?.trim() ? `<div class="detail-line"><span>Комментарий</span><strong>${escapeHtml(item.note.trim())}</strong></div>` : ''}`;
    } else {
      const category = getCategory(item.type, item.categoryId);
      const title = item.note?.trim() || category.name;
      $('#detail-title').textContent = title;
      $('#detail-body').innerHTML = `<p class="detail-amount ${item.type}">${item.type === 'income' ? '+' : '−'}${formatMoney(item.amount)}</p><div class="detail-line"><span>Тип</span><strong>${item.type === 'income' ? 'Доход' : 'Расход'}</strong></div><div class="detail-line"><span>Категория</span><strong>${category.icon} ${escapeHtml(category.name)}</strong></div><div class="detail-line"><span>Счёт</span><strong>${escapeHtml(getAccountName(item.accountId))}</strong></div><div class="detail-line"><span>Дата</span><strong>${date}</strong></div>${item.note?.trim() ? `<div class="detail-line"><span>Комментарий</span><strong>${escapeHtml(item.note.trim())}</strong></div>` : ''}`;
    }
    $('#detail-dialog').showModal();
  }

  function nextRecurringDate(dateValue, frequency, anchorDay) {
    const [year, month, day] = dateValue.split('-').map(Number);
    if (frequency === 'weekly') return toLocalDateValue(new Date(year, month - 1, day + 7, 12));
    const nextMonth = new Date(year, month, 1, 12);
    const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
    return toLocalDateValue(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), Math.min(anchorDay || day, lastDay), 12));
  }

  function materializeRecurring() {
    const currentDate = toLocalDateValue(new Date());
    let transactionChanged = false;
    let recurringChanged = false;
    recurringItems.forEach((item) => {
      if (!item.active) return;
      let nextDate = item.nextDate || nextRecurringDate(item.startDate, item.frequency, Number(item.startDate.slice(-2)));
      let count = 0;
      while (nextDate <= currentDate && count < 500) {
        const occurrence = `${item.id}:${nextDate}`;
        if (!transactions.some((transaction) => transaction.recurringOccurrence === occurrence)) {
          transactions.push({
            id: createId('tx'), type: item.type, amount: item.amount, categoryId: item.categoryId,
            accountId: item.accountId, date: nextDate, note: item.note, createdAt: Date.now(),
            recurringId: item.id, recurringOccurrence: occurrence,
          });
          transactionChanged = true;
        }
        nextDate = nextRecurringDate(nextDate, item.frequency, Number(item.startDate.slice(-2)));
        count += 1;
      }
      if (count > 0) { item.nextDate = nextDate; recurringChanged = true; }
    });
    if (transactionChanged) saveTransactions();
    if (recurringChanged) saveRecurring();
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function askConfirmation(title, message, action, confirmLabel = 'Удалить') {
    pendingConfirmation = action;
    $('#confirm-title').textContent = title;
    $('#confirm-message').textContent = message;
    $('#confirm-action').textContent = confirmLabel;
    $('#confirm-dialog').showModal();
  }

  function removeAccountData(accountId) {
    const accountIndex = accounts.findIndex((account) => account.id === accountId);
    if (accountIndex < 0) return;
    transactions = transactions.filter((item) => item.type === 'transfer'
      ? item.fromAccountId !== accountId && item.toAccountId !== accountId
      : item.accountId !== accountId);
    recurringItems = recurringItems.filter((item) => item.accountId !== accountId);
    goals = goals.filter((item) => item.accountId !== accountId);
    accounts.splice(accountIndex, 1);
    if (!accounts.length) accounts.push({ id: MAIN_ACCOUNT_ID, name: 'Основной счёт', type: 'card', openingBalance: 0 });
    if (selectedHomeAccountId === accountId) selectedHomeAccountId = 'all';
    saveTransactions(); saveRecurring(); saveGoals(); saveAccounts();
    resetAccountEditor(); resetGoalEditor();
    render();
    showToast('Счёт и связанные данные удалены');
  }

  function removeTransaction(id) {
    const before = transactions.length;
    transactions = transactions.filter((item) => item.id !== id);
    if (transactions.length === before) return;
    saveTransactions();
    selectedTransactionId = null;
    render();
    if ($('#detail-dialog').open) $('#detail-dialog').close();
    showToast('Операция удалена');
  }

  function clearAllData() {
    transactions = [];
    budgets = [];
    goals = [];
    recurringItems = [];
    accounts.splice(0, accounts.length, { id: MAIN_ACCOUNT_ID, name: 'Основной счёт', type: 'card', openingBalance: 0 });
    selectedHomeAccountId = 'all';
    selectedTransactionId = null;
    editingTransactionId = null;
    editingRecurringId = null;
    editingBudgetCategoryId = null;
    hideBalance = false;
    resetAccountEditor(); resetGoalEditor();
    resetBudgetEditor();
    saveTransactions(); saveBudgets(); saveGoals(); saveRecurring(); saveAccounts();
    render();
    goTo('home');
    showToast('Все данные удалены');
  }

  function goTo(viewName) {
    const target = ['home', 'history', 'analytics', 'plan'].includes(viewName) ? viewName : 'home';
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
    const homeAccount = event.target.closest('[data-home-account]');
    if (homeAccount) { selectedHomeAccountId = homeAccount.dataset.homeAccount; render(); return; }
    const nav = event.target.closest('[data-go]');
    if (nav) { goTo(nav.dataset.go); return; }
    const close = event.target.closest('[data-close-dialog]');
    if (close) { close.closest('dialog').close(); return; }
    const type = event.target.closest('.type-option');
    if (type) { selectedType = type.dataset.type; updateTransactionForm(); return; }
    const accountEdit = event.target.closest('[data-account-edit]');
    if (accountEdit) { openAccountEditor(accountEdit.dataset.accountEdit); return; }
    const accountDelete = event.target.closest('[data-account-delete]');
    if (accountDelete) {
      const account = accounts.find((item) => item.id === accountDelete.dataset.accountDelete);
      if (!account) return;
      const operationCount = transactions.filter((item) => item.type === 'transfer'
        ? item.fromAccountId === account.id || item.toAccountId === account.id
        : item.accountId === account.id).length;
      const repeatCount = recurringItems.filter((item) => item.accountId === account.id).length;
      const fallback = accounts.length === 1 ? ' После этого появится пустой основной счёт, чтобы приложение можно было продолжить использовать.' : '';
      const linkedOperations = pluralize(operationCount, 'связанная операция', 'связанные операции', 'связанных операций');
      const linkedRules = pluralize(repeatCount, 'правило повторения', 'правила повторения', 'правил повторения');
      askConfirmation('Удалить счёт?', `Будут удалены счёт «${account.name}», ${operationCount} ${linkedOperations} и ${repeatCount} ${linkedRules}.${fallback}`, () => removeAccountData(account.id));
      return;
    }
    const budgetEdit = event.target.closest('[data-budget-edit]');
    if (budgetEdit) { openBudgetEditor(budgetEdit.dataset.budgetEdit); return; }
    const budgetDelete = event.target.closest('[data-budget-delete]');
    if (budgetDelete) {
      const category = getCategory('expense', budgetDelete.dataset.budgetDelete);
      askConfirmation('Удалить лимит?', `Лимит для категории «${category.name}» будет удалён. Операции сохранятся.`, () => {
        budgets = budgets.filter((item) => item.categoryId !== budgetDelete.dataset.budgetDelete);
        if (editingBudgetCategoryId === budgetDelete.dataset.budgetDelete) resetBudgetEditor();
        saveBudgets(); render(); showToast('Лимит удалён');
      });
      return;
    }
    const goalEdit = event.target.closest('[data-goal-edit]');
    if (goalEdit) { openGoalEditor(goalEdit.dataset.goalEdit); return; }
    const goalDelete = event.target.closest('[data-goal-delete]');
    if (goalDelete) {
      const goal = goals.find((item) => item.id === goalDelete.dataset.goalDelete);
      if (!goal) return;
      const operationCount = transactions.filter((item) => item.type === 'transfer'
        ? item.fromAccountId === goal.accountId || item.toAccountId === goal.accountId
        : item.accountId === goal.accountId).length;
      const linkedOperations = pluralize(operationCount, 'связанная операция', 'связанные операции', 'связанных операций');
      askConfirmation('Удалить цель?', `Будут удалены цель «${goal.name}», её счёт и ${operationCount} ${linkedOperations}.`, () => {
        if (accounts.some((account) => account.id === goal.accountId)) removeAccountData(goal.accountId);
        else { goals = goals.filter((item) => item.id !== goal.id); saveGoals(); render(); showToast('Цель удалена'); }
      });
      return;
    }
    const recurringToggle = event.target.closest('[data-recurring-toggle]');
    if (recurringToggle) {
      const item = recurringItems.find((row) => row.id === recurringToggle.dataset.recurringToggle);
      if (item) { item.active = !item.active; saveRecurring(); if (item.active) materializeRecurring(); render(); }
      return;
    }
    const recurringEdit = event.target.closest('[data-recurring-edit]');
    if (recurringEdit) { openRecurringEditor(recurringEdit.dataset.recurringEdit); return; }
    const recurringRemove = event.target.closest('[data-recurring-remove]');
    if (recurringRemove) {
      const recurring = recurringItems.find((item) => item.id === recurringRemove.dataset.recurringRemove);
      if (!recurring) return;
      const category = getCategory(recurring.type, recurring.categoryId);
      askConfirmation('Удалить повторение?', `Правило «${recurring.note?.trim() || category.name}» будет удалено. Уже созданные операции сохранятся.`, () => {
        recurringItems = recurringItems.filter((item) => item.id !== recurring.id);
        saveRecurring(); render(); showToast('Повторение удалено');
      });
      return;
    }
    const goalTopUp = event.target.closest('[data-goal-topup]');
    if (goalTopUp) { openGoalTopUp(goalTopUp.dataset.goalTopup); return; }
    const transactionEdit = event.target.closest('#edit-transaction');
    if (transactionEdit) { openTransactionEditor(selectedTransactionId); return; }
    const row = event.target.closest('[data-tx-id]');
    if (row) openDetails(row.dataset.txId);
  });

  $('#transaction-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = Math.round(Number(form.get('amount')) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) { showToast('Укажите сумму больше нуля.'); return; }
    const recurringEdit = editingRecurringId ? recurringItems.find((item) => item.id === editingRecurringId) : null;
    if (recurringEdit) {
      const nextDate = String(form.get('date'));
      if (!nextDate || selectedType === 'transfer') { showToast('Проверьте дату и тип повторения.'); return; }
      recurringEdit.type = selectedType;
      recurringEdit.amount = amount;
      recurringEdit.startDate = nextDate;
      recurringEdit.nextDate = nextDate;
      recurringEdit.categoryId = String(form.get('category'));
      recurringEdit.accountId = String(form.get('account'));
      recurringEdit.note = String(form.get('note') || '').trim();
      recurringEdit.frequency = String(form.get('frequency')) === 'weekly' ? 'weekly' : 'monthly';
      saveRecurring();
      const shouldMaterialize = recurringEdit.active;
      editingRecurringId = null;
      $('#transaction-dialog').close();
      event.currentTarget.reset();
      restoreTransactionDialogMode();
      if (shouldMaterialize) materializeRecurring();
      render();
      showToast('Повторение обновлено');
      return;
    }
    const existing = editingTransactionId ? transactions.find((item) => item.id === editingTransactionId) : null;
    const transaction = {
      id: existing?.id || createId('tx'), type: selectedType, amount, date: String(form.get('date')),
      note: String(form.get('note') || '').trim(), createdAt: existing?.createdAt || Date.now(),
      ...(existing?.recurringId ? { recurringId: existing.recurringId } : {}),
      ...(existing?.recurringOccurrence ? { recurringOccurrence: existing.recurringOccurrence } : {}),
    };
    if (selectedType === 'transfer') {
      transaction.fromAccountId = String(form.get('fromAccount'));
      transaction.toAccountId = String(form.get('toAccount'));
      if (transaction.fromAccountId === transaction.toAccountId) { showToast('Выберите два разных счёта.'); return; }
    } else {
      transaction.categoryId = String(form.get('category'));
      transaction.accountId = String(form.get('account'));
    }

    let warning = '';
    if (!existing && selectedType === 'expense' && transaction.date.slice(0, 7) === monthValue) {
      const budget = budgets.find((item) => item.categoryId === transaction.categoryId);
      if (budget) {
        const before = categoryBudgetSpent(transaction.categoryId);
        if (before <= budget.amount && before + amount > budget.amount) warning = `Лимит «${getCategory('expense', transaction.categoryId).name}» превышен`;
        else if (before / budget.amount < .8 && (before + amount) / budget.amount >= .8) warning = `Вы почти достигли лимита «${getCategory('expense', transaction.categoryId).name}»`;
      }
    }

    if (!existing && selectedType !== 'transfer' && form.get('repeat')) {
      const repeatId = createId('repeat');
      const frequency = String(form.get('frequency')) === 'weekly' ? 'weekly' : 'monthly';
      const repeated = {
        id: repeatId, type: selectedType, amount, categoryId: transaction.categoryId,
        accountId: transaction.accountId, note: transaction.note, frequency, startDate: transaction.date,
        nextDate: nextRecurringDate(transaction.date, frequency, Number(transaction.date.slice(-2))), active: true,
      };
      recurringItems.push(repeated);
      transaction.recurringId = repeatId;
      transaction.recurringOccurrence = `${repeatId}:${transaction.date}`;
      saveRecurring();
    }

    if (existing) {
      const index = transactions.findIndex((item) => item.id === existing.id);
      if (index >= 0) transactions[index] = transaction;
    } else transactions.push(transaction);
    saveTransactions();
    const wasEditing = Boolean(existing);
    editingTransactionId = null;
    editingRecurringId = null;
    render();
    $('#transaction-dialog').close();
    event.currentTarget.reset();
    restoreTransactionDialogMode();
    if (wasEditing) showToast('Изменения сохранены');
    else if (warning) showToast(warning);
    else if (selectedType === 'transfer') showToast('Перевод сохранён');
    else if (form.get('repeat')) showToast(selectedType === 'income' ? 'Доход добавлен и настроено повторение' : 'Расход добавлен и настроено повторение');
    else showToast(selectedType === 'income' ? 'Доход сохранён' : 'Расход сохранён');
  });

  $('#account-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const openingBalance = Math.max(0, Math.round(Number(form.get('balance') || 0) * 100) / 100);
    if (!name) { showToast('Введите название счёта.'); return; }
    const account = editingAccountId ? accounts.find((item) => item.id === editingAccountId) : null;
    if (account) {
      account.name = name;
      account.type = String(form.get('type'));
      account.openingBalance = openingBalance;
    } else accounts.push({ id: createId('account'), name, type: String(form.get('type')), openingBalance });
    saveAccounts();
    resetAccountEditor();
    render();
    showToast(account ? 'Изменения счёта сохранены' : 'Счёт добавлен');
  });

  $('#budget-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const categoryId = String(form.get('category'));
    const amount = Math.round(Number(form.get('amount')) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) { showToast('Укажите лимит больше нуля.'); return; }
    const edited = editingBudgetCategoryId ? budgets.find((item) => item.categoryId === editingBudgetCategoryId) : null;
    const existing = budgets.find((item) => item.categoryId === categoryId && item !== edited);
    if (edited && existing) {
      existing.amount = amount;
      budgets = budgets.filter((item) => item !== edited);
    } else if (edited) {
      edited.categoryId = categoryId;
      edited.amount = amount;
    } else if (existing) existing.amount = amount;
    else budgets.push({ categoryId, amount });
    saveBudgets();
    resetBudgetEditor();
    render();
    showToast('Лимит сохранён');
  });

  $('#goal-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const targetAmount = Math.round(Number(form.get('target')) * 100) / 100;
    if (!name || !Number.isFinite(targetAmount) || targetAmount <= 0) { showToast('Введите название и сумму цели.'); return; }
    const existing = editingGoalId ? goals.find((item) => item.id === editingGoalId) : null;
    if (existing) {
      existing.name = name;
      existing.targetAmount = targetAmount;
      existing.date = String(form.get('date') || '');
      const goalAccount = accounts.find((account) => account.id === existing.accountId);
      if (goalAccount) goalAccount.name = `Цель: ${name}`;
      saveGoals(); saveAccounts();
      resetGoalEditor();
      render();
      showToast('Изменения цели сохранены');
      return;
    }
    const id = createId('goal');
    const accountId = createId('account');
    goals.push({ id, name, targetAmount, accountId, date: String(form.get('date') || '') });
    accounts.push({ id: accountId, name: `Цель: ${name}`, type: 'goal', openingBalance: 0, goalId: id });
    saveGoals(); saveAccounts();
    resetGoalEditor();
    render();
    showToast('Цель создана — пополните её переводом со счёта');
  });

  $('#delete-transaction').addEventListener('click', () => {
    const item = transactions.find((row) => row.id === selectedTransactionId);
    if (!item) return;
    const title = item.note?.trim() || (item.type === 'transfer' ? 'Перевод между счетами' : getCategory(item.type, item.categoryId).name);
    askConfirmation('Удалить операцию?', `Запись «${title}» будет удалена. Баланс и статистика пересчитаются.`, () => removeTransaction(item.id));
  });

  $('#confirm-action').addEventListener('click', () => {
    const action = pendingConfirmation;
    pendingConfirmation = null;
    $('#confirm-dialog').close();
    if (action) action();
  });
  $('#cancel-confirmation').addEventListener('click', () => {
    pendingConfirmation = null;
    $('#confirm-dialog').close();
  });
  $('#confirm-dialog').addEventListener('close', () => { pendingConfirmation = null; });
  $('#cancel-account-edit').addEventListener('click', resetAccountEditor);
  $('#cancel-budget-edit').addEventListener('click', resetBudgetEditor);
  $('#cancel-goal-edit').addEventListener('click', resetGoalEditor);
  $('#reset-all-data').addEventListener('click', () => askConfirmation(
    'Удалить все данные?',
    'Будут очищены счета, операции, лимиты, цели и правила повторений в этом браузере. Для новых записей приложение создаст пустой основной счёт. Восстановить данные будет нельзя.',
    clearAllData,
  ));

  $('#toggle-balance').addEventListener('click', () => { hideBalance = !hideBalance; render(); });
  $('#theme-toggle').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    render();
  });
  $('#history-month').addEventListener('change', renderHistory);
  $('#history-search').addEventListener('input', renderHistory);
  $('#history-type').addEventListener('change', renderHistory);
  $('#history-account').addEventListener('change', renderHistory);
  $('#analytics-month').addEventListener('change', renderAnalytics);
  $('#history-all').addEventListener('click', () => { $('#history-month').value = ''; renderHistory(); });
  $('#repeat-input').addEventListener('change', () => { $('#repeat-frequency-wrap').hidden = !$('#repeat-input').checked; });
  $('#about-button').addEventListener('click', () => $('#about-dialog').showModal());
  $('#transaction-dialog').addEventListener('close', () => {
    if (editingTransactionId || editingRecurringId) restoreTransactionDialogMode();
  });
  [$('#transaction-dialog'), $('#detail-dialog'), $('#about-dialog'), $('#confirm-dialog')].forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));

  applyTheme(document.documentElement.dataset.theme || 'dark', false);
  materializeRecurring();
  setMonthInputs();
  render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
