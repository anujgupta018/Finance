import { Card, Progress, Typography } from 'antd';
import { ArrowUpOutlined, WalletOutlined, HeartOutlined, DollarCircleOutlined } from '@ant-design/icons';
import '../style/Dashboard.css'; // Import the external CSS
import Navbar from '../components/Nav';

const { Title, Text } = Typography;

export default function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <Title level={1} className="dashboard-title">Auto Round-Up Dashboard</Title>

      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="dashboard-card-header">
            <Text>Total Savings</Text>
            <WalletOutlined className="dashboard-icon" />
          </div>
          <Title level={2}>₹1,234.56</Title>
          <Text type="secondary">+20.1% from last month</Text>
        </Card>

        <Card className="dashboard-card">
          <div className="dashboard-card-header">
            <Text>Investment</Text>
            <ArrowUpOutlined className="dashboard-icon" />
          </div>
          <Title level={2}>₹567.89</Title>
          <Text type="secondary">+10.5% return</Text>
        </Card>

        <Card className="dashboard-card">
          <div className="dashboard-card-header">
            <Text>Donations</Text>
            <HeartOutlined className="dashboard-icon" />
          </div>
          <Title level={2}>₹123.45</Title>
          <Text type="secondary">5 charities supported</Text>
        </Card>
      </div>

      <Card className="dashboard-progress-card">
        <Title level={4}>Savings Goal Progress</Title>
        <Text type="secondary">Weekend Trip by December</Text>
        <div className="dashboard-progress">
          <DollarCircleOutlined className="progress-icon" />
          <Progress percent={65} className="progress-bar" />
          <Text>65%</Text>
        </div>
        <Text type="secondary">Save ₹50 more a week to hit your target!</Text>
      </Card>

      <Card className="dashboard-transactions-card">
        <Title level={4}>Recent Transactions</Title>
        <div className="transactions-list">
          {[
            { name: 'Coffee Shop', amount: 78, roundUp: 2 },
            { name: 'Grocery Store', amount: 253, roundUp: 7 },
            { name: 'Movie Tickets', amount: 300, roundUp: 0 },
            { name: 'Coffee Shop', amount: 78, roundUp: 2 },
            { name: 'Grocery Store', amount: 253, roundUp: 7 },
            { name: 'Movie Tickets', amount: 300, roundUp: 0 },
            { name: 'Coffee Shop', amount: 78, roundUp: 2 },
            { name: 'Grocery Store', amount: 253, roundUp: 7 },
            { name: 'Movie Tickets', amount: 300, roundUp: 0 },
            { name: 'Coffee Shop', amount: 78, roundUp: 2 },
            { name: 'Grocery Store', amount: 253, roundUp: 7 },
            { name: 'Movie Tickets', amount: 300, roundUp: 0 },
          ].map((transaction, index) => (
            <div key={index} className="transaction-item">
              <div className="transaction-details">
                <Text>{transaction.name}</Text>
                <Text type="secondary">₹{transaction.amount}</Text>
              </div>
              <div className="transaction-roundup">
                <Text className="roundup-amount">+₹{transaction.roundUp}</Text>
                <Text type="secondary">Round-up</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div></>
  );
}

