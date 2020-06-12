import React from "react";
import "./matrix.component.css";
import "../../node_modules/animate.css/animate.css";

function Matrix(props) {
  let { data, highlightRow, rowToHighlight, colToHighlight } = props;
  return (
    <div className="matrixContainer">
      {data.map((row, rowIndex) => (
        <div className="cellRow" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className={
                highlightRow
                  ? rowIndex === rowToHighlight
                    ? "cellHighlight animate__animated animate__bounceInLeft animate__faster"
                    : "cell"
                  : colIndex === colToHighlight
                  ? "cellHighlightCol animate__animated animate__bounceInDown animate__faster"
                  : "cell"
              }
              key={colIndex}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matrix;
