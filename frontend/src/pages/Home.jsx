import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plane, Compass, Sparkles, Navigation, ArrowRight, Shield, Zap, Globe } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm w-fit">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">Next Gen Travel Planning</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              Plan your next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 italic">masterpiece.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Stop spending hours researching. Our AI-driven engine crafts production-ready travel itineraries in seconds, tailored to your budget and interests.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('/itinerary')}
                className="btn-premium px-10 py-5 text-lg"
              >
                Start Planning <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-outline px-10 py-5 text-lg">
                View Examples
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-black" alt="" />
                ))}
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-black flex items-center justify-center text-[10px] font-bold">+2k</div>
              </div>
              <p className="text-sm font-medium text-slate-500">Joined by 2,000+ happy travelers</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-card p-4 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1506012733851-46297839fa31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Travel" 
                className="rounded-[1.5rem] w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 right-10 glass p-6 rounded-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase mb-1">Upcoming Trip</p>
                    <h3 className="text-white text-2xl font-bold">Santorini, Greece</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900">
                    <Navigation className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 glass-card p-5 z-20 flex items-center gap-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold">Verified Routes</p>
                <p className="text-xs text-slate-500">100% Secure Plans</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -right-10 glass-card p-5 z-20 flex items-center gap-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Powered</p>
                <p className="text-xs text-slate-500">Instant Generation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Logo Cloud */}
      <section className="py-24 px-6 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-12 grayscale opacity-50">
          <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter">
            <Globe className="w-8 h-8" /> <span>Expedia</span>
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter">
            <Plane className="w-8 h-8" /> <span>SkyScanner</span>
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter">
            <Compass className="w-8 h-8" /> <span>Booking</span>
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter">
            <Sparkles className="w-8 h-8" /> <span>Airbnb</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Why choose NomadAI?</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Our platform combines advanced machine learning with travel expertise to provide a seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Hyper-Personalized",
              desc: "Every itinerary is unique to your interests, speed, and budget.",
              icon: Sparkles,
              color: "text-blue-500",
              bg: "bg-blue-50 dark:bg-blue-900/20"
            },
            {
              title: "Smart Logistics",
              desc: "Optimized travel routes that minimize transit and maximize experience.",
              icon: Navigation,
              color: "text-purple-500",
              bg: "bg-purple-50 dark:bg-purple-900/20"
            },
            {
              title: "Real-time Updates",
              desc: "AI that adapts to your needs and provides dynamic replanning.",
              icon: Zap,
              color: "text-amber-500",
              bg: "bg-amber-50 dark:bg-amber-900/20"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 group"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-[15deg]`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
