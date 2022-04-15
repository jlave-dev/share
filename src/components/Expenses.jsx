import React from 'react';
import addElement from '../utils/addElement';
import removeElement from '../utils/removeElement';
import updateElement from '../utils/updateElement';

function Expenses({
  people, expenses, setExpenses, total, subtotal,
}) {
  return people.length > 0
      && (
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
          {expenses.map((entry) => (
            <tr key={entry.id}>
              <td>
                <select
                  defaultValue={entry.person}
                  onChange={(event) => {
                    setExpenses(updateElement({ id: entry.id, person: event.target.value }));
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
                    setExpenses(updateElement({ id: entry.id, cost: parseFloat(event.target.value || '0') }));
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
                <button type="button" onClick={() => { setExpenses(removeElement(entry)); }}>X</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={5}>
              <button
                type="button"
                onClick={() => {
                  setExpenses(
                    addElement('expense', {
                      person: expenses.length > 0
                        ? expenses[expenses.length - 1].person
                        : people[people.length - 1].id,
                    }),
                  );
                }}
              >
                + Add New

              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      );
}

export default Expenses;
