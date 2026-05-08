import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Calendar, Wallet, Compass, Loader2, DollarSign, 
  Clock, Map, Search, ChevronRight, Star, ArrowRight, X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Itinerary = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    budget: 2000,
    travelStyle: 'Balanced',
    interests: []
  });
  
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');

  const interestsList = [
    { name: 'Culture', icon: '🏛️' },
    { name: 'Food', icon: '🍜' },
    { name: 'Nature', icon: '🌲' },
    { name: 'Adventure', icon: '🧗' },
    { name: 'Relaxation', icon: '🧘' },
    { name: 'Nightlife', icon: '🌃' },
    { name: 'History', icon: '📜' },
    { name: 'Shopping', icon: '🛍️' }
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination) {
      setError('Please enter a destination.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget: formData.budget > 5000 ? 'Luxury' : formData.budget > 1000 ? 'Moderate' : 'Budget'
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate itinerary');
      
      const data = await response.json();
      setItinerary(data);
      // Scroll to results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-mesh min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Plan your adventure</h1>
              <p className="text-slate-500 text-lg">Tell us your preferences and let our AI do the magic.</p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10 shadow-2xl shadow-primary-500/5"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Destination */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Where do you want to go?"
                      className="input-premium pl-12 py-5 text-lg"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>

                {/* Duration & Budget Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                      <span>Duration</span>
                      <span className="text-primary-500">{formData.duration} days</span>
                    </label>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200 dark:border-white/5">
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({...p, duration: Math.max(1, p.duration - 1)}))}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5 active:scale-90 transition-transform"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-xl">{formData.duration}</span>
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({...p, duration: Math.min(14, p.duration + 1)}))}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5 active:scale-90 transition-transform"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Travel Style</label>
                    <select 
                      className="input-premium py-4 appearance-none"
                      value={formData.travelStyle}
                      onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
                    >
                      <option>Relaxed</option>
                      <option>Balanced</option>
                      <option>Action-Packed</option>
                    </select>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-6">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                    <span>Target Budget</span>
                    <span className="text-primary-500 text-xl font-bold font-display">${formData.budget.toLocaleString()}</span>
                  </label>
                  <div className="relative px-2">
                    <input 
                      type="range" 
                      min="500" max="10000" step="500"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span>Budget</span>
                      <span>Moderate</span>
                      <span>Luxury</span>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Your Interests</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {interestsList.map(interest => (
                      <button
                        key={interest.name}
                        type="button"
                        onClick={() => handleInterestToggle(interest.name)}
                        className={cn(
                          "p-4 rounded-2xl text-xs font-bold transition-all border flex flex-col items-center gap-2",
                          formData.interests.includes(interest.name)
                            ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-xl"
                            : "bg-white border-slate-100 dark:bg-slate-900/50 dark:border-white/5 text-slate-500 hover:border-slate-300"
                        )}
                      >
                        <span className="text-2xl">{interest.icon}</span>
                        {interest.name}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl text-sm font-medium flex items-center gap-3">
                    <X className="w-4 h-4" /> {error}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-premium py-6 text-xl group"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
                  {loading ? 'Creating your masterpiece...' : 'Generate Itinerary'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card border-none bg-white/40 dark:bg-black/40"
                >
                  <div className="relative mb-12">
                    <div className="w-32 h-32 border-8 border-slate-100 dark:border-white/5 rounded-full"></div>
                    <div className="w-32 h-32 border-8 border-primary-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0 shadow-[0_0_40px_rgba(14,165,233,0.3)]"></div>
                    <Plane className="w-12 h-12 text-primary-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Crafting the perfect trip...</h3>
                  <p className="text-slate-500 text-center max-w-sm text-lg">Our AI is coordinating with local guides and checking the best spots for you.</p>
                </motion.div>
              ) : itinerary ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-10"
                >
                  {/* Header Card */}
                  <div className="glass-card p-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full"></div>
                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-primary-400 font-bold uppercase tracking-[0.2em] text-xs mb-2">Generated Itinerary</p>
                          <h2 className="text-5xl font-bold">{formData.destination}</h2>
                        </div>
                        <div className="bg-white/10 dark:bg-slate-100 p-4 rounded-3xl backdrop-blur-md">
                          <Compass className="w-8 h-8" />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 dark:border-slate-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary-400" />
                          <span className="font-bold">{formData.duration} Days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-primary-400" />
                          <span className="font-bold">Est. {itinerary.estimatedTotalCost || `$${formData.budget}`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary-400" />
                          <span className="font-bold">{formData.travelStyle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Daily Est.', value: itinerary.dailyEstimate || `$${(formData.budget / formData.duration).toFixed(0)}`, icon: Clock, color: 'text-blue-500' },
                  { label: 'Total Budget', value: `$${formData.budget.toLocaleString()}`, icon: Wallet, color: 'text-emerald-500' },
                  { label: 'Dest.', value: formData.destination, icon: Map, color: 'text-amber-500' },
                  { label: 'Style', value: formData.travelStyle, icon: Star, color: 'text-purple-500' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <p className="font-bold text-sm">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Intelligent Budget Planner */}
              {itinerary.budgetBreakdown && (
                <div className="glass-card p-8">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Budget Planner</h3>
                      <p className="text-slate-500 text-sm">AI-driven expense distribution</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Est. Total</p>
                      <p className="text-2xl font-bold text-primary-500">{itinerary.estimatedTotalCost || `$${formData.budget}`}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      {[
                        { key: 'transport', label: 'Transport', color: 'bg-blue-500', icon: '🚆' },
                        { key: 'accommodation', label: 'Accommodation', color: 'bg-emerald-500', icon: '🏨' },
                        { key: 'food', label: 'Food & Dining', color: 'bg-amber-500', icon: '🍲' },
                        { key: 'activities', label: 'Activities', color: 'bg-purple-500', icon: '🎟️' }
                      ].map((item) => (
                        <div key={item.key} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="flex items-center gap-2">
                              <span>{item.icon}</span> {item.label}
                            </span>
                            <span className="text-slate-500">{itinerary.budgetBreakdown[item.key] || '25%'}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: itinerary.budgetBreakdown[item.key]?.includes('%') ? itinerary.budgetBreakdown[item.key] : '25%' }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={cn("h-full rounded-full", item.color)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-6 space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" /> Optimization Suggestions
                      </h4>
                      <ul className="space-y-4">
                        {(itinerary.optimizationSuggestions || [
                          "Book your flights on Tuesday for lower prices.",
                          "Consider a 3-day transit pass to save on transport.",
                          "Visit free museums on the first Sunday of the month."
                        ]).map((sug, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-300">{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

                  {/* Recommendations, Food, and Tips Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Must Visit */}
                    <div className="glass-card p-6 bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-primary-500" /> Must Visit
                      </h4>
                      <ul className="space-y-3">
                        {(itinerary.recommendations || []).slice(0, 3).map((rec, i) => (
                          <li key={i} className="text-xs font-semibold flex gap-2">
                            <span className="text-primary-500">•</span> {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Food */}
                    <div className="glass-card p-6 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" /> Culinary
                      </h4>
                      <ul className="space-y-3">
                        {(itinerary.foodRecommendations || ["Try local street food", "Visit the night market"]).map((food, i) => (
                          <li key={i} className="text-xs font-semibold flex gap-2">
                            <span className="text-amber-500">•</span> {food}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div className="glass-card p-6 bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-500" /> Pro Tips
                      </h4>
                      <ul className="space-y-3">
                        {(itinerary.travelTips || ["Pack light", "Learn basic phrases"]).map((tip, i) => (
                          <li key={i} className="text-xs font-semibold flex gap-2">
                            <span className="text-purple-500">•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Day Cards */}
                  <div className="flex flex-col gap-8">
                    {itinerary.days?.map((day, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card overflow-hidden"
                      >
                        <div className="bg-slate-50 dark:bg-white/5 p-8 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col items-center justify-center shadow-lg">
                              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Day</span>
                              <span className="text-2xl font-bold leading-none">{day.day}</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">{day.theme}</h3>
                              <p className="text-slate-500 text-sm font-medium">Daily Highlights</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-8 space-y-8">
                          {day.activities?.map((act, i) => (
                            <div key={i} className="flex gap-8 group">
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-4 border-primary-500 bg-white dark:bg-black group-hover:scale-150 transition-transform"></div>
                                {i !== day.activities.length - 1 && <div className="flex-1 w-0.5 bg-slate-100 dark:bg-white/10 my-1"></div>}
                              </div>
                              <div className="flex-1 pb-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">{act.time}</span>
                                    <h4 className="text-xl font-bold group-hover:text-primary-500 transition-colors">{act.title}</h4>
                                  </div>
                                  {act.cost && (
                                    <div className="text-sm font-bold bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-2">
                                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                      {act.cost}
                                    </div>
                                  )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{act.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="glass-card p-12 text-center flex flex-col items-center gap-6 border-dashed bg-transparent border-slate-200 dark:border-white/10">
                    <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                      <Map className="w-10 h-10 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Ready to explore?</h3>
                      <p className="text-slate-500">Save this itinerary to your profile or export it as a PDF.</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="btn-premium px-8">Save Itinerary</button>
                      <button className="btn-outline px-8">Export PDF</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card border-dashed bg-transparent border-slate-200 dark:border-white/10 opacity-60">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-slate-200 dark:border-white/10 flex items-center justify-center mb-8"
                  >
                    <Compass className="w-12 h-12 text-slate-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-400">Waiting for your plan</h3>
                  <p className="text-slate-500 text-center max-w-xs mt-3">Fill out the form on the left to see your personalized travel guide appear here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
