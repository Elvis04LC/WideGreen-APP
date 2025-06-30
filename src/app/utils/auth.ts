export function getRolUsuario(): string | null {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Suponiendo que el rol está en payload.role o authorities[0].authority
  return payload.role || (payload.authorities && payload.authorities[0]?.authority);
}