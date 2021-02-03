const isDev = () => {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV.includes('development');
  }
  return false;
}

const BASE_URL = isDev() ? '/api' : 'https://api.julle.dev';

const apiRequest = (path: string, options?: RequestInit) => {
  return fetch(BASE_URL+path, options);
}

const apiPost = (path: string, body: Record<string, unknown>) => {
  return apiRequest(path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

export const contact = async (name: string, email: string, message: string) => {
  const res = await apiPost('/contact', {name, email, message});

  if (res.status === 400) {
    return { response: 'Please check the fields for correctness' };
  }

  try {
    const { response }: { response: string } = await res.json();
    return { response };
  } catch (err) {
    console.error(err);
  }

  return { response: 'Could not send your message' };
}