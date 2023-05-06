import { useState } from "react";
import SinceRangeContainer from "./since-range/since-range-container";
import TimeRangeContainer from "./time-range/time-range-container";

export default function SelectRangeContainer() {
  const [showTimeRange, setShowTimeRange] = useState(true);

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-primary"
        id="dropdown-range"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Rango temporal
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdown-range">
        <>
          {showTimeRange ? <TimeRangeContainer /> : <SinceRangeContainer />}

          <div className="text-center mt-3">
            {showTimeRange ? (
              <button
                type="button"
                className="text-secondary btn btn-link btn-sm"
                onClick={() => setShowTimeRange(false)}
              >
                O últimos días
              </button>
            ) : (
              <button
                type="button"
                className="text-secondary btn btn-link btn-sm"
                onClick={() => setShowTimeRange(true)}
              >
                O seleccionar rango
              </button>
            )}
          </div>
        </>
      </div>
    </div>
  );
}
