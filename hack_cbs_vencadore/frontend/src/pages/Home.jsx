import { ArrowRight, PiggyBank, TrendingUp, Heart } from 'lucide-react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

export default function Home() {
  const router = useNavigate();
  return (
    <div className="min-h-screen">
      
      <header className="header">
     <PiggyBank className="icon" />
     <span className="sr-only">Auto Round-Up</span>
      </header>
      <main className="main">
        <section className="section">
          <div className="container">
            <h1 className="section-title">Save More with Every Purchase</h1>
            <p className="section-description">
              Auto Round-Up helps you save and invest effortlessly. Round up your purchases and watch your savings grow.
            </p>
            <div style={{marginTop:"20px"}}>
              <Button type="primary" className="button-primary" onClick={()=>router('/Dashboard')}>Get Started</Button>
              <Button type="default" className="button-outline">Learn More</Button>
            </div>
          </div>
        </section>

        <section className="section bg-light">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="card-grid">
              <Card title={<div><PiggyBank className="icon" /> Round Up</div>}>
                <p>Every purchase you make is rounded up to the nearest whole number. The difference is automatically saved.</p>
              </Card>
              <Card title={<div><TrendingUp className="icon" /> Invest</div>}>
                <p>Choose where your savings go - from low-risk mutual funds to exciting tech stocks or even cryptocurrencies.</p>
              </Card>
              <Card title={<div><Heart className="icon" /> Donate</div>}>
                <p>Optionally, allocate a portion of your round-ups to causes you care about. Make an impact with every purchase.</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Start Saving Today</h2>
            <p className="section-description">
              Join thousands of users who are already saving more with every purchase. Sign up now and take control of your financial future.
            </p>
            <div style={{marginTop:"20px"}}>
               <Button type="primary" className="button-primary">
              Sign Up Now <ArrowRight className="icon-small" />
            </Button>
            </div>
           
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">© 2023 Auto Round-Up. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Privacy</a>
        </nav>
      </footer>
    </div>
  );
}
