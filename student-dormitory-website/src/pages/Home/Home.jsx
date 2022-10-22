import './home.scss';
import { useSelector } from 'react-redux';
import SlideShow from '~/components/SlideShow/SlideShow';

function Home() {
  // const user = useSelector((state) => state.auth.login?.currentUser._id);
  // console.log(process.env.REACT_APP_API);
  // console.log('aaa');
  return (
    <div className="home">
      <div className="slider-show">
        <SlideShow />
      </div>
    </div>
  );
}

export default Home;
