export const ResultModal = ({ modal, onClose }) => {
  if (!modal) {
    return null;
  }

  const isSuccess = modal.type === 'success';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pipeline-result-title"
    >
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="pipeline-result-title"
              className="m-0 text-base font-semibold text-slate-900"
            >
              {isSuccess ? 'Pipeline parsed successfully' : 'Unable to parse pipeline'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isSuccess
                ? 'Here is the backend result for the current graph.'
                : modal.message}
            </p>
          </div>
        </div>

        {isSuccess && (
          <div className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200">
            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="font-medium text-slate-600">Nodes</span>
              <span className="font-semibold text-slate-900">
                {modal.result.num_nodes}
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="font-medium text-slate-600">Edges</span>
              <span className="font-semibold text-slate-900">
                {modal.result.num_edges}
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="font-medium text-slate-600">DAG</span>
              <span className="font-semibold text-slate-900">
                {modal.result.is_dag ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
