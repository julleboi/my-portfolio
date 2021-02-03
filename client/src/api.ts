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
    body: JSON.stringify(body),
  })
}


export const contact = async (
  name: string, 
  email: string, 
  message: string
): Promise<{response: string}> => {
  const res = await apiPost('/contact', {name, email, message});

  if (![200, 500].includes(res.status)) {
    return { response: 'Please check all fields for correctness' };
  }

  try {
    const { response } = await res.json();
    return { response };
  } catch (err) {
    console.error(err);
  }

  return { response: 'Could not send your message' };
}