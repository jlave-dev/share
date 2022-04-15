import React from 'react';
import addElement from '../utils/addElement';
import removeElement from '../utils/removeElement';
import updateElement from '../utils/updateElement';

function People({ people, setPeople }) {
  return (
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
                    setPeople(updateElement({ id: person.id, name: event.target.value }));
                  }}
                />
              </td>

              <td>
                <button type="button" onClick={() => { setPeople(removeElement(person)); }}>X</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={2}>
              <button type="button" onClick={() => { setPeople(addElement('person')); }}>+ Add New</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default People;
