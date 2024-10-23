import React from 'react';

interface FormStatusProps {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export function FormStatus({ status, message }: FormStatusProps) {
  if (status === 'idle') return null;

  const statusClasses = {
    submitting: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`p-4 rounded-md mt-4 ${statusClasses[status]}`}>
      {status === 'submitting' && <p>Submitting your information...</p>}
      {status === 'success' && <p>Thank you for your submission!</p>}
      {status === 'error' && <p>Error: {message || 'Something went wrong. Please try again.'}</p>}
    </div>
  );
}