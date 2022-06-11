import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const propTypes = {
  setUserToken: PropTypes.func,
  setUserName: PropTypes.func,
};

const defaultProps = {
  setUserToken: () => { },
  setUserName: () => { },
};

function Logout(props) {
  const { setUserToken, setUserName } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken('');
    setUserName('');
    toast('Logout successfully!');
    navigate("/login");
  }, []);

  return null;
}

Logout.defaultProps = defaultProps;
Logout.propTypes = propTypes;
export default Logout;