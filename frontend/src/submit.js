import { useState } from 'react';
import { ResultModal } from './ResultModal';
import { useStore } from './store';

const parseEndpoint = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(parseEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      setModal({ type: 'success', result });
    } catch (error) {
      console.error('Failed to parse pipeline:', error);
      setModal({
        type: 'error',
        message:
          'Unable to parse the pipeline. Make sure the FastAPI backend is running.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-5">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      <ResultModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
};
