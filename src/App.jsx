import React, { useEffect, useState } from 'react';
import './App.css';
import getUniqueId from './utils/getUniqueId';

function updateEntry(entries, data) {
  if (!data.id) {
    throw new Error('Data must contain a `id` value for the entry to update.');
  }
  const indexToUpdate = entries.findIndex((entry) => entry.id === data.id);
  if (indexToUpdate > -1) {
    const newEntries = [...entries];
    newEntries[indexToUpdate] = { ...newEntries[indexToUpdate], ...data };
    return newEntries;
  }
  return entries;
}

function removeEntry(entries, entry) {
  return entries.filter((e) => e.id !== entry.id);
}

function App() {
  const [people, setPeople] = useState([]);
  const [entries, setEntries] = useState([]);
  const [shares, setShares] = useState({});
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(entries.reduce((sum, entry) => sum + entry.cost, 0));
  }, [entries]);

  useEffect(() => {
    const newShares = {};
    entries.forEach((expense) => {
      if (newShares[expense.person] === undefined) {
        newShares[expense.person] = expense.cost;
      } else {
        newShares[expense.person] += expense.cost;
      }
      setShares(newShares);
    });
  }, [entries, people]);

  function addNewElement(collection, type) {
    let newEntry;
    if (type === 'entry') {
      newEntry = {
        id: getUniqueId(),
        person: people.length > 0 ? people[0].id : null,
        item: '',
        cost: 0,
      };
    } else if (type === 'person') {
      newEntry = {
        id: getUniqueId(),
        name: '',
      };
    }
    return [...collection, newEntry];
  }

  return (
    <div className="App">
      <div className="people">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td>
                  <input
                    type="text"
                    defaultValue={person.name}
                    onChange={(event) => {
                      setPeople(
                        updateEntry(
                          people,
                          { id: person.id, name: event.target.value },
                        ),
                      );
                    }}
                  />
                </td>

                <td>
                  <button type="button" onClick={() => { setPeople(removeEntry(people, person)); }}>X</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}>
                <button type="button" onClick={() => { setPeople(addNewElement(people, 'person')); }}>+ Add New</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {people.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Item</th>
            <th>Cost</th>
            <th>Share</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>
                <select onChange={(event) => {
                  setEntries(updateEntry(entries, { id: entry.id, person: event.target.value }));
                }}
                >
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>{person.name}</option>
                  ))}
                </select>
              </td>

              <td>
                <input type="text" />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="decimal"
                  defaultValue={entry.cost.toString() || '0'}
                  onChange={(event) => {
                    setEntries(
                      updateEntry(
                        entries,
                        { id: entry.id, cost: parseFloat(event.target.value || '0') },
                      ),
                    );
                  }}
                />
              </td>

              <td>
                <input
                  readOnly
                  type="text"
                  value={
                    parseFloat(entry.cost && total
                      ? (entry.cost / subtotal) * total
                      : entry.cost).toFixed(2)
                  }
                />
              </td>

              <td>
                <button type="button" onClick={() => { setEntries(removeEntry(entries, entry)); }}>X</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={5}>
              <button type="button" onClick={() => { setEntries(addNewElement(entries, 'entry')); }}>+ Add New</button>
            </td>
          </tr>
        </tfoot>
      </table>
      )}

      <table>
        <thead>
          <tr>
            <th>Total (+ tax, tip, etc)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="text"
                inputMode="decimal"
                defaultValue={total || 0}
                onChange={(event) => {
                  setTotal(parseFloat(event.target.value) || null);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Share</th>
          </tr>
        </thead>

        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>
                <input readOnly type="text" value={person.name} />
              </td>
              <td>
                <input readOnly type="text" value={((shares[person.id] / subtotal) * total).toFixed(2)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>
        subtotal:
        {' '}
        {subtotal}
      </h1>
      <h1>
        total:
        {' '}
        {total}
      </h1>
      <h1>
        people:
        {' '}
        {JSON.stringify(people)}
      </h1>
      <h1>
        entries:
        {' '}
        {JSON.stringify(entries)}
      </h1>
      <h1>
        shares:
        {' '}
        {JSON.stringify(shares)}
      </h1>
    </div>
  );
}

export default App;
