import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, ThumbsUp, ThumbsDown, MessageCircle, 
  Sparkles, Loader2, ArrowRight, MapPin, Gem, ShieldAlert
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Reviews = () => {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination })
      });
      
      if (!response.ok) throw new Error('Failed to analyze reviews');
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-mesh min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-500 border border-primary-100 dark:border-primary-800"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Experience Analyzer</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight"
          >
            Know before you <span className="text-primary-500 italic">go.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl max-w-2xl"
          >
            Our AI analyzes thousands of traveler reviews to give you the real story on any destination.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative mt-4"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Enter destination (e.g. Bali, Indonesia)"
                className="w-full pl-16 pr-32 py-6 rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl shadow-primary-500/5 border-none outline-none focus:ring-2 focus:ring-primary-500/20 text-lg"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn-premium py-4 px-8"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
              </button>
            </div>
          </motion.form>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 border-4 border-slate-100 dark:border-white/5 rounded-full"></div>
                <div className="w-24 h-24 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                <Sparkles className="w-8 h-8 text-primary-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xl font-bold animate-pulse">Reading traveler stories...</p>
            </motion.div>
          ) : data ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column - Overview */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="glass-card p-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>
                  <div className="relative z-10">
                    <p className="text-primary-400 font-bold uppercase tracking-widest text-xs mb-4">Overall Score</p>
                    <div className="flex items-end gap-2 mb-6">
                      <span className="text-7xl font-bold">{data.overallRating}</span>
                      <span className="text-2xl font-bold opacity-40 mb-2">/ 5.0</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("w-6 h-6", s <= Math.round(data.overallRating) ? "text-yellow-400 fill-yellow-400" : "text-white/20")} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 space-y-8">
                  <h3 className="text-xl font-bold">Sentiment Analysis</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Positive', value: data.sentimentDistribution.positive, color: 'bg-emerald-500', icon: ThumbsUp },
                      { label: 'Neutral', value: data.sentimentDistribution.neutral, color: 'bg-slate-400', icon: MessageCircle },
                      { label: 'Negative', value: data.sentimentDistribution.negative, color: 'bg-rose-500', icon: ThumbsDown }
                    ].map((s) => (
                      <div key={s.label} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="flex items-center gap-2">
                            <s.icon className="w-4 h-4 text-slate-400" /> {s.label}
                          </span>
                          <span>{s.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${s.value}%` }}
                            className={cn("h-full", s.color)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-8 bg-primary-500 text-white border-none">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> AI Insight
                  </h3>
                  <p className="text-white/90 leading-relaxed italic">
                    "{data.aiInsights}"
                  </p>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass-card p-8 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/10">
                    <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-600">
                      <ThumbsUp className="w-5 h-5" /> What people love
                    </h4>
                    <ul className="space-y-4">
                      {data.strengths.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 mt-0.5">
                            <ArrowRight className="w-3 h-3 text-emerald-600" />
                          </div>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-8 border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-900/10">
                    <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-rose-600">
                      <ShieldAlert className="w-5 h-5" /> Common complaints
                    </h4>
                    <ul className="space-y-4">
                      {data.commonComplaints.map((c, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center shrink-0 mt-0.5">
                            <ArrowRight className="w-3 h-3 text-rose-600" />
                          </div>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <Gem className="w-6 h-6 text-primary-500" /> Hidden Gems & Experiences
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.hiddenGems.map((gem, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                        <h5 className="font-bold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary-500" /> {gem.name}
                        </h5>
                        <p className="text-sm text-slate-500 leading-relaxed">{gem.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-slate-400" /> Sample Reviews
                  </h3>
                  <div className="flex flex-col gap-4">
                    {data.sampleReviews.map((rev, i) => (
                      <div key={i} className="glass-card p-6 border-none shadow-sm bg-white/50 dark:bg-white/5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
                              {rev.user[0]}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{rev.user}</p>
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className={cn("w-3 h-3", s <= rev.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            rev.sentiment === 'positive' ? "bg-emerald-100 text-emerald-600" : 
                            rev.sentiment === 'negative' ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-600"
                          )}>
                            {rev.sentiment}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm italic leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-20 text-center opacity-40">
              <MessageCircle className="w-20 h-20 mx-auto mb-6 text-slate-300" />
              <p className="text-xl font-bold">Search for a destination to start the analysis.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
