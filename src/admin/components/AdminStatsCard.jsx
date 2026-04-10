import '../styles/AdminDashboard.css';

const AdminStatsCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className={`stat-card ${colorClass}`}>
    <div className={`stat-icon-wrapper ${colorClass}`}>
      <Icon className="stat-icon" strokeWidth={2} />
    </div>
    
    <p className="stat-title">{title}</p>
    <h3 className="stat-value">{value}</h3>
    
    {trend && (
      <div className="stat-trend">
        <svg className="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="trend-value">{trend}</span>
        <span className="trend-label">vs last month</span>
      </div>
    )}
  </div>
);

export default AdminStatsCard;