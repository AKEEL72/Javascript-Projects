const shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    let search = basket.find((item) => item.id === x.id) || [];

    return `<div id=product-id-${x.id} class="item">
      <img src= ${x.img} width="200px">

      <div class="details">
        <h3>${x.name}</h3>

        <p>${x.desc}</p>

        <div class="price-quantity">
          <h2>$ ${x.price}</h2>

          <div class="buttons">
            <i onclick="decrement('${x.id}')" class="bi bi-dash-lg"></i>

            <div id='${x.id}' class="quantity">
              ${search.item === undefined ? 0 : search.item}
            </div>

            <i onclick="increment('${x.id}')" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`
  }).join(''))
};
generateShop();

let increment = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });
  
  if(search === undefined){
    basket.push({
      id:selectedItemId,
      item: 1
    });
  } else {
    search.item += 1;
  }
  update(selectedItemId);
  storage();
}

let decrement = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });
  if (search === undefined){
    return;
  } else if(search.item === 0){
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItemId);
  basket = basket.filter((x) => x.item !== 0);
  storage();
}

let update = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });

  document.getElementById(selectedItemId).innerText = search.item; 
  calculation();
}

let calculation = () => {
  const cartAmt = document.getElementById('cart-amount');
  cartAmt.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
}

calculation() 

let storage = () => {
  localStorage.setItem('data', JSON.stringify(basket));
}