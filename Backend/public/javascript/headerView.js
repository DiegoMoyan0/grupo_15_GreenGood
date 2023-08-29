window.onload = function () {

    const allAddCartBtns = Array.from(document.querySelectorAll(".btn-product"));
    const cartItemCountInput = document.getElementById('cartItemCount'); 
    const userID = document.querySelector(".user-data").id;
    let shoppingSessionFlag = false;
    let shoppingSession;

    const amountInputDetail = document.getElementById('amount');
    let quantityFront = 1;
    if (amountInputDetail){
        amountInputDetail.onchange = () =>{ 
            quantityFront = Number(amountInputDetail.value);
        };
    };
    
    //-----------------------------------Contador carrito------------------------------------------//
    if(!userID){
        cartItemCountInput.value = 0;    
    }else{
        async function initCountInput (){
            let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);
            shoppingSession =  await response.json();
            if (shoppingSession.meta.success){
                cartItemCountInput.value  = Number(shoppingSession.data.cartItems.length);
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
                    let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);

                    shoppingSession =  await response.json();

                    if (shoppingSession.meta.success){
                        shoppingSessionFlag = true;
                    }else{
                        let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/init`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: "" })
                        shoppingSession = await response.json();
                        if(shoppingSession.meta.success){
                            shoppingSessionFlag = true;
                        };
                    }; 
                };   
            };

            const idProduct = Number(btn.id);
            const idSession = Number(shoppingSession.data.id);
            const url = `http://localhost:3001/api/cart/add`;
            const data = {
                product_id: idProduct,
                shopping_session_id: idSession,
                quantity: quantityFront
            };
            console.log(data);
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
                        !amountInputDetail? btn.textContent = "Agragar otra unidad al carrito" : null  
                    }, 3001);
                    if(responseData.meta.created){
                        // Después de agregar el producto, actualizo contador de carrito
                        cartItemCountInput.value ++;
                    };  
                };
                
            } catch (error) {
                console.error('Error:', error);
            };
        });
    });

    //-----------------------------------FAV ICONS------------------------------------------//
    const favIcons = Array.from(document.getElementsByClassName('fav-icon')); 
    

    favIcons.forEach(fIcon => {

        let prevFavs = localStorage.getItem('favs');

        if(prevFavs != null && prevFavs != ''){
            let prevFavArray = prevFavs.split(",");
            if(prevFavArray.includes(fIcon.id)){
                fIcon.classList.add('fav-icon-selected');
                fIcon.setAttribute('fill', 'currentColor');
            };
        };

        fIcon.onclick = function () {
            let favDivMsg = document.createElement('span');
            favDivMsg.classList.add('share-msg');
            favDivMsg.classList.add('fav');

            if(!Array.from(fIcon.classList).includes('fav-icon-selected')){
                let favProducts = localStorage.getItem('favs');
                if(favProducts != null){
                    let favArray = favProducts.split(",");
                    favArray.push(fIcon.id);
                    localStorage.setItem("favs", favArray);
                }else{
                    localStorage.setItem("favs", fIcon.id);
                };
                fIcon.classList.add('fav-icon-selected');
                fIcon.setAttribute('fill', 'currentColor');
                
                favDivMsg.textContent = "Agregado a favoritos";
                fIcon.parentElement.appendChild(favDivMsg);
            }else{
                let favArray = localStorage.getItem('favs').split(",");
                let newFavArray = favArray.filter(item => item != fIcon.id);
                fIcon.classList.remove('fav-icon-selected');
                fIcon.setAttribute('fill', 'none');
                localStorage.setItem("favs", newFavArray);

                favDivMsg.textContent = "Se quitó de favoritos";
                fIcon.parentElement.appendChild(favDivMsg);
            };
            setTimeout(function() {
                fIcon.parentElement.removeChild(favDivMsg);
            }, 1500);
        }; 
    });

    //-----------------------------------FAV ICONS------------------------------------------//
    const shareIcons = Array.from(document.getElementsByClassName('share-icon'));
    
    shareIcons.forEach(shIcon => {

        shIcon.addEventListener('click', copyLink);

        async function copyLink() {
            // Obtén la URL del detalle del producto
            let url = `http://localhost:3001/product/${shIcon.id}/detail`;
          
            // Copia el contenido del input al portapapeles usando el API Clipboard
            try {
                await navigator.clipboard.writeText(url);
                // Cambia el ícono y agrega texto temporalmente
                shIcon.innerHTML = `<path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clip-rule="evenodd" />`;
                let copiedDiv = document.createElement('span');
                copiedDiv.textContent = "Enlace copiado! Ya lo puedes compartir donde desees.";
                copiedDiv.classList.add('share-msg');
                shIcon.parentElement.appendChild(copiedDiv);
                setTimeout(function() {
                    shIcon.parentElement.removeChild(copiedDiv);
                }, 2000); // Cambiar el texto del botón después de 2 segundos
            } catch (error) {
                console.error('No se pudo copiar el enlace: ', error);
            };
        }; 
    });  
};

//----------------Store fav products into DDBB--------------//

const userIDfav = document.querySelector(".user-data").id;

userIDfav? window.addEventListener('beforeunload', favProductsStore) : ""; //Antes de cambiar de ventana

async function favProductsStore(e) {
    let idProducts = localStorage.getItem('favs');
    
    const url = `http://localhost:3001/api/favProducts/${userIDfav}/store`;
    const data = {
        favProducts: idProducts,
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
        if(!responseData.meta.success){
            e.preventDefault();
            alert('Hubo un error al cargar los productos favoritos');
        };
    } catch (error) {
        console.error('Hubo un error al cargar los productos favoritos: ', error);     
    };
};