const cartProducts = Array.from(document.querySelectorAll(".cart-products"));
const userID = document.querySelector(".user-data").id;

// ------------------------Eliminating all cart items ------------------------//

const emptyBtn = document.querySelector('#delete-cart-items');
const confirmBtn = document.querySelector('#confirm');


emptyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    confirmBtn.classList.toggle('confirm-open');

    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartProducts.forEach(card => {
            const idCart = Number(card.id);
            async function removeAllCartItems () {
                const urlDelete = `http://localhost:3001/api/cart/${idCart}/delete`;
                const reqOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({}) 
                };
                try {
                    const response = await fetch(urlDelete, reqOptionsDelete);
                    const deletion = await response.json();
                    if(!deletion.meta.success){
                        console.log('Error removing cart item');
                    };
                } catch (error) {
                    console.log("Error removing cart item:", error);
                };
            };
            removeAllCartItems();
        });
        
        confirmBtn.textContent = 'CARRITO VACIADO';
        confirmBtn.style.color = "whitesmoke";
        confirmBtn.style.backgroundColor = "rgb(202, 47, 202)";
        
        setTimeout(function() {
            location.reload(); 
        }, 1500); 
    });
});

//------------------------------------------------------------------------//

cartProducts.forEach(card => {

    // ----------------------Midification of quantity -----------------------//

    let min = card.querySelector('.decrease-amount');
    let plus = card.querySelector('.increase-amount');
    let amountInput = card.querySelector('.amount');
   
    min.addEventListener('click', () =>{
        amountInput.value > 1? amountInput.value-- : "";
        amountInput.dispatchEvent(new Event('change')); 
    });
    plus.addEventListener('click', () => {
        amountInput.value < 50? amountInput.value++ : "";
        amountInput.dispatchEvent(new Event('change')); 
    });

    const idCart = Number(card.id);
    amountInput.addEventListener('change', modifQuantity);

    async function modifQuantity () {
        let amout = amountInput.value;
        const url = `http://localhost:3001/api/cart/${idCart}/updateQuantity`;
        const data = {
            quantity: amout
        };
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        }; 
        try {
            const response = await fetch(url, requestOptions);
            await response.json();
        } catch (error) {
            console.error('Error editing quantity:', error);
        };
        orderDatails()
    };

    //------------------------------------------------------------------------//

    // ------------------------Eliminating cart item ------------------------//

    const eliminateBtn = card.querySelector(".eliminate");

    eliminateBtn.addEventListener('click', removeCartItem);

    async function removeCartItem () {
        const urlDelete = `http://localhost:3001/api/cart/${idCart}/delete`;
        const reqOptionsDelete = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({}) 
        };
        try {
            const response = await fetch(urlDelete, reqOptionsDelete);
            const deletion = await response.json();
            if(deletion.meta.success){
                // Recarga la página después de eliminar el elemento
                location.reload();
            }else{console.log('Error removing cart item');};
        } catch (error) {
            console.log("Error removing cart item:", error);
        };
    };

    //------------------------------------------------------------------------//

});

// -----------------------------Order datail -----------------------------/

let subtotal = 0;
let discounts = 0;
let total = 0;
const shipping = 1000;
let finalTotal = 0;

