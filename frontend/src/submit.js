import { useState } from 'react';
import { useStore } from './store';

const parseEndpoint = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      alert(
        `Pipeline parsed successfully:\n` +
        `Nodes: ${result.num_nodes}\n` +
        `Edges: ${result.num_edges}\n` +
        `DAG: ${result.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      console.error('Failed to parse pipeline:', error);
      alert(
          'Unable to parse the pipeline. Make sure the FastAPI backend is running on http://localhost:8000.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
