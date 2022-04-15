import React from 'react';

function Total({ total, setTotal }) {
  return (
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
  );
}

export default Total;
