'use server';

export async function subscribe(clientId: string) {
  let eventSource: EventSource;

  try {
    eventSource = new EventSource(`${process.env.REST_API_URL}/subscribe?clientId=${clientId}`);

    eventSource.addEventListener('subscribe', (e) => {
      console.log('subscribe 이벤트:', e.data);
    });
  } catch (error) {
    console.error('Failed to connect to SSE:', error);
    throw error;
  }
}
