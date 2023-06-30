async function addItem() {
    try {
      const table = document.querySelector('table');
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const quantity = document.getElementById('quantity').value;
  
      const itemDetails = {
        name: name,
        description: description,
        price: price,
        quantity: quantity
      }
  
      const result = await axios.post('https://crudcrud.com/api/1ebc43627ba2458e91de7fa8def1e3c2/inventoryData', itemDetails);
      console.log(result);
      table.children[1].appendChild(showDataInTable(result.data));
  
    } catch (error) {
      console.log(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const table = document.querySelector('table');
      const result = await axios.get('https://crudcrud.com/api/1ebc43627ba2458e91de7fa8def1e3c2/inventoryData');
      console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        table.children[1].appendChild(showDataInTable(result.data[i]));
      }
  
    } catch (error) {
      console.log(error);
    }
  });
  
  function showDataInTable(detailsObj) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    tr.id=detailsObj._id;
    const th = document.createElement('th');
  
    th.setAttribute('scope', 'col');
    if (table.lastElementChild.children.length > 0) {
      th.textContent = parseInt(table.lastElementChild.lastElementChild.firstElementChild.textContent) + 1;
    } else {
      th.textContent = 1;
    }
    tr.appendChild(th);
  
    const tdName = document.createElement('td');
    tdName.textContent = detailsObj.name;
    tr.appendChild(tdName);
  
    const tdDescription = document.createElement('td');
    tdDescription.textContent = detailsObj.description;
    tr.appendChild(tdDescription);
  
    const tdPrice = document.createElement('td');
    tdPrice.textContent = detailsObj.price;
    tr.appendChild(tdPrice);
  
    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = detailsObj.quantity;
    tr.appendChild(tdQuantity);
  
    const btd1 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.textContent = 'Buy 1';
    button1.setAttribute('class', 'btn btn-success');
    button1.addEventListener('click', handleButtonClick);
    btd1.appendChild(button1);
    tr.appendChild(btd1);
  
    const btd2 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.textContent = 'Buy 2';
    button2.setAttribute('class', 'btn btn-success');
    button2.addEventListener('click', handleButtonClick);
    btd2.appendChild(button2);
    tr.appendChild(btd2);
  
    const btd3 = document.createElement('td');
    const button3 = document.createElement('button');
    button3.textContent = 'Buy 3';
    button3.setAttribute('class', 'btn btn-success');
    button3.addEventListener('click', handleButtonClick);
    btd3.appendChild(button3);
    tr.appendChild(btd3);
  
    return tr;
  }
  
  function handleButtonClick(event) {
    const target = event.target;
    console.log(target);
  
    if (target.nodeName.toUpperCase() === 'BUTTON' && ['Buy 1', 'Buy 2', 'Buy 3'].includes(target.textContent)) {
      const row = target.closest('tr');
      console.log(row);
      const quantityElement = row.querySelector('td:nth-child(5)');
      let quantity = parseInt(quantityElement.textContent);

      const nameElement = row.querySelector('td:nth-child(1)');
      console.log(nameElement);
      const decreaseAmount = parseInt(target.textContent.split(' ')[1]);
  
      if (quantity > 0) {
        quantity -= decreaseAmount;
        quantityElement.textContent = quantity;
        const itemId = row.querySelector('th').textContent;
        const trId = row.id; // Get the id of the <tr> element
        const itemName = row.querySelector('td:nth-child(2)').textContent;
        const itemPrice = row.querySelector('td:nth-child(4)').textContent;
        const itemDescription = row.querySelector('td:nth-child(3)').textContent;
        updateQuantityInApi(trId, quantity, itemName, itemPrice, itemDescription);
        console.log(trId, quantity, itemName, itemPrice, itemDescription);
      }
    }
  }
  
  async function updateQuantityInApi(itemId, quantity, itemName, itemPrice, itemDescription) {
    try {
    const result = await axios.put(`https://crudcrud.com/api/1ebc43627ba2458e91de7fa8def1e3c2/inventoryData/${itemId}`,{
        quantity: quantity,
        name:itemName,
        price: itemPrice,
        description: itemDescription
    });
  
    const updatedDataResponse = await axios.get(`https://crudcrud.com/api/1ebc43627ba2458e91de7fa8def1e3c2/inventoryData/${itemId}`);
    const updatedData = updatedDataResponse.data;

    console.log(updatedData);

    if(updatedData.quantity<1){
        await axios.delete(`https://crudcrud.com/api/1ebc43627ba2458e91de7fa8def1e3c2/inventoryData/${itemId}`)
        location.reload();
    }
    } catch (error) {
      console.log(error);
    }
  }
 