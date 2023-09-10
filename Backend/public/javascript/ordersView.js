let orderDivs = Array.from(document.querySelectorAll('.order-content'));

async function getOrderDetail (orderID){
    let responseOrder = await fetch(`http://localhost:3001/api/orders/${orderID}/get`);
    let orderDetailRes = await responseOrder.json();
    return orderDetailRes.data;
}

   
orderDivs.forEach(async orderDiv => {
    let orderData = await getOrderDetail(orderDiv.id);
    let orderProducts = await orderData.orderItems;
    let productLis = Array.from(orderDiv.querySelectorAll('.product-li'));
    for (let index = 0; index < productLis.length; index++) {
        const li = productLis[index];
        li.querySelector('.img-order').src = `/images/products/${orderProducts[index].product.image}`; 
        li.querySelector('.title-strong').textContent = `${orderProducts[index].product.title}`;
        li.querySelector('.title-strong').textContent = `${orderProducts[index].product.description}`;
    };
});
