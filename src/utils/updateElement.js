const updateElement = (data) => (collection) => {
  if (!data.id) {
    throw new Error('Data must contain a `id` value for the element to update.');
  }
  const indexToUpdate = collection.findIndex((element) => element.id === data.id);
  if (indexToUpdate > -1) {
    const newCollection = [...collection];
    newCollection[indexToUpdate] = { ...newCollection[indexToUpdate], ...data };
    return newCollection;
  }
  return collection;
};

export default updateElement;
