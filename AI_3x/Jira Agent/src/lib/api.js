export async function apiCall(endpoint, body) {
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let err = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      err = data.error || err;
    } catch {
      err = await res.text() || err;
    }
    throw new Error(err);
  }

  return res.json();
}
