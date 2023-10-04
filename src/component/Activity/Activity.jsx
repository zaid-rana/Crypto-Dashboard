import React, { useContext, useEffect, useState } from 'react';
import './Activity.css';
import { getActivity } from '../../Appfeature';
import { connectContext } from '../../Contexts';

const Activity = () => {
  const { account } = useContext(connectContext);
  const [activity, setActivity] = useState([]);

  const getData = async () => {
    try {
      const data = await getActivity(account);
      console.log(data);
      setActivity(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    account && getData();
  }, [account]);

  return (
    <div className="activity">
      <header className="activity-header">Activity</header>
      <div className="activity-content">
        <div className="table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Assets</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((val, ind) => (
                <tr className="transaction-row" key={ind}>
                  <td>
                    <div className="transaction-title">{val.from}</div>
                  </td>
                  <td className="transaction-amount">{val.to}</td>
                  <td className="transaction-total">{val.asset}</td>
                  <td className="transaction-status pending">{val.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="more-activity">
        <span className="more-activity-text">More Activity</span>
        <svg
          className="arrow-icon"
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.375 0L0 2.375 5.938 8.31 0 14.245 2.375 16l7.563-7.563L2.375 0z"
            fill="#7D67FF"
          />
        </svg>
      </div>
    </div>
  );
};

export default Activity;
