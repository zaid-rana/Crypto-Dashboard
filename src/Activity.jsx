import "./Activity.css";

export const Activity = ({ ...props }) => {
  return (
    <div className="activity">
      <div className="activity2">ACTIVITY </div>
      <div className="activity3">
        <div className="rectangle-16"></div>
        <div className="mask-group">
          <div className="rectangle-17"></div>
        </div>
        <div className="transactions-list">
          <div className="transaction-1">
            <div className="group-4">
              <div className="ethereum-purchased">Ethereum Purchased </div>
              <div className="group-3">
                <div className="rectangle-172"></div>
                <img className="image-2" src="image-2.png" />
              </div>
            </div>
            <div className="_0-0154-eth">0.0154 ETH </div>
            <div className="_10-00">$10.00 </div>
            <div className="pending">Pending </div>
            <div className="february-21-2021">February 21, 2021 </div>
          </div>
          <div className="transaction-2">
            <div className="group-5">
              <div className="bitcoin-purchased">Bitcoin Purchased </div>
              <div className="group-3">
                <div className="rectangle-173"></div>
                <img className="image-22" src="image-22.png" />
              </div>
            </div>
            <div className="_0-3-btc">0.3 BTC </div>
            <div className="_10-002">$10.00 </div>
            <div className="done">Done </div>
            <div className="february-14-2021">February 14, 2021 </div>
          </div>
          <div className="transaction-3">
            <div className="group-6">
              <div className="bitcoin-purchased2">Bitcoin Purchased </div>
              <div className="group-3">
                <div className="rectangle-174"></div>
                <img className="image-23" src="image-23.png" />
              </div>
            </div>
            <div className="_0-025-btc">0.025 BTC </div>
            <div className="_10-003">$10.00 </div>
            <div className="done2">Done </div>
            <div className="january-14-2021">January 14, 2021 </div>
          </div>
        </div>
        <div className="table-head">
          <div className="transactions">Transactions </div>
          <div className="amount">Amount </div>
          <div className="total">Total </div>
          <div className="status">Status </div>
          <div className="date">Date </div>
        </div>
        <div className="line-4"></div>
      </div>
      <div className="more-activity">
        <svg
          className="arrow-2"
          width="15"
          viewBox="0 0 15 0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3536 0.353552C15.5488 0.15829 15.5488 -0.158293 15.3536 -0.353555L12.1716 -3.53553C11.9763 -3.7308 11.6597 -3.7308 11.4645 -3.53553C11.2692 -3.34027 11.2692 -3.02369 11.4645 -2.82843L14.2929 -1.24952e-06L11.4645 2.82843C11.2692 3.02369 11.2692 3.34027 11.4645 3.53553C11.6597 3.7308 11.9763 3.7308 12.1716 3.53553L15.3536 0.353552ZM4.37114e-08 0.5L15 0.499999L15 -0.500001L-4.37114e-08 -0.5L4.37114e-08 0.5Z"
            fill="#A69ED6"
          />
        </svg>
      </div>
    </div>
  );
};
