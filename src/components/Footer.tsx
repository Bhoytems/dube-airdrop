
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, Users } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Users, label: 'Refer', path: '/referral' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-600/30 text-white' 
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-400' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
