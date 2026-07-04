// Client-side logic
import React from 'react';
import ReactDOM from 'react-dom';

class RateLimiterApp extends React.Component {
// minor polish
  constructor(props) {
    super(props);
    this.state = {
      rateLimit: 0,
      requests: 0,
    };
// rewrote this part

    this.updateRateLimit = this.updateRateLimit.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    fetch('/api/rate-limit')
      .then((res) => res.text())
      .then((rateLimit) => {
        this.setState({ rateLimit: parseInt(rateLimit) });
      });
  }

  updateRateLimit() {
    const newRateLimit = document.getElementById('new-rate-limit').value;
    fetch('/api/rate-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rateLimit: newRateLimit }),
    })
      .then((res) => res.text())
      .then((rateLimit) => {
        this.setState({ rateLimit: parseInt(rateLimit) });
      });
  }

  getStats() {
    fetch('/api/stats')
      .then((res) => res.text())
      .then((requests) => {
        this.setState({ requests: parseInt(requests) });
      });
  }

  render() {
    return (
      <div>
        <h1>Rate Limiter App</h1>
        <p>Rate limit: {this.state.rateLimit}</p>
        <input id="new-rate-limit" type="number" />
        <button onClick={this.updateRateLimit}>Update rate limit</button>
        <p>Requests: {this.state.requests}</p>
        <button onClick={this.getStats}>Get stats</button>
      </div>
    );
  }
}

ReactDOM.render(<RateLimiterApp />, document.getElementById('root'));