const removeElement = (element) => (collection) => collection.filter((c) => c.id !== element.id);

export default removeElement;
