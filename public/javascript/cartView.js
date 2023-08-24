const cartProducts = Array.from(document.querySelectorAll(".cart-products"));


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


});



