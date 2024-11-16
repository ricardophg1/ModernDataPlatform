import React from 'react';
import { Database } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed w-full bg-slate-900/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-white">DataForge AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-primary transition">Features</a>
          <a href="#integrations" className="text-white hover:text-primary transition">Integrations</a>
          <a href="#pricing" className="text-white hover:text-primary transition">Pricing</a>
        </div>
      </nav>
    </header>
  );
}