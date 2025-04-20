// admin/admin.js
const apiUrl = 'http://localhost:3000/api/laptops';
const form = document.getElementById('laptopForm');
const table = document.getElementById('laptopTable');

async function loadLaptops() {
  const res = await fetch(apiUrl);
  const laptops = await res.json();
  table.innerHTML = '';

  laptops.forEach(laptop => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${laptop.image}" alt="laptop" /></td>
    <td>${laptop.id}</td>
      <td>${laptop.brand}</td>
      <td>${laptop.model}</td>
      <td>${laptop.price}</td>
      <td>${laptop.processor}</td>
      <td>${laptop.ram}</td>
      <td>${laptop.storage}</td>
      <td>${laptop.display}</td>
      <td>${laptop.os}</td>
      <td>${laptop.graphics}</td>
      <td><button onclick="deleteLaptop(${laptop.id})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const laptop = {
    id: document.getElementById('id').value,

    brand: document.getElementById('brand').value,
    model: document.getElementById('model').value,
    price: document.getElementById('price').value,
    processor: document.getElementById('processor').value,
    ram: document.getElementById('ram').value,
    storage: document.getElementById('storage').value,
    display: document.getElementById('display').value,
    image: document.getElementById('image').value,
    os: document.getElementById('os').value,
    graphics: document.getElementById('graphics').value
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(laptop)
  });

  if (res.ok) {
    form.reset();
    loadLaptops();
  }
});

async function deleteLaptop(id) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    loadLaptops();
  }
}

loadLaptops();
