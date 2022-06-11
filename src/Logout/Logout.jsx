import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const propTypes = {
  setUserToken: PropTypes.func,
  setUserName: PropTypes.func,
  setUserAdmin: PropTypes.func,
};

const defaultProps = {
  setUserToken: () => { },
  setUserName: () => { },
  setUserAdmin: () => { },
};

function Logout(props) {
  const { setUserToken, setUserName, setUserAdmin } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken('');
    setUserName('');
    setUserAdmin(false);
    toast('Logout successfully!');
    navigate("/login");
  }, []);

  return null;
}

Logout.defaultProps = defaultProps;
Logout.propTypes = propTypes;
export default Logout;