async function orderDatails () {
    let response = await fetch(`http://localhost:3001/api/cart/allItems/${userID}/get`);
    allItems =  await response.json();
    if (allItems.meta.success){
        subtotal = 0;
        discounts = 0;
        total = 0;
        finalTotal = 0;

        allItems.data.forEach(item => {
            let amountItem = item.quantity;
            let productPrice = item.product.price;
            let productDiscount = item.product.discount;
            let discountAmount;
            productDiscount > 0 ? discountAmount = productPrice * productDiscount / 100 : discountAmount = 0 ;
            let finalPrice = productPrice * amountItem;
            let finalDiscounts = discountAmount * amountItem;

            subtotal += finalPrice;
            discounts += finalDiscounts;
            total = (subtotal - discounts);
        });

        finalTotal = total;
        if (total > 0 && total < 5000){
            finalTotal += shipping;
        };

        document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).replace(' ', ',')}`;

        if(total > 5000){
            document.getElementById("shipping").textContent = `GRATIS`;
            document.getElementById("shipping").style.color = 'rgba(54, 242, 29, 1)';
            document.getElementById("shipping").style.fontWeight = '600';
        }else{
            document.getElementById("shipping").textContent = `$${shipping}`;
            document.getElementById("shipping").style.color = '#f5f5f5';
        };

        if (discounts > 0){
            document.getElementById("discounts").textContent = `- $${discounts.toFixed(2).replace('.', ',')}`;
        }else{ 
            document.getElementById("discounts").textContent = `(s/OFF)`;
            document.getElementById("discounts").style.color = '#f5f5f5';
            document.getElementById("discounts").style.fontWeight = '400';
            document.getElementById("discounts").style.fontSize = '0.8rem';
        };

        document.getElementById("total").textContent = `$${finalTotal.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).replace(' ', ',')}`;

        //Set progress var//

        const progress = document.getElementById('amount-progress');
        progress.value = finalTotal;

        if(progress.value < 1500){
            progress.classList.add('minimun');
            progress.classList.remove('free-shipping');
            progress.classList.remove('base');
        }else if (progress.value > 5000){
            progress.classList.add('free-shipping');
            progress.classList.remove('minimun');
            progress.classList.remove('base');
        }else{
            progress.classList.add('base');
            progress.classList.remove('free-shipping');
            progress.classList.remove('minimun');
        };          
    };
};

orderDatails();

// -----------------------------Modal generate purchase Order -----------------------------//


const finishShoppingBtn = document.getElementById("finish-shopping");
const modalOrder = document.getElementById("modalOrder");
const closeModalOrderBtn = document.getElementById("closeModalOrder");
const generateOrderBtn = document.getElementById("generateOrderBtn");
const totalOrderSpan = document.getElementById("totalOrder");
let addPaymentBtn = document.getElementById('addPaymentMethod');
let paymentForm = document.querySelector('.payment-form');

let typeSelect = paymentForm.querySelector('#payment_type');
let vendorInput = paymentForm.querySelector('#payment_vendor');
let accountInput = paymentForm.querySelector('#account_number');
let cardNumInput = paymentForm.querySelector('#card_number');
let cardExpInput = paymentForm.querySelector('#card_exp');

let address = document.querySelector('.address');
const userAddressId = address.id;


finishShoppingBtn.addEventListener("click", () => {
  
    let productsIdsArray = Array.from(document.querySelectorAll(".product-li")).map(item =>item.lang);
    let productsQuantityArray = Array.from(document.querySelectorAll("#quantityProd")).map(item => item.textContent);
    let productsAmountArray = Array.from(document.querySelectorAll("#amountProd")).map(item => item.textContent);
    
    totalOrderSpan.textContent = `$${finalTotal.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).replace(' ', ',')}`;

    // Finish shopping session and generate Order
    async function finishShoppingSession (){
        let resCurrentShopping = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);
        let currentShoppingData = await resCurrentShopping.json();

        let shoppingSessionToFinish;
        currentShoppingData.meta.success? shoppingSessionToFinish = Number(currentShoppingData.data.id) : shoppingSessionToFinish = null;
        
        const url = `http://localhost:3001/api/cart/shoppingSession/${shoppingSessionToFinish}/finish`;
        const data = {
            total: finalTotal
        };
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        }; 

        try {
            const response = await fetch(url, requestOptions);
            let finishedShopping = await response.json();
            return finishedShopping.meta.success;
        } catch (error) {
            console.error('Error finishing shopping session:', error);
        };
    };

    const cartItems = [];

    if (productsIdsArray && productsQuantityArray && productsAmountArray) {
    
        for (let i = 0; i < productsIdsArray.length; i++) {
        const productId = productsIdsArray[i];
        const quantity = parseInt(productsQuantityArray[i], 10);
        const price = parseFloat(productsAmountArray[i].replace('$', '').replace(',', '.').trim()); 

        cartItems.push({
            id: productId,
            quantity: quantity,
            amount: price
        });
        };
    };

    let newOrder;

    function showCustomOrderModal(message, orderDetailId) {
        let modal = document.getElementById('logoutModal');
        let modalMessage = document.getElementById('logoutModalMessage');
        let modalTitle = modal.querySelector('.modal-title');

        modalTitle.textContent = 'Felicitaciones y muchas gracias por tu compra!';
        modalTitle.style.color = 'rgb(199, 73, 132);'

        modalMessage.textContent = message;
        document.getElementById('acceptLogoutButton').textContent = 'Aceptar';

        modal.style.display = 'block';

        document.getElementById('cancelLogoutButton').addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'none';
        e.target.href = "";
        window.location.href = '/';
        });

        document.getElementById('acceptLogoutButton').addEventListener('click', function(e) {
        modal.style.display = 'none';
        e.target.href = "";
        window.location.href = `/user/orders`;
        });
    };

    async function createOrder(){
        const urlOrder = `http://localhost:3001/api/orders/${userID}/create`;
        const dataOrder = {
            detail_total : Number(finalTotal),
            user_payment_id : userPaymentId,
            user_address_id: userAddressId,
            cartItems
        };
        const reqOptionsOrder = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dataOrder) 
        };

        try {
            const response = await fetch(urlOrder, reqOptionsOrder);
            newOrder = await response.json();
            if(newOrder.meta.success){
                const orderDetailId = newOrder.data.newOrder.id;
                let orderMessage = 'Tu orden de compra se generó exitosamente! Ahora puedes ver el detalle en la sección "Mis compras"';
                showCustomOrderModal(orderMessage, orderDetailId)
            }else{
                console.log('Error creating the purchase order');
                alert('Error al generar la orden de compra')
            };
        } catch (error) {
            console.log("Error creating the purchase order at server:", error);
        };

    };

    generateOrderBtn.addEventListener('click', async(e) => {
        
        if(paymentAddedFlag){
            await finishShoppingSession();
            await createOrder();
        }else{
            alert('Debes ingresar un medio de pago');
        };
        
    });
    
    modalOrder.style.display = "block";   
});

