import React, { Fragment } from "react";
import classes from "./ChangeMapType.module.css";
import mapToggleIcon from "../../../../assets/Layers/mask.png";

const ChangeMapType = (props) => {
  const { handleMapToggle } = props;
  return (
    <Fragment>
      <div className={classes.changeMapTypeContainer}>
        <img
          className={classes.containerToggle}
          src={mapToggleIcon}
          alt="Map toggle"
          onClick={handleMapToggle}
        />
      </div>
    </Fragment>
  );
};

export default ChangeMapType;