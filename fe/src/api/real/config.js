const token = localStorage.getItem('token');
const headers = { 'Content-Type': 'application/json',  'Authorization': token };
const baseURL = 'http://localhost:5000/';
const responseType = 'json';

export async function get(path = '', data = {}) {
    const response = await fetch(`${baseURL}${path}`, {
      method: 'GET',
      headers,
      responseType,
      mode: 'cors'
    });
    return response.json();
};

export async function put(path = '', data = {}) {
    const response = await fetch(`${baseURL}${path}`, {
      method: 'PUT',
      headers,
      responseType,
      body: JSON.stringify(data),
      mode: 'cors'
    });
    return response.json();
};

export async function post(path = '', data = {}) {
    const response = await fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers,
      responseType,
      body: JSON.stringify(data),
      mode: 'cors'
    });

    return response.json();
};
