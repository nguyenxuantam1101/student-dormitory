import './footer.scss';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';

function Footer() {
  return (
    <div className="footer">
      <div className="container-footer">
        <div className="about">
          <h6>TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ</h6>
          <div className="footer-text">
            <div>
              <a href="https://www.facebook.com/quoctron209" target="_blank" rel="noreferrer">
                Nguyễn Quốc Trọn - 1911066425
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/nguyenxuantam1101" target="_blank" rel="noreferrer">
                Nguyễn Xuân Tâm - 1911064994
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-footer">
        <div>
          <p className="copyright-text">&copy;Website Ký Túc Xá - Đồ Án Cơ Sở</p>
        </div>
        {/* <div>
            <ul className="social-icons">
              <FacebookRoundedIcon />
            </ul>
            <ul className="social-icons">
              <GoogleIcon />
            </ul>
          </div> */}
      </div>
    </div>
  );
}

export default Footer;
