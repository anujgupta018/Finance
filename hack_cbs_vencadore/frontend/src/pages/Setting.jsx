import { Card, Switch, Radio, Select, Typography } from 'antd';
import '../style/Settings.css';
import Navbar from '../components/Nav';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Settings() {
  return (
    <>
    <Navbar/>
    <div className="settings-container">
      <Title level={1} className="settings-title">Settings</Title>

      <Card className="settings-card">
        <Title level={4}>Round-Up Preferences</Title>
        <Text type="secondary">Customize how your transactions are rounded up</Text>
        <div className="settings-content">
          <div className="settings-item">
            <Text>Enable Round-Up</Text>
            <Switch />
          </div>
          <div className="settings-group">
            <Text>Round-Up To</Text>
            <Radio.Group defaultValue="next-10" className="settings-radio-group">
              <Radio value="next-whole">Next whole number (e.g., 3.75 to 4.00)</Radio>
              <Radio value="next-10">Next 10 (e.g., 3.75 to 10.00)</Radio>
              <Radio value="fixed">Fixed amount (e.g., always round up by 5)</Radio>
            </Radio.Group>
          </div>
        </div>
      </Card>

      <Card className="settings-card">
        <Title level={4}>Savings Allocation</Title>
        <Text type="secondary">Choose where your rounded-up savings go</Text>
        <div className="settings-content">
          <div className="settings-item">
            <Text>Primary Savings Goal</Text>
            <Select placeholder="Select a goal" className="settings-select">
              <Option value="weekend-trip">Weekend Trip</Option>
              <Option value="new-laptop">New Laptop</Option>
              <Option value="emergency-fund">Emergency Fund</Option>
            </Select>
          </div>
          <div className="settings-item">
            <Text>Investment Preference</Text>
            <Select placeholder="Select investment type" className="settings-select">
              <Option value="low-risk-mutual-funds">Low-risk Mutual Funds</Option>
              <Option value="etfs">ETFs</Option>
              <Option value="green-funds">Green Funds</Option>
              <Option value="tech-stocks">Tech Stocks</Option>
              <Option value="crypto">Cryptocurrency</Option>
            </Select>
          </div>
          <div className="settings-item">
            <Text>Donation Cause</Text>
            <Select placeholder="Select a cause" className="settings-select">
              <Option value="education">Education</Option>
              <Option value="environment">Environment</Option>
              <Option value="healthcare">Healthcare</Option>
              <Option value="animal-welfare">Animal Welfare</Option>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="settings-card">
        <Title level={4}>Notifications</Title>
        <Text type="secondary">Manage your notification preferences</Text>
        <div className="settings-content">
          <div className="settings-item">
            <Text>Push Notifications</Text>
            <Switch />
          </div>
          <div className="settings-item">
            <Text>Email Notifications</Text>
            <Switch />
          </div>
          <div className="settings-item">
            <Text>Weekly Summary</Text>
            <Switch />
          </div>
        </div>
      </Card>
    </div></>
  );
}
