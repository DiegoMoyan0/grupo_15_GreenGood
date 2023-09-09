window.onload = function () {

    const allAddCartBtns = Array.from(document.querySelectorAll(".btn-product"));
    const cartItemCountInput = document.getElementById('cartItemCount');
    const userID = document.querySelector(".user-data").id;
    let shoppingSessionFlag = false;
    let shoppingSession;

    const amountInputDetail = document.getElementById('amount');
    let quantityFront = 1;
    if (amountInputDetail) {
        amountInputDetail.onchange = () => {
            quantityFront = Number(amountInputDetail.value);
            console.log(quantityFront);
        };
    };


    //-----------------------------------Contador carrito------------------------------------------//
    if (!userID) {
        cartItemCountInput.value = 0;
    } else {
        async function initCountInput() {
            let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);
            shoppingSession = await response.json();
            if (shoppingSession.meta.success) {
                cartItemCountInput.value = Number(shoppingSession.data.cartItems.length);
            } else {
                cartItemCountInput.value = 0;
            };
        };
        initCountInput();
    };

    //-----------------------------------Handle Shopping Cart------------------------------------------//
    var alertMessage = "Debes iniciar sesión para agregar ítems al carrito. ¿Deseas iniciar sesión ahora?";

    allAddCartBtns.forEach(btn => {
        btn.addEventListener("click", async e => {
            e.preventDefault();

            if (!shoppingSessionFlag) {
                if (!userID) {
                    shoppingSessionFlag = false;
                    showCustomLogoutModal(alertMessage);
                } else {
                    let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);

                    shoppingSession = await response.json();

                    if (shoppingSession.meta.success) {
                        shoppingSessionFlag = true;
                    } else {
                        let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/init`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: "" })
                        shoppingSession = await response.json();
                        if (shoppingSession.meta.success) {
                            shoppingSessionFlag = true;
                        };
                    };
                };
            };
            
            // Función para mostrar el nuevo modal personalizado
function showCustomLogoutModal(message) {
    var modal = document.getElementById('logoutModal');
    var modalMessage = document.getElementById('logoutModalMessage');
  
    // Modifica el contenido del nuevo modal con el mensaje personalizado
    modalMessage.textContent = message;
  
    // Abre el nuevo modal
    modal.style.display = 'block';
  
    // Cierra el nuevo modal al hacer clic en "Cancelar"
    document.getElementById('cancelLogoutButton').addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'none';
    });
  
    // Redirige al usuario a la página de inicio de sesión al hacer clic en "Aceptar"
    document.getElementById('acceptLogoutButton').addEventListener('click', function() {
      modal.style.display = 'none';
      window.location.href = '/user/login';
    });
  }





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

                if (responseData.meta.success) {
                    btn.classList.add('clicked');
                    btn.textContent = "Producto agregado"
                    setTimeout(() => {
                        btn.classList.remove('clicked');
                        !amountInputDetail ? btn.textContent = "Agragar otra unidad al carrito" : null
                    }, 3001);
                    if (responseData.meta.created) {
                        // Después de agregar el producto, actualizo contador de carrito
                        cartItemCountInput.value++;
                    };
                };

            } catch (error) {
                console.error('Error:', error);
            };
        });
    });

    //-----------------------------------FAV ICONS------------------------------------------//
    // Obtén elementos del DOM
    var openModalLink = document.getElementById('openModalLink');
    var closeModalButton = document.getElementById('closeModalButton');
    var modal = document.getElementById('myModal');
    var cancelLogoutLink = document.getElementById('cancelLogoutLink');
    var confirmLogoutLink = document.getElementById('confirmLogoutLink');

    // Abre el modal al hacer clic en el enlace "Cerrar sesión"
    openModalLink.onclick = function (e) {
        e.preventDefault(); // Evita la acción predeterminada del enlace (navegación)
        const loggedName = document.getElementById('userOptionsLink');
        userOptions.classList.toggle('show');

        modal.style.display = 'block';
    }

    // Cierra el modal al hacer clic en la "x"
    closeModalButton.onclick = function () {
        modal.style.display = 'none';
    }

    // Cierra el modal al hacer clic en el enlace "Cancelar"
    cancelLogoutLink.onclick = function (e) {
        e.preventDefault(); // Evita la acción predeterminada del enlace (navegación)
        modal.style.display = 'none';
    }

    // Confirmar el cierre de sesión y redireccionar al hacer clic en el enlace "Cerrar sesión"
    confirmLogoutLink.onclick = function (e) {
        localStorage.clear();
        // Puedes redirigir al usuario a la página de inicio de sesión o a donde sea necesario aquí.
        modal.style.display = 'none';
    }

    if (window.location.pathname === "/user/logout") {
        openModalLink();
    };

    setTimeout(() => {
        const favIcons = Array.from(document.getElementsByClassName('fav-icon'));
        const userIDfav = document.querySelector(".user-data").id;
        let preFavsStorage;

        if (!userIDfav) {
            preFavsStorage = localStorage.getItem('favs');
            favIcons.forEach(fIcon => {
                if (preFavsStorage != null && preFavsStorage != '') {
                    let prevFavArray = preFavsStorage.split(",");
                    if (prevFavArray.includes(fIcon.id)) {
                        fIcon.classList.add('fav-icon-selected');
                        fIcon.setAttribute('fill', 'currentColor');
                    };
                };
            });
        } else {
            async function initPrevsFavs() {
                let response = await fetch(`http://localhost:3001/api/favProducts/all/${userID}/get`);
                let prevFavsData = await response.json();
                if (prevFavsData.meta.success) {
                    localStorage.setItem("favs", prevFavsData.data.favStorage);
                    preFavsStorage = localStorage.getItem('favs');
                    favIcons.forEach(fIcon => {
                        if (preFavsStorage != null && preFavsStorage != '') {
                            let prevFavArray = preFavsStorage.split(",");
                            if (prevFavArray.includes(fIcon.id)) {
                                fIcon.classList.add('fav-icon-selected');
                                fIcon.setAttribute('fill', 'currentColor');
                            };
                        };
                    });
                } else {
                    preFavsStorage = localStorage.getItem('favs');
                };
            };
            initPrevsFavs();
        };

        favIcons.forEach(fIcon => {

            fIcon.onclick = function () {
                let favDivMsg = document.createElement('span');
                favDivMsg.classList.add('share-msg');
                favDivMsg.classList.add('fav');

                if (!Array.from(fIcon.classList).includes('fav-icon-selected')) {
                    let favProducts = localStorage.getItem('favs');
                    if (favProducts != null) {
                        let favArray = favProducts.split(",");
                        favArray.push(fIcon.id);
                        localStorage.setItem("favs", favArray);
                    } else {
                        localStorage.setItem("favs", fIcon.id);
                    };
                    fIcon.classList.add('fav-icon-selected');
                    fIcon.setAttribute('fill', 'currentColor');

                    favDivMsg.textContent = "Agregado a favoritos";
                    fIcon.parentElement.appendChild(favDivMsg);
                } else {
                    let favArray = localStorage.getItem('favs').split(",");
                    let newFavArray = favArray.filter(item => item != fIcon.id);
                    fIcon.classList.remove('fav-icon-selected');
                    fIcon.setAttribute('fill', 'none');
                    localStorage.setItem("favs", newFavArray);

                    favDivMsg.textContent = "Se quitó de favoritos";
                    fIcon.parentElement.appendChild(favDivMsg);
                };
                setTimeout(function () {
                    fIcon.parentElement.removeChild(favDivMsg);
                }, 1500);
            };
        });
<<<<<<< HEAD
    }, 350);
    
=======
    }, 201);

