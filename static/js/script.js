"use strict";
const d = document;
const exchange_endpoint = '/exchange';

const date_node = d.getElementById('select-date');
const currency_node = d.getElementById('select-currency');
const table_body = d.getElementById('exchange-table');

currency_node.addEventListener('change', handleCurrencyChange);
date_node.addEventListener('change', handleDateChange);

const requestParams = {date: null, valcode: null};

function handleCurrencyChange(e) {
    let currency = e.target.value;
    if (currency === 'All') {
        currency = null;
    }
    requestParams.valcode = currency;
    getExchanges();
}

function handleDateChange(e) {
    requestParams.date = e.target.value.split("-").join("");
    getExchanges();
}

function getExchanges() {
    post(exchange_endpoint, requestParams).then(
        renderResult
    )
}

function post(url, requestObj) {
  return new Promise(function(succeed, fail) {
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.addEventListener("load", function() {
      if (request.status < 400)
        succeed(request.responseText);
      else
        fail(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    request.send(JSON.stringify(requestObj));
  });
}

function renderResult(responseText) {
    const newData = JSON.parse(responseText);
    const fragment = d.createDocumentFragment();
    const rows = createExchengeRows(newData);
    for (let row of rows) {
        fragment.appendChild(row);
    }
    table_body.innerHTML = '';
    table_body.appendChild(fragment);
}

function createExchengeRows(exchange_array) {
    const rows = [];
    for (let exchange of exchange_array) {
        rows.push(createRow(exchange));
    }
    return rows;
}

function createRow(exchange) {
    const table_row = d.createElement('tr');
    const td_txt = d.createElement('td');
    td_txt.innerHTML = exchange.txt;
    const td_rate = d.createElement('td');
    td_rate.innerHTML = exchange.rate;
    const td_cc = d.createElement('td');
    td_cc.innerHTML = exchange.cc;
    const td_echangedate = d.createElement('td');
    td_echangedate.innerHTML = exchange.exchangedate;
    table_row.appendChild(td_txt);
    table_row.appendChild(td_rate);
    table_row.appendChild(td_cc);
    table_row.appendChild(td_echangedate);
    return table_row;
}