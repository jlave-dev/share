import React from 'react';

function Shares({
  people, shares, subtotal, total,
}) {
  return (
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
  );
}

export default Shares;
