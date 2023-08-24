window.onload = function () {

    const allAddCartBtns = Array.from(document.querySelectorAll(".btn-product"));
    const cartItemCountInput = document.getElementById('cartItemCount'); 
    const userID = document.querySelector(".user-data").id;
    let shoppingSessionFlag = false;
    let shoppingSession;
    let count;

    //-----------------------------------Contador carrito------------------------------------------//

    if(!userID){
        cartItemCountInput.value = 0;    
    }else{
        async function initCountInput (){
            let response = await fetch(`http://localhost:3000/api/cart/shoppingSession/${userID}/get`);
            shoppingSession =  await response.json();
            if (shoppingSession.meta.success){
                count = Number(shoppingSession.data.cartItems.length);
                cartItemCountInput.value = count;
            }else{
                cartItemCountInput.value = 0;
            };
        };
        initCountInput();  
    };
    
    //-----------------------------------Contador carrito------------------------------------------//



    allAddCartBtns.forEach( btn => {
        btn.addEventListener("click", async e => {
            e.preventDefault();

            if (!shoppingSessionFlag){
                if(!userID){
                    shoppingSessionFlag = false;
                    alert("Debes iniciar session para agregar items al carrito, deseas loguearte?");
                }else{
                    let response = await fetch(`http://localhost:3000/api/cart/shoppingSession/${userID}/get`);

                    shoppingSession =  await response.json();

                    if (shoppingSession.meta.success){
                        shoppingSessionFlag = true;
                    }else if (!shoppingSession.meta.success && shoppingSession.meta.status == 204 ){
                        let response = await fetch(`http://localhost:3000/api/cart/shoppingSession/${userID}/init`);
                        let initShoppingSession = await response.json();
                        if(initShoppingSession.meta.success){
                            shoppingSessionFlag = true;
                        };
                    }; 
                };   
            };

            const idProduct = Number(btn.id);
            const idSession = Number(shoppingSession.data.id);
            const url = `http://localhost:3000/api/cart/add`;
            const data = {
                product_id: idProduct,
                shopping_session_id: idSession
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data) 
            };

            try {
                const response = await fetch(url, requestOptions);
                const responseData = await response.json();

                if(responseData.meta.success){
                    btn.classList.add('clicked');
                    btn.textContent = "Producto agregado" 
                    setTimeout(() => {
                        btn.classList.remove('clicked');
                        btn.textContent = "Agragar otra unidad al carrito"  
                    }, 3000);
                    if(responseData.meta.created){
                        // Después de agregar el producto, obtengo la nueva cantidad total en el carrito y actualizo el contador
                        count = count + 1;
                        console.log(count);
                        cartItemCountInput.value = count;
                    };  
                };
                
            } catch (error) {
                console.error('Error:', error);
            };
        });
    });

    console.log(cartItemCountInput);
}