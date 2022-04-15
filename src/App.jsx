import React, { useEffect, useState } from 'react';
import './App.css';
import Expenses from './components/Expenses';
import People from './components/People';
import Shares from './components/Shares';
import Total from './components/Total';

function App() {
  const [people, setPeople] = useState([]);
  const [entries, setEntries] = useState([]);
  const [shares, setShares] = useState({});
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [debug, setDebug] = useState(false);

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

  return (
    <div className="App">

      <People people={people} setPeople={setPeople} />

      <Expenses
        people={people}
        expenses={entries}
        setExpenses={setEntries}
        total={total}
        subtotal={subtotal}
      />

      <Total total={total} setTotal={setTotal} />

      <Shares people={people} shares={shares} subtotal={subtotal} total={total} />

      <label>
        Debug mode
        <input type="checkbox" checked={debug} onChange={() => { setDebug((current) => !current); }} />
      </label>

      {debug && (
      <>
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
      </>
      )}
    </div>
  );
}

export default App;
