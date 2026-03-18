const ROWS = 10;

const IndicatorsDataTableSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-(--border-subtle) bg-(--bg-elevated)">
            <th className="w-10 px-(--sp-4) py-(--sp-3)">
              <div className="h-4 w-4 rounded skeleton mx-auto" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3)">
              <div className="h-3 w-20 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3) w-[100px]">
              <div className="h-3 w-12 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3)">
              <div className="h-3 w-16 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3)">
              <div className="h-3 w-20 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3)">
              <div className="h-3 w-14 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3) w-[250px]">
              <div className="h-3 w-10 rounded skeleton" />
            </th>
            <th className="px-(--sp-4) py-(--sp-3) w-[130px]">
              <div className="h-3 w-16 rounded skeleton" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-(--border-subtle) last:border-b-0"
            >
              <td className="w-10 px-(--sp-4) py-(--sp-3)">
                <div className="h-4 w-4 rounded skeleton mx-auto" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-3 w-32 rounded skeleton" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-3 w-14 rounded skeleton" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-2 w-12 rounded skeleton" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-2 w-[80px] rounded skeleton" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-2 w-16 rounded skeleton" />
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="flex gap-1 flex-wrap">
                  <div className="h-5 w-14 rounded skeleton" />
                  <div className="h-5 w-16 rounded skeleton" />
                  <div className="h-5 w-12 rounded skeleton" />
                </div>
              </td>
              <td className="px-(--sp-4) py-(--sp-3)">
                <div className="h-3 w-16 rounded skeleton" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndicatorsDataTableSkeleton;
