import React from 'react';
import { Card, Progress, Button, Input, Typography, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import '../style/Goal.css';
import Navbar from '../components/Nav';

const { Title, Text } = Typography;

export default function GoalSetting() {
  const goals = [
    { name: 'Weekend Trip', target: 5000, current: 3250, date: 'December 2023' },
    { name: 'New Laptop', target: 50000, current: 15000, date: 'March 2024' },
  ];

  return (
    <>
    <Navbar/>
    <div className="goal-container">
      <Title level={1} className="goal-title">Your Savings Goals</Title>

      <div className="goal-grid">
        {goals.map((goal, index) => (
          <Card key={index} className="goal-card">
            <Title level={4}>{goal.name}</Title>
            <Text type="secondary">Target: ₹{goal.target} by {goal.date}</Text>
            <div className="goal-progress">
              <Text>Progress</Text>
              <Text>{Math.round((goal.current / goal.target) * 100)}%</Text>
            </div>
            <Progress percent={(goal.current / goal.target) * 100} strokeColor="#52c41a" />
            <Text>₹{goal.current} saved of ₹{goal.target}</Text>
          </Card>
        ))}
      </div>

      <Card className="goal-add-card">
        <Title level={4}>Add New Goal</Title>
        <Form layout="vertical">
          <Form.Item label="Goal Name" name="goal-name">
            <Input placeholder="e.g., New Phone" />
          </Form.Item>
          <Form.Item label="Target Amount (₹)" name="target-amount">
            <Input type="number" placeholder="e.g., 20000" />
          </Form.Item>
          <Form.Item label="Target Date" name="target-date">
            <Input type="date" />
          </Form.Item>
          <Button type="primary" icon={<PlusCircleOutlined />} className="goal-add-button" block>
            Add Goal
          </Button>
        </Form>
      </Card>
    </div></>
  );
}
