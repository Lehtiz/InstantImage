import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  }, []);

  return (
    <div className="bg-dray-background">
      <div className="mx-auth max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
