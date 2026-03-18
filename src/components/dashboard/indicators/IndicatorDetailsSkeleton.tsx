import '@/styles/indicatorDetails.css';

const IndicatorDetailsSkeleton = () => {
  return (
    <aside className="overflow-hidden shrink-0 w-(--detail-width) shadow-(--shadow-elevated) h-full z-60">
      <div className="w-(--detail-width) border-l border-(--border-subtle) bg-(--bg-surface) h-full">
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          <div className="sticky py-(--sp-4) px-(--sp-5) border-b border-(--border-subtle) flex justify-between items-center">
            <div className="h-4 w-24 rounded skeleton" />
            <div className="h-8 w-8 rounded skeleton" />
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 flex flex-col gap-(--sp-6) p-(--sp-5) pb-(--sp-6) overflow-y-auto">
            {/* Value section */}
            <div className="detail-section">
              <div className="h-3 w-12 rounded skeleton" />
              <div className="h-4 w-full max-w-[280px] rounded skeleton" />
            </div>

            {/* Classification section */}
            <div className="detail-section">
              <div className="h-3 w-24 rounded skeleton" />
              <div className="flex items-center gap-(--sp-2)">
                <div className="h-6 w-16 rounded skeleton" />
                <div className="h-3 w-20 rounded skeleton" />
              </div>
            </div>

            {/* Confidence section */}
            <div className="detail-section">
              <div className="h-3 w-20 rounded skeleton" />
              <div className="h-2 w-[120px] rounded skeleton" />
            </div>

            {/* Tags section */}
            <div className="detail-section">
              <div className="h-3 w-10 rounded skeleton" />
              <div className="flex flex-wrap gap-(--sp-2)">
                <div className="h-6 w-14 rounded skeleton" />
                <div className="h-6 w-16 rounded skeleton" />
                <div className="h-6 w-12 rounded skeleton" />
              </div>
            </div>

            {/* Timeline section */}
            <div className="detail-section">
              <div className="h-3 w-16 rounded skeleton" />
              <div className="flex flex-col">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="detail-row">
                    <div className="h-3 w-20 rounded skeleton" />
                    <div className="h-3 w-24 rounded skeleton" />
                  </div>
                ))}
              </div>
            </div>

            {/* Source section */}
            <div className="detail-section">
              <div className="h-3 w-14 rounded skeleton" />
              <div className="flex flex-col gap-(--sp-2)">
                <div className="detail-row">
                  <div className="h-3 w-16 rounded skeleton" />
                  <div className="h-3 w-20 rounded skeleton" />
                </div>
                <div className="detail-row">
                  <div className="h-3 w-14 rounded skeleton" />
                  <div className="h-3 w-8 rounded skeleton" />
                </div>
              </div>
            </div>

            {/* Related campaigns section */}
            <div className="detail-section">
              <div className="h-3 w-28 rounded skeleton" />
              <div className="flex flex-col gap-(--sp-2)">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-(--sp-2)">
                    <div className="h-3 w-32 rounded skeleton" />
                    <div className="h-3 w-16 rounded skeleton" />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons section */}
            <div className="detail-section">
              <div className="flex gap-(--sp-2)">
                <div className="h-9 flex-1 rounded skeleton" />
                <div className="h-9 flex-1 rounded skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default IndicatorDetailsSkeleton;
