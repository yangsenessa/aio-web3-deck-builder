import React, { useState } from "react";
import { Mic, Zap, Check, Clock, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface Activity {
  id: string;
  timestamp: string;
  prompt: string;
  airdropAmount: number;
  status: "pending" | "completed" | "failed";
}

const AIOPage: React.FC = () => {
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      timestamp: "2025-11-04 10:30:00",
      prompt: "Turn on the living room light",
      airdropAmount: 100,
      status: "completed",
    },
    {
      id: "2",
      timestamp: "2025-11-04 09:15:00",
      prompt: "Set temperature to 22 degrees",
      airdropAmount: 150,
      status: "completed",
    },
  ]);

  const bannerImages = [
    "/lovable-uploads/933b5d5c-9fb3-40c5-9cd5-e8ffecad8ed4.png",
    "/AIO-Canister-Layer-Architecture.png",
    "/roadmap.png",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePayment = async () => {
    setPaymentStatus("processing");
    toast({
      title: "Processing Payment",
      description: "Please confirm the transaction in your wallet...",
    });

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success");
      toast({
        title: "Payment Successful!",
        description: "You can now use voice commands to control devices.",
      });
    }, 2000);
  };

  const handleVoiceRecord = async () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Speak your command...",
    });

    // Simulate voice recording and transcription
    setTimeout(() => {
      setIsRecording(false);
      setPrompt("Turn on the bedroom light");
      toast({
        title: "Voice Recognized",
        description: "Your command has been transcribed!",
      });
    }, 3000);
  };

  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      prompt: prompt,
      airdropAmount: Math.floor(Math.random() * 200) + 50,
      status: "pending",
    };

    setActivities([newActivity, ...activities]);
    
    toast({
      title: "Command Sent!",
      description: "Processing your request...",
    });

    // Simulate command processing
    setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === newActivity.id ? { ...a, status: "completed" } : a
        )
      );
      toast({
        title: "Success!",
        description: `Earned ${newActivity.airdropAmount} $AIO tokens!`,
      });
    }, 2000);

    setPrompt("");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Scrolling Banner */}
        <div className="relative overflow-hidden rounded-2xl h-48 sm:h-64 lg:h-80">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">
            Voice AI → IoT Device Control
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Mic className="w-8 h-8 text-indigo-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">1. Speak Command</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">2. AI Processes</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">3. AIO Network</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Check className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">4. Device Lights Up</div>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-200">Participate in Voice AI</h3>
              <p className="text-sm text-slate-400">Pay 0.001 ETH to unlock features</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30">
              <div className="flex items-center gap-2 text-indigo-300">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Info: 0.001 ETH to participate</span>
              </div>
            </div>

            {paymentStatus === "idle" && (
              <button
                onClick={handlePayment}
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all"
              >
                Pay & Unlock
              </button>
            )}

            {paymentStatus === "processing" && (
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-yellow-600/10 border border-yellow-500/30">
                <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                <span className="text-yellow-300 font-medium">Processing payment...</span>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-600/10 border border-green-500/30">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">Payment successful!</span>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input Card (shown after successful payment) */}
        {paymentStatus === "success" && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-200 mb-4">Voice Command</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmitPrompt()}
                placeholder="Type your command or use voice..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleVoiceRecord}
                disabled={isRecording}
                className={`p-3 rounded-xl border transition-all ${
                  isRecording
                    ? "bg-red-500/20 border-red-500 animate-pulse"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? "text-red-400" : "text-slate-400"}`} />
              </button>
              <button
                onClick={handleSubmitPrompt}
                disabled={!prompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Click the mic button to use ElevenLabs voice recognition
            </p>
          </div>
        )}

        {/* Activity Table */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-slate-200">Activity History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left text-slate-400">
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Command</th>
                  <th className="px-6 py-3 font-medium text-right">Airdrop Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                      {activity.timestamp}
                    </td>
                    <td className="px-6 py-4 text-slate-200">{activity.prompt}</td>
                    <td className="px-6 py-4 text-right font-mono text-indigo-400">
                      {activity.airdropAmount} $AIO
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                          activity.status === "completed"
                            ? "bg-green-600/10 border-green-500/30 text-green-400"
                            : activity.status === "pending"
                            ? "bg-yellow-600/10 border-yellow-500/30 text-yellow-400"
                            : "bg-red-600/10 border-red-500/30 text-red-400"
                        }`}
                      >
                        {activity.status === "completed" && <Check className="w-3 h-3" />}
                        {activity.status === "pending" && <Clock className="w-3 h-3" />}
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOPage;

