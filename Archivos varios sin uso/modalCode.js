/* 
    
        collapse_button.addEventListener("click", () =>{
            if(collapse_card.style.display == "block") {
                collapse_card.style.display = "none";
            }
            else {
                collapse_card.style.display = "block";
            }
    
    })


    
    
        btn_saveEdit.addEventListener("click", () =>{
    
            modal_wrapper.classList.add("active");
            wrapper.style.display = "none"; 
            success_wrap.style.display = "flex";
            success_wrap.classList.add("active");
            text_pub_edit.style.display = "inherit";
            text_pub_creation.style.display = "none";
            collapse_card.style.display = "none";
    })

   
    btn_cancel.addEventListener("click", () =>{
        collapse_card.style.display = "none";
    
    });
    */



    btn_pub.addEventListener("click", () =>{

        modal_wrapper.classList.add("active");
        success_wrap.style.display = "none";
        wrapper.style.display = "block"; 
    
        form_1.style.display = "flex";
        form_2.style.display = "none";
        form_3.style.display = "none";
    
        form_1_btns.style.display = "flex";
        form_2_btns.style.display = "none";
        form_3_btns.style.display = "none";
    
    
        form_2_step.classList.remove("active");
        form_3_step.classList.remove("active");
    
        text_asesor.forEach((p) => {
            p.style.opacity = "1"
        });

        productImageEdit.style.display = "none";  
        productTitleEdit.style.display = "none";   
        productPriceEdit.style.display = "none";
        productDiscountEdit.style.display = "none";
        productStockEdit.style.display = "none";
        ProductManufacturerEdit.style.display = "none";
        productInfoEdit.style.display = "none";
        productDescriptionEdit.style.display = "none";

        productImageEdit.disabled = true;  
        productTitleEdit.disabled = true;   
        productPriceEdit.disabled = true;  
        productDiscountEdit.disabled = true;  
        productStockEdit.disabled = true;  
        ProductManufacturerEdit.disabled = true;  
        productInfoEdit.disabled = true;  
        productDescriptionEdit.disabled = true; 
        sbmt_form_edit.disabled = true;
    
    });

