import { useState } from 'react';
import './BuyMeCoffee.css';

const BuyMeCoffee = () => {
  const [isOpen, setIsOpen] = useState(false);

  const paymentInfo = [
    { label: 'KPay', value: '09 777 888 999', name: 'Sam' },
    { label: 'WavePay', value: '09 777 888 999', name: 'Sam' },
    { label: 'KBZ Bank', value: '1234 5678 9012 3456', name: 'Sam (Savings)' }
  ];

  return (
    <div className="coffee-container">
      {isOpen && (
        <div className="payment-modal">
          <div className="modal-header">
            <h3>Support Sam's Work ☕</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          
          <div className="payment-methods">
            {paymentInfo.map((method, index) => (
              <div key={index} className="payment-item">
                <span className="label">{method.label}</span>
                <span className="value">{method.value}</span>
                <span className="name">{method.name}</span>
              </div>
            ))}
          </div>

          <p className="support-text">
            Your support helps me create more free content and keep the site running. Thank you! 🙏
          </p>
        </div>
      )}

      <button 
        className="coffee-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buy me a coffee"
      >
        <span className="coffee-icon">☕</span>
        <span>Buy me a coffee!</span>
      </button>
    </div>
  );
};

export default BuyMeCoffee;
