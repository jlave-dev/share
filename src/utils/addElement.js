import getUniqueId from './getUniqueId';

const addElement = (type, data = {}) => (collection) => {
  let newEntry;
  if (type === 'expense') {
    newEntry = {
      id: getUniqueId(),
      item: '',
      cost: 0,
      ...data,
    };
  } else if (type === 'person') {
    newEntry = {
      id: getUniqueId(),
      name: '',
      ...data,
    };
  }
  return [...collection, newEntry];
};

export default addElement;
