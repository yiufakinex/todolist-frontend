import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListPage from '../pages/ListPage';



export const Layout = () => {

  return (
    <>
      <div className="App">
        <Header />
        <ListPage />
      </div>
      <Footer />
    </>
  );
};


