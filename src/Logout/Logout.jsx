import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const propTypes = {
  setUserToken: PropTypes.func,
};

const defaultProps = {
  setUserToken: () => { },
};

function Logout(props) {
  const { setUserToken } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken('');
    toast('Logout successfully!');
    navigate("/login");
  }, []);

  return null;
}

Logout.defaultProps = defaultProps;
Logout.propTypes = propTypes;
export default Logout;