'use strict';

// BANKIST APP

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-01-15T17:01:17.194Z',
    '2024-01-18T23:36:17.929Z',
    '2024-01-20T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Movement Date
const movementDate = function (date, local) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    // day/month/year
    const options = {
      day: '2-digit',
      month: '2-digit', //numeric || long || 2-digit
      year: 'numeric',
    };
    return new Intl.DateTimeFormat(local, options).format(date);
  }
};

// format currency
const formatCurrency = function (value, locale, currency) {
  const objects = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, objects).format(value);
};

// Movement functionalities
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const local = navigator.language;
    // movement date func
    const displayDate = movementDate(date, local);

    // Format amt
    const formatAmt = formatCurrency(mov, acc.locale, acc.currency);

    //Add Html to dom
    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value"> ${formatAmt}</div> 
    </div>
    `; //mov.toFixed(2)-formatAmt
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// calculate balance
const calcDisplayBalance = function (currentAccount) {
  currentAccount.balance = currentAccount.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );
  labelBalance.textContent = formatCurrency(
    currentAccount.balance,
    currentAccount.locale,
    currentAccount.currency
  );
};

// calculate summary
const calcDisplaySummary = function (currentAccount) {
  const incomes = currentAccount.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outcomes = Math.abs(
    currentAccount.movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0)
  );
  const interest = currentAccount.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currentAccount.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(
    incomes,
    currentAccount.locale,
    currentAccount.currency
  );
  labelSumOut.textContent = formatCurrency(
    outcomes,
    currentAccount.locale,
    currentAccount.currency
  );
  labelSumInterest.textContent = formatCurrency(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
  // `₹${interest.toFixed(2)}`;
};

// Create User Names
const createUserNames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

// upadte ui
const upadteUi = function (currentAccount) {
  // display movements
  displayMovements(currentAccount);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};

// logout
const logoutTimer = function () {
  // seting time
  let time = 60;
  const tic = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time == 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // timer every sec
  tic();
  const timer = setInterval(tic, 1000);
  return timer;
};

// login functions
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // display the user
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    // clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    // loose focus on input
    inputLoginPin.blur();
    // display the ui
    containerApp.style.opacity = 100;
    // Date below current balance
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: '2-digit', //numeric || long || 2-digit
      year: 'numeric', // numeric || long || 2-digit
      weekday: 'short', //narrow || short || long
    };
    const local = navigator.language; //en-IN
    // lang,options
    labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);
    // logout timer
    if (timer) clearInterval(timer);
    timer = logoutTimer();
    // Ui
    upadteUi(currentAccount);
  }
});

// transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = +inputTransferAmount.value;
  const transferTo = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amt > 0 &&
    transferTo &&
    currentAccount.balance > 0 &&
    transferTo.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amt);
    transferTo.movements.push(amt);
    currentAccount.movementsDates.push(new Date().toISOString());
    transferTo.movementsDates.push(new Date().toISOString());
    upadteUi(currentAccount);
  }
  // clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  // loose focus on input
  inputTransferAmount.blur();
  clearInterval(timer);
  timer = logoutTimer();
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = Math.floor(inputLoanAmount.value);
  if (amt > 0 && currentAccount.movements.some(mov => mov >= amt * 0.1)) {
    currentAccount.movements.push(amt);
    currentAccount.movementsDates.push(new Date().toISOString());
    upadteUi(currentAccount);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = logoutTimer();
});

// Delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const name = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  if (currentAccount.userName === name && currentAccount.pin === pin) {
    const index = accounts.findIndex(acc => acc.userName === name);
    accounts.splice(index);
  }
  // clear input fields
  inputClosePin.value = inputCloseUsername.value = '';
  // loose focus on input
  inputClosePin.blur();
  clearInterval(timer);
  timer = logoutTimer();
});

// sort button
let sorted = false; //state
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// // Fake || Experiment
// currentAccount = account1;
// upadteUi(currentAccount);
// containerApp.style.opacity = 100;

// // Date below current balance
// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
// // day/month/year
