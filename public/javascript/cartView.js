const cartProducts = Array.from(document.querySelectorAll(".cart-products"));

// ------------------------Eliminating all cart items ------------------------//

const emptyBtn = document.querySelector('#delete-cart-items');
const confirBtn = document.querySelector('#confirm');
let flagEmpty = false;

emptyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    confirBtn.style.height = 'fit-content';
    confirBtn.style.padding = '8px';
    confirBtn.style.border = '1px';
    flagEmpty = true;
});

if(flagEmpty){
    console.log(flagEmpty);
    confirBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartProducts.forEach(card => {
            const idCart = Number(card.id);
            console.log(idCart);
        });
    });
};

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
                card.remove();
                // Recarga la página después de eliminar el elemento
                location.reload();
            }else{console.log('Error removing cart item');};
        } catch (error) {
            console.log("Error removing cart item:", error);
        };
    };

    //------------------------------------------------------------------------//

    // -----------------------------Order datail -----------------------------//
    const userID = document.querySelector(".user-data").id;

    async function orderDatails () {
        let response = await fetch(`http://localhost:3000/api/cart/allItems/${userID}/get`);
        allItems =  await response.json();
        if (allItems.meta.success){
            let subtotal = 0;
            let discounts = 0;
            let total = 0;
            let shipping = 1000;

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
                total += (subtotal - discounts);
                if (total > 500 && total < 5000){
                    total += shipping
                };
            });

            document.getElementById("subtotal").textContent = `$${subtotal}`;
            if(total > 5000){
                document.getElementById("shipping").textContent = `GRATIS`;
                document.getElementById("shipping").style.color = 'rgba(54, 242, 29, 1)';
                document.getElementById("shipping").style.fontWeight = '600';
            }else{
                document.getElementById("shipping").textContent = `$${shipping}`;
            };
            if (discounts > 0){
                document.getElementById("discounts").textContent = `- $${discounts}`;
            }else{ document.getElementById("discounts").textContent = ``; }
            document.getElementById("total").textContent = `$${total}`;

            //Set progress var//

            const progress = document.getElementById('amount-progress');

            progress.value = total;

        };
    };
    orderDatails()
});



