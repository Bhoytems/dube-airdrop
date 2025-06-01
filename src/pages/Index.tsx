
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Trophy, Users, Copy, Check, Gift, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Index = () => {
  const [balance, setBalance] = useState(12750);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Follow DUBE on Twitter", reward: 500, completed: false, icon: "🐦" },
    { id: 2, title: "Join DUBE Telegram Channel", reward: 300, completed: true, icon: "📱" },
    { id: 3, title: "Share DUBE on Social Media", reward: 200, completed: false, icon: "📢" },
    { id: 4, title: "Complete Profile Setup", reward: 150, completed: true, icon: "👤" },
    { id: 5, title: "Invite 3 Friends", reward: 1000, completed: false, icon: "👥" }
  ]);
  const { toast } = useToast();

  // Mock user data - in real app this would come from Telegram Web App API
  const user = {
    id: 123456789,
    firstName: "Crypto",
    lastName: "Enthusiast",
    username: "cryptouser",
    photoUrl: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`
  };

  const claimDailyBonus = () => {
    if (!dailyBonusClaimed) {
      setBalance(prev => prev + 100);
      setDailyBonusClaimed(true);
      toast({
        title: "Daily Bonus Claimed! 🎉",
        description: "You earned 100 DUBE tokens!",
      });
    }
  };

  const completeTask = (taskId: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setBalance(prevBalance => prevBalance + task.reward);
        toast({
          title: "Task Completed! ✅",
          description: `You earned ${task.reward} DUBE tokens!`,
        });
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            DUBE
          </h1>
          <p className="text-blue-200">Crypto Airdrop Platform</p>
        </div>

        {/* User Profile Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={user.photoUrl} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-blue-200">@{user.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30 mb-6">
          <CardContent className="p-6 text-center">
            <div className="mb-2">
              <span className="text-sm text-yellow-200">Your Balance</span>
            </div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {balance.toLocaleString()}
            </div>
            <div className="text-yellow-200">DUBE Tokens</div>
          </CardContent>
        </Card>

        {/* Daily Bonus */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="font-semibold">Daily Bonus</h3>
                  <p className="text-sm text-blue-200">100 DUBE tokens</p>
                </div>
              </div>
              <Button 
                onClick={claimDailyBonus}
                disabled={dailyBonusClaimed}
                className={`${dailyBonusClaimed 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                } shadow-lg`}
              >
                {dailyBonusClaimed ? 'Claimed' : 'Claim'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Complete Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{task.icon}</span>
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-green-400">+{task.reward} DUBE</p>
                      </div>
                    </div>
                    {task.completed ? (
                      <Badge className="bg-green-600 text-white">
                        <Check className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Button 
                        onClick={() => completeTask(task.id)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