//Add payment
let paymentAddedFlag = false;
let userPaymentId = 0;

async function addPayment(){
    if(typeSelect.value.length == 0 || vendorInput.value.length == 0 || accountInput.value.length == 0 || cardNumInput.value.length == 0 || cardExpInput.value.length == 0){
        return alert('Debes ingresar tu método de pago')
    };
    const urlPayment = `http://localhost:3001/api/orders/payments/${userID}/create`;
    const dataPayment = {
        payment_type : typeSelect.value,
        payment_vendor : vendorInput.value,
        account_number: accountInput.value,
        card_number: Number(cardNumInput.value),
        card_exp : cardExpInput.value,
    }
    const reqOptionsPayment = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dataPayment) 
    };
    if(!paymentAddedFlag){
        try {
            const response = await fetch(urlPayment, reqOptionsPayment);
            const newPaymentRes = await response.json();
            if(newPaymentRes.meta.success){
                addPaymentBtn.classList.add('addPaymentOk');
                addPaymentBtn.style.backgroundColor = '#4caf50;'
                addPaymentBtn.textContent = 'Método de pago agregado'
                typeSelect.disabled = true;
                vendorInput.disabled = true;
                accountInput.disabled = true;
                cardNumInput.disabled = true;
                cardExpInput.disabled = true;
                paymentAddedFlag = true;
                userPaymentId = newPaymentRes.data.id;
            }else{
                console.log('Error creating new payment');
                alert('Error al agregar metodo de pago')
            };
        } catch (error) {
            console.log("Error creating new payment at server:", error);
        };
    };
};

addPaymentBtn.addEventListener('click', addPayment);

closeModalOrderBtn.addEventListener("click", () => {
    modalOrder.style.display = "none";
});


