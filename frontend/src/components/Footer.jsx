import React from 'react';
import { Compass, Instagram, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-slate-200 dark:border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2.5 bg-slate-900 dark:bg-white rounded-2xl">
                <Compass className="w-6 h-6 text-white dark:text-slate-900" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                Nomad<span className="text-primary-500">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
              Crafting perfect journeys with the power of artificial intelligence. Your next adventure starts here.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-xl border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-xs">Product</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'Plan Trip', 'Explore', 'Pricing'].map(item => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : '/itinerary'} className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About', 'Careers', 'Privacy', 'Terms'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2026 NomadAI. All rights reserved. Built for the future of travel.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Status</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Cookies</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