>>>>>>> f08d1126482f753b01cd93e494d472c10ffe8643

    // To handle logout when any link to "/user/logout" is clicked:
    document.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            if (event.target.getAttribute("href") === "/user/logout") {
                openModalLink();
            };
        };
    });

    //-----------------------------------SHARE ICONS------------------------------------------//
    setTimeout(() => {
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
                    setTimeout(function () {
                        shIcon.parentElement.removeChild(copiedDiv);
                    }, 2000); // Cambiar el texto del botón después de 2 segundos
                } catch (error) {
                    console.error('No se pudo copiar el enlace: ', error);
                };
            };
        });
    }, 201);



    ////////////////////////////////////////////////////////////////////

    // Search-bar script

    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productQuery = searchInput.value.trim();
        if (productQuery !== "") {
            searchForm.submit();
        }
    })

    ////////////////////////////////////////////////////////////////////

};

//----------------Store fav products into DDBB--------------//
const userIDfav = document.querySelector(".user-data").id;

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
        if (!responseData.meta.success) {
            e.preventDefault();
            alert('Hubo un error al cargar los productos favoritos');
        };
    } catch (error) {
        console.error('Hubo un error al cargar los productos favoritos: ', error);
    };
};

let urlActual = window.location.href;

<<<<<<< HEAD
userIDfav? window.addEventListener('beforeunload', favProductsStore) : ""; 
=======
if (urlActual != "http://localhost:3001/user/favs") {
    userIDfav ? window.addEventListener('beforeunload', favProductsStore) : "";
};
>>>>>>> f08d1126482f753b01cd93e494d472c10ffe8643
