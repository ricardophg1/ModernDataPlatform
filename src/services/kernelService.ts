// src/services/kernelService.ts

/**
 * This service simulates a connection to a backend kernel for code execution.
 * It defines the API contract (data structures) and provides a mock implementation
 * of the code execution flow, including streaming results.
 */

// --- API Contract Definitions ---

export interface ExecutionRequest {
  code: string;
  language: 'python' | 'sql';
}

export type StreamChunk =
  | { type: 'status'; message: string }
  | { type: 'stdout'; data: string }
  | { type: 'stderr'; data: string }
  | { type: 'table'; data: Record<string, unknown>[] }
  | { type: 'error'; message: string };

export type StreamCallback = (chunk: StreamChunk) => void;


// --- Mock Kernel Service Implementation ---

/**
 * Simulates executing code against a backend kernel.
 * @param request The code execution request.
 * @param onChunk A callback function to handle streamed data chunks.
 * @returns A promise that resolves when the execution is complete.
 */
export const executeCode = (
  request: ExecutionRequest,
  onChunk: StreamCallback
): Promise<void> => {
  console.log('Executing code:', request);

  return new Promise((resolve) => {
    // Using an IIFE to allow async/await inside the promise executor
    (async () => {
      onChunk({ type: 'status', message: 'Connecting to kernel...' });
      await new Promise(res => setTimeout(res, 500));

      onChunk({ type: 'status', message: 'Executing...' });
      await new Promise(res => setTimeout(res, 1000));

      // Simulate Python execution
      if (request.language === 'python') {
        if (request.code.includes('import')) {
          onChunk({ type: 'stdout', data: `Module imported successfully.\n` });
        }
        onChunk({ type: 'stdout', data: 'Running Python script...\n' });
        await new Promise(res => setTimeout(res, 800));
        onChunk({ type: 'stdout', data: 'Result: 42\n' });
      }

      // Simulate SQL execution
      if (request.language === 'sql') {
        onChunk({ type: 'stdout', data: 'Executing query against database...\n' });
        await new Promise(res => setTimeout(res, 1200));
        if (request.code.toLowerCase().includes('users')) {
          onChunk({
            type: 'table',
            data: [
              { user_id: 'u001', email: 'alice@example.com', sign_up_date: '2023-01-15' },
              { user_id: 'u002', email: 'bob@example.com', sign_up_date: '2023-02-20' },
            ],
          });
        } else {
           onChunk({ type: 'stdout', data: 'Query returned no results.\n' });
        }
      }

      // Simulate an error
      if (request.code.includes('error')) {
        await new Promise(res => setTimeout(res, 500));
        onChunk({ type: 'error', message: 'Simulated runtime error: Division by zero.' });
      }

      await new Promise(res => setTimeout(res, 300));
      onChunk({ type: 'status', message: 'Execution finished.' });

      resolve();
    })();
  });
};
