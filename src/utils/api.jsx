async function apiFetch(url, options) {
  const res = await fetch(url, options)
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw {
      status: res.status,
      message: data?.error || "Erreur serveur"
    }
  }

  return data
}