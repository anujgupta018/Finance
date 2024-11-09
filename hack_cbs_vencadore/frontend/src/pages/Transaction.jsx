import React from 'react';
import { Card, Badge, Typography } from 'antd';
import '../style/Transaction.css';
import Navbar from '../components/Nav';

const { Title, Text } = Typography;

export default function Transactions() {
  const transactions = [
    { id: 1, name: 'Coffee Shop', amount: 78, roundUp: 2, date: '2023-06-01', category: 'Food & Drink' },
    { id: 2, name: 'Grocery Store', amount: 253, roundUp: 7, date: '2023-06-02', category: 'Groceries' },
    { id: 3, name: 'Movie Tickets', amount: 300, roundUp: 0, date: '2023-06-03', category: 'Entertainment' },
    { id: 4, name: 'Gas Station', amount: 1245, roundUp: 5, date: '2023-06-04', category: 'Transportation' },
    { id: 5, name: 'Online Shopping', amount: 899, roundUp: 1, date: '2023-06-05', category: 'Shopping' },
  ];

  return (
    <>
    <Navbar/>
    <div className="transactions-container">
      <Title level={1} className="transactions-title">Recent Transactions</Title>
      
      <Card className="transactions-card">
        <Title level={4}>Transaction History</Title>
        <div className="transactions-content">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-details">
                <Text strong>{transaction.name}</Text>
                <Text type="secondary" className="transaction-date">{transaction.date}</Text>
                <Badge color="blue" className="transaction-category">{transaction.category}</Badge>
              </div>
              <div className="transaction-amount">
                <Text strong>₹{transaction.amount}</Text>
                <Text className="transaction-roundup">+₹{transaction.roundUp} Round-up</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div></>
  );
}
