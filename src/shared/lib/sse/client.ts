import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setIsPending(false);
        setData(JSON.parse(message.data));
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    });

    gameEvents.addEventListener("error", (error) => {
      setError(error);
    });

    return () => gameEvents.close();
  }, [url]);

  return { data, error, isPending };
}
