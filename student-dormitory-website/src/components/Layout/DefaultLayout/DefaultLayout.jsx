import './defaultLayout.scss';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function DefaultLayout({ children }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const refreshTokenStudent = Cookies.get('refreshTokenStudent');
  useEffect(() => {
    if (!refreshTokenStudent || !user) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={'wrapper-default'}>
      <Navbar />
      <div className="container-client">
        <Sidebar />
        <div className={'content'}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
