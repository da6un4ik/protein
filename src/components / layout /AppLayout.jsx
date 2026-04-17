import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Heart, Search, ShoppingCart } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/search', icon: Search, label: 'Поиск' },
  { path: '/favorites', icon: Heart, label: 'Избранное' },
  { path: '/shopping', icon: ShoppingCart, label: 'Покупки' },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative flex flex-col items-center gap-0.5 py-1 px-4"
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted-foreground'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
        {/* Safe area for iPhones */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
