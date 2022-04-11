function getUniqueId() {
  return `${Math.floor(Math.random() * 1e8) + Date.now()}`;
}

export default getUniqueId;
