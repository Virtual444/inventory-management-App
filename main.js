// document.addEventListener("DOMContentLoaded", () => {
//     axios.get('https://crudcrud.com/api/2d08f60d3b5d49c0842653beb7265d30/itemDetails')
//     .then(response => {
//         console.log(response);
//         for(let i=0 ; i<response.data.length ; i++){
//             showDataInTable(response.data[i])
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

async function addItem(){
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

    
    const result = await axios.post('https://crudcrud.com/api/2d08f60d3b5d49c0842653beb7265d30/itemDetails', itemDetails)
   console.log(result);
      const row = showDataInTable(result.data)
     
    
    } catch (error) {
        console.log(error);
    }

}
function showDataInTable(detailsObj) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
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
    button1.id = '1';
    button1.textContent = 'Buy 1';
    button1.setAttribute('class', 'btn btn-success');
    btd1.appendChild(button1);
    tr.appendChild(btd1);
  
    const btd2 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.id = '2';
    button2.textContent = 'Buy 2';
    button2.setAttribute('class', 'btn btn-success');
    btd2.appendChild(button2);
    tr.appendChild(btd2);
  
    const btd3 = document.createElement('td');
    const button3 = document.createElement('button');
    button3.id = '3';
    button3.textContent = 'Buy 3';
    button3.setAttribute('class', 'btn btn-success');
    btd3.appendChild(button3);
    tr.appendChild(btd3);
  
    return tr;
}
  

