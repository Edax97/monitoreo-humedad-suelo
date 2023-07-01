import { useReporteAPI } from "../../../api-state/useReporteAPI";
import { useReporteContext } from "../../../state-provider/ReporteProvider";
import CardWidget from "../../common/card-widget/CardWidget";
import APIPagination from "../../common/paginacion/APIPagination";
import ReporteContainer from "./ReporteContainer";

export default function ReportePageList() {
  const { timeRange, modemSelected } = useReporteContext();

  const { pagesCount } = useReporteAPI(
    timeRange?.[0] || null,
    timeRange?.[1] || null,
    modemSelected?.id || "",
    1
  );

  return (
    <CardWidget title={`Reporte ${modemSelected?.name || ""}`} toolbar={true}>
      <div className="pt-4 pb-2 px-lg-5">
        <APIPagination
          pageCount={pagesCount || 1}
          hiddenPages={(prev, next) => (
            <>
              <ReporteContainer
                page={prev}
                timeRange={timeRange}
                modemId={modemSelected?.id || ""}
              />
              <ReporteContainer
                page={next}
                timeRange={timeRange}
                modemId={modemSelected?.id || ""}
              />
            </>
          )}
          currentPage={(page) => (
            <ReporteContainer
              page={page}
              timeRange={timeRange}
              modemId={modemSelected?.id || ""}
            />
          )}
        />
      </div>
    </CardWidget>
  );
}
