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
                const urlDelete = `http://localhost:3000/api/cart/${idCart}/delete`;
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
        amountInput.dispatchEvent(new Event('change')); // Disparo manualmente el evento change del input
    });
    plus.addEventListener('click', () => {
        amountInput.value < 50? amountInput.value++ : "";
        amountInput.dispatchEvent(new Event('change')); // Disparo manualmente el evento change del input
    });

    const idCart = Number(card.id);
    amountInput.addEventListener('change', modifQuantity);

    async function modifQuantity () {
        let amout = amountInput.value;
        const url = `http://localhost:3000/api/cart/${idCart}/updateQuantity`;
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
        const urlDelete = `http://localhost:3000/api/cart/${idCart}/delete`;
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
async function orderDatails () {
    let response = await fetch(`http://localhost:3000/api/cart/allItems/${userID}/get`);
    allItems =  await response.json();
    if (allItems.meta.success){
        let subtotal = 0;
        let discounts = 0;
        let total = 0;
        const shipping = 1000;
        let finalTotal = 0;

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

orderDatails()






