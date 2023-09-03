import  React  from "react";
import imagenFondo from '../assets/images/logo.png';
import ContentRowProducts from "./ContentRowProducts";
import LastProduct from "./LastProduct";
import LastUser from "./LastUser";
import Subcategories from "./Subcategories";
import ContentRowUsers from "./ContentRowUsers";


function ContentRowTop(){
    return(
        <>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-8000 ">Dashboard Greengood</h1>
				</div>
			
				{/*<!-- Content Row Products-->*/}
				<div className="row">
					<div className="row col-5 p-3 mb-4 ml-4 mr-5 rounded" style={{border:"3px solid #ea1667e8"}}>
						<h4 style={{color: "#ea1667e8"}} className="mb-5">Productos</h4>
						<ContentRowProducts />
					</div>
					
					{/*<!-- Content Row Users-->*/}
					<div className="row col-5 p-3 mb-4 ml-5 rounded" style={{border:"3px solid #ea1667e8"}}>
						<h4 style={{color: "#ea1667e8"}}>Usuarios</h4>
						<ContentRowUsers />
					</div>
				</div>
				

				{/*<!-- Content Row Last Product in Data Base -->*/}
				<div className="row ml-3">
					{/*<!-- Last Product in DB -->*/}
					<LastProduct />
					{/*<!-- Subcategories in DB -->*/}
					<Subcategories />
					{/*<!-- Last User in DB -->*/}
					<LastUser />

				</div>
			</div>
			{/*<!--End Content Row Top-->*/}

        </>
    )

}
export default ContentRowTop;