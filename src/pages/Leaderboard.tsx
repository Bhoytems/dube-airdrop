
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import Footer from "@/components/Footer";

const Leaderboard = () => {
  const [leaderboardData] = useState([
    { 
      id: 1, 
      rank: 1, 
      name: "CryptoKing", 
      username: "cryptoking", 
      balance: 45230, 
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 2, 
      rank: 2, 
      name: "BlockchainQueen", 
      username: "blockchainqueen", 
      balance: 38150, 
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 3, 
      rank: 3, 
      name: "TokenMaster", 
      username: "tokenmaster", 
      balance: 32890, 
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 4, 
      rank: 4, 
      name: "DeFiExplorer", 
      username: "defiexplorer", 
      balance: 28750, 
      avatar: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 5, 
      rank: 5, 
      name: "NFTCollector", 
      username: "nftcollector", 
      balance: 24680, 
      avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 6, 
      rank: 6, 
      name: "Crypto Enthusiast", 
      username: "cryptouser", 
      balance: 12750, 
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      isCurrentUser: true 
    },
    { 
      id: 7, 
      rank: 7, 
      name: "AltcoinHunter", 
      username: "altcoinhunter", 
      balance: 9840, 
      avatar: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face" 
    }
  ]);

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-blue-400" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch(rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-700";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-blue-200">Top DUBE Token Holders</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <Card 
              key={user.id} 
              className={`${
                index === 0 ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/30' :
                index === 1 ? 'bg-gradient-to-br from-gray-300/20 to-gray-500/20 border-gray-400/30' :
                'bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-amber-500/30'
              } backdrop-blur-lg ${index === 0 ? 'scale-105' : ''}`}
            >
              <CardContent className="p-4 text-center">
                <div className="relative mb-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-16 h-16 rounded-full mx-auto border-2 border-white/30 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{user.name}</h3>
                <p className="text-xs text-blue-200 mb-2">@{user.username}</p>
                <div className="text-lg font-bold text-yellow-400">
                  {user.balance.toLocaleString()}
                </div>
                <p className="text-xs text-blue-200">DUBE</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <Card 
              key={user.id} 
              className={`${
                user.isCurrentUser 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-400/40' 
                  : 'bg-white/10 border-white/20'
              } backdrop-blur-lg`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getRankBadgeColor(user.rank)} text-white px-3 py-1`}>
                      #{user.rank}
                    </Badge>
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {user.name}
                      {user.isCurrentUser && (
                        <Badge className="ml-2 bg-blue-600 text-white text-xs">You</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-blue-200">@{user.username}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-400">
                      {user.balance.toLocaleString()}
                    </div>
                    <p className="text-sm text-blue-200">DUBE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;
