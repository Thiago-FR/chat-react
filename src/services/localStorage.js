export const accessToRoom = (room) => {
  localStorage.setItem('room', room);
}

export const getAccessToRoom = () => {
  const access = JSON.parse(localStorage.getItem('room'));
  if (access) return access;
  return false;
}