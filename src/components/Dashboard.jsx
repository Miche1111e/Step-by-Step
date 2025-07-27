import { LogOut } from 'lucide-react'; // using Lucide icons
import './Dashboard.css'; // for styling (optional)

export default function Dashboard({ user, logOut, children }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Step-by-Step</h1>
        <div className="dashboard-actions">
          <button onClick={logOut} className="logout-btn">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
