'use strict';
// Javascript only has base 2 representation of number, other languages have base 10
// base 2 - 0 1, base 10 - 0 to 9
// it give errors like 0.1+0.2=0.30000000000004

console.log(+'1');

// parseInt('str',radix)
// In order to work the str should start with number
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('px30', 10));

// parseFloat
console.log(Number.parseFloat('2.5rem', 10));
console.log('');

// isNaN - not use
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'32ewe'));
console.log(Number.isNaN(20 / 0)); //Infinity (A special value)
console.log('');

// isFinite - use
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20sk'));
console.log(Number.isFinite(20 / 0));

// Math
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3));

console.log(Math.max(3, 4, 5, 6, 123));

console.log(Math.PI);

// random
console.log(Math.trunc(Math.random() * 10) + 1);
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
  //   0..1 -> 0..max-min ->min..(max-min+min)
};
console.log(randomInt(5, 10));

// Rounding
console.log(Math.trunc(23.234));
console.log(Math.round(23.734)); // to nearest
console.log(Math.ceil(23.4));
console.log(Math.floor('23.4')); // it does type co ersion automatically
console.log(Math.trunc(-23.234));
console.log(Math.floor(-23.234)); //true

// toFixed - Rounding decimals
// It returns an string
console.log(+(2.565).toFixed(2));
console.log(+(2.565).toFixed(0));
console.log((2.5).toFixed(3));

// _ - numeric seperator

// Bigint
console.log(typeof 43546436557576576667876776868n);
console.log(BigInt(3));

// Date
console.log(new Date());
console.log(new Date('Jan 21 2024 '));
console.log(new Date(2004, 3, 1, 5, 3, 10)); // year,month(0-based),day,hr,min,sec .
console.log(new Date(0)); //how many milli sec passed since the unix time
console.log(new Date(100000));
console.log('');

console.log(new Date(1 * 24 * 60 * 60 * 1000)); //convertion to milli sec .
console.log(new Date(86_400_000)); //value for above
console.log('');

// Date methods
const date = new Date(2004, 3, 1, 5, 3);
console.log(date.getFullYear()); //2004
console.log(date.getDate()); // 1
console.log(date.getDay()); // day of the week : 4
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.toISOString());
console.log(date.getTime()); // milli sec
console.log(Date.now()); // gives current date in millisec
console.log(new Date(1705819609813));
console.log('');

date.setFullYear(2025); // simialr other methods
console.log(date);

// Day passed
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
const d = '2024-01-15T17:01:17.194Z';
const newDate = calcDaysPassed(new Date(d), new Date());
console.log(newDate);
console.log(new Date());
console.log('');

// Number
const num = 3923920.23;
const options = {
  style: 'currency', //percent,currency,unit
  unit: 'mile-per-hour',
  currency: 'INR',
};
console.log(new Intl.NumberFormat('en-IN').format(num));
console.log(new Intl.NumberFormat(navigator.language, options).format(num));

// SetTimeout
const arr = [undefined, 'goodmorning']; //change undefine to Dhyaneh
const timer = setTimeout(
  (name = 'nithin', wish) => console.log(`Hi ${name} ${wish}`),
  4000,
  ...arr
);
if (arr.includes('Dhyanesh')) {
  clearTimeout(timer);
}

// setIntervall
// setInterval(() => console.log(new Date()), 1000);
