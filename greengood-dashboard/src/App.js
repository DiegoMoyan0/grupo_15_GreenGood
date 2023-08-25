import './App.css';
import Topnav from './components/Topnav';
import Sidenav from './components/Sidenav';
import Cards from './components/Cards';
import Charts from './components/Charts';
import Datatable from './components/Datatable';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <body class="sb-nav-fixed">
        <Topnav />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidenav />
          </div>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <h1 class="mt-4">Dashboard</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
              <Cards />
              <Charts />
              <Datatable />
            </div>
          </main>

          <Footer />
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
      </body>
    </>
  );
}

export default App;
