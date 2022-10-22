import './sidebar.scss';
import { AnimatePresence, motion } from 'framer-motion';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BallotIcon from '@mui/icons-material/Ballot';
import BuildIcon from '@mui/icons-material/Build';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="sidebar">
      <motion.div
        animate={{
          width: isOpen ? '200px' : '55px',
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
          },
        }}
        className="sidebar-content"
      >
        <ul>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li>
              <HomeIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Trang Chủ
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/student-info" style={{ textDecoration: 'none' }}>
            <li>
              <PersonIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Thông Tin Sinh Viên
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/student/invoices-receipts" style={{ textDecoration: 'none' }}>
            <li>
              <ReceiptLongIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Hóa Đơn, Biên Lai
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/student/extended-stay" style={{ textDecoration: 'none' }}>
            <li>
              <HomeWorkIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Phòng
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/update" style={{ textDecoration: 'none' }}>
            <li>
              <BuildIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Yêu Cầu Sửa Chữa
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/update" style={{ textDecoration: ' none' }}>
            <li>
              <BallotIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Khai Báo Y Tế
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
          <Link to="/update" style={{ textDecoration: 'none' }}>
            <li>
              <RateReviewIcon className="icon" />
              <AnimatePresence>
                {isOpen && (
                  <span variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                    Khảo Sát
                  </span>
                )}
              </AnimatePresence>
            </li>
          </Link>
        </ul>
        <hr />
        <div className="bottom">
          <ul>
            <MenuOpenIcon className="icon" onClick={toggle} />
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default Sidebar;
