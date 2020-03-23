import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        <footer className="site-footer footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">
                <strong>CritQ</strong>
                </p>
              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Categories</h6>
                <ul className="footer-links">
                  {this.props.footerOptions.map(item => (
                    <li>
                      <a href={item.url}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                {/* <p className="copyright-text">
                  Copyright &copy; 2017 All Rights Reserved by
                  <a href="#">Scanfcode</a>.
                </p> */}
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="dribbble" href="#">
                      <i className="fa fa-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

FooterComponent.propTypes = {
  footerOptions: PropTypes.arrayOf(PropTypes.object)
};
FooterComponent.defaultProps = {
  footerOptions: []
};
