'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function () {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function handleEvent() {
    resolve('Second promise was resolved');
  }

  document.addEventListener('contextmenu', handleEvent);
  document.addEventListener('click', handleEvent);
});

const thirdPromise = new Promise((resolve) => {
  const clicks = [];

  function clicker(e) {
    if (clicks.length < 2 && !clicks.includes(e.type)) {
      clicks.push(e.type);
    } else {
      clicks.length = 0;
      clicks.push(e.type);
    }

    if (clicks.length === 2) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', clicker);
  document.addEventListener('contextmenu', clicker);
});

function success(result) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<div data-qa="notification">',
  );
  document.querySelector('[data-qa="notification"]').classList.add('success');
  document.querySelector('[data-qa="notification"]').innerHTML = result;
}

function error(result) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<div data-qa="notification">',
  );
  document.querySelector('[data-qa="notification"]').classList.add('error');
  document.querySelector('[data-qa="notification"]').innerHTML = result;
}

firstPromise.then(success).catch(error);

secondPromise.then(success).catch(error);

thirdPromise.then(success).catch(error);
