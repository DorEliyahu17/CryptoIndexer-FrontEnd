import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';


function CreateNewIndex() {

  return (
    <div>
      <h1>Create New Index</h1>
      <input class="form-control" type="text" placeholder="symbol" aria-label="symbol" />
      <input class="form-control" type="text" placeholder="prsent" aria-label="prsent" />
    </div>
  );
}

export default CreateNewIndex; 