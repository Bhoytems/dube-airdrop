
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Users, Gift, Share2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [referralStats] = useState({
    totalReferrals: 12,
    totalEarned: 2400,
    pendingRewards: 300
  });

  const [referrals] = useState([
    { 
      id: 1, 
      name: "Alice Johnson", 
      username: "alicecrypto", 
      joinDate: "2024-05-15", 
      earned: 200, 
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 2, 
      name: "Bob Smith", 
      username: "bobsmith", 
      joinDate: "2024-05-18", 
      earned: 200, 
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 3, 
      name: "Charlie Brown", 
      username: "charlieb", 
      joinDate: "2024-05-20", 
      earned: 200, 
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 4, 
      name: "Diana Wilson", 
      username: "dianaw", 
      joinDate: "2024-05-22", 
      earned: 200, 
      avatar: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=150&h=150&fit=crop&crop=face" 
    },
    { 
      id: 5, 
      name: "Eva Martinez", 
      username: "evam", 
      joinDate: "2024-05-25", 
      earned: 200, 
      avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop&crop=face" 
    }
  ]);

  const { toast } = useToast();
  const referralLink = "https://t.me/DUBEAirdropBot?start=ref_cryptouser";

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied! 📋",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join DUBE Airdrop',
        text: 'Join me on DUBE and earn free crypto tokens! 🚀',
        url: referralLink,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-blue-200">Invite friends and earn together</p>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg border-green-400/30">
            <CardContent className="p-4 text-center">
              <UserPlus className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{referralStats.totalReferrals}</div>
              <p className="text-sm text-green-200">Total Referrals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{referralStats.totalEarned}</div>
              <p className="text-sm text-yellow-200">Total Earned</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg border-blue-400/30">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{referralStats.pendingRewards}</div>
              <p className="text-sm text-blue-200">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Bonus Info */}
        <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border-green-400/30 mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <Gift className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Earn 200 DUBE per Referral!</h3>
              <p className="text-green-200 text-sm">
                Invite your friends and both of you will receive 200 DUBE tokens when they join!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-blue-400" />
              Your Referral Link
            </h3>
            
            <div className="bg-white/5 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-200 break-all">{referralLink}</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={copyReferralLink}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              
              <Button 
                onClick={shareReferralLink}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral List */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            Your Referrals ({referrals.length})
          </h3>
          
          <div className="space-y-3">
            {referrals.map((referral) => (
              <Card key={referral.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={referral.avatar} 
                        alt={referral.name}
                        className="w-12 h-12 rounded-full border-2 border-green-400/30"
                      />
                      <div>
                        <h4 className="font-semibold">{referral.name}</h4>
                        <p className="text-sm text-blue-200">@{referral.username}</p>
                        <p className="text-xs text-green-300">Joined: {referral.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className="bg-green-600 text-white">
                        +{referral.earned} DUBE
                      </Badge>
                    </div>
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

export default Referral;
