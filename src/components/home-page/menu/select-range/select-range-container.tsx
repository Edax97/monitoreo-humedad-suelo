import { useState } from "react";
import BtnIconComponent from "../../../common/btn-icon/BtnIconComponent";
import SinceRangeContainer from "./since-range/since-range-container";
import TimeRangeContainer from "./time-range/time-range-container";
import { BsCalendarRange as Calendar } from "react-icons/bs";

export default function SelectRangeContainer() {
  const [showTimeRange, setShowTimeRange] = useState(true);

  return (
    <div className="dropdown">
      <BtnIconComponent
        iconClassName="fs-5 text-white"
        id="dropdown-range"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="Seleccionar rango temporal"
      >
        <Calendar />
      </BtnIconComponent>
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
