import  React  from "react";
import ContentRowProducts from "./ContentRowProducts";
import LastProduct from "./LastProduct";
import LastUser from "./LastUser";
import Subcategories from "./Subcategories";
import ContentRowUsers from "./ContentRowUsers";
import SalesChart from "./SalesChart";


function ContentRowTop(){
    return(
        <>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-8000 ">Dashboard Greengood</h1>
				</div>
			
				{/*<!-- Content Row Products-->*/}
				<div className="row d-flex align-content-center justify-content-between">
					<div className="row col-5 p-3 mb-4 ml-4 mr-5 rounded" style={{border: "2px solid grey", boxShadow: "0 0 10px grey"}}>
						<h4 style={{color: "white"}} className="mb-5">Productos</h4>
						<ContentRowProducts />
					</div>
					
					{/*<!-- Content Row Users-->*/}
					<div className="row col-5 p-3 mb-4 mr-2 rounded" style={{border: "2px solid grey", boxShadow: "0 0 10px grey"}}>
						<h4 style={{color: "white"}}  className="mb-5">Usuarios</h4>
						<ContentRowUsers />
					</div>
				</div>
				

				{/*<!-- Content Row Last Product in Data Base -->*/}
				<div className="ml-3 d-flex align-content-center justify-content-between ">
					{/*<!-- Last Product in DB -->*/}
					<LastProduct />
					{/*<!-- Subcategories in DB -->*/}
					<SalesChart/>
					{/*<!-- Last User in DB -->*/}
					<LastUser />
				</div>
			</div>
			{/*<!--End Content Row Top-->*/}

        </>
    )

}
export default ContentRowTop;