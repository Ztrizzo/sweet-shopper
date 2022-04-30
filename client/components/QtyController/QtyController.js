import React from "react";

import "./QtyController.scss";

const QtyController = ({ buttonHandler, inputHandler, blurHandler, value }) => (
  <span className="qty-controller">
    <span className="qty-button" onClick={() => buttonHandler(-1)}>
      -
    </span>
    <input
      className="qty-input"
      type="text"
      value={value}
      onChange={inputHandler}
      onBlur={blurHandler}
    />
    <span className="qty-button" onClick={() => buttonHandler(1)}>
      +
    </span>
  </span>
);

export default QtyController;
