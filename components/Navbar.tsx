'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                PA
              </div>
              <span className="text-slate-900 font-bold text-lg">Perkin AI</span>
            </Link>
            <div className="flex gap-1">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </Link>
              <Link
                href="/history"
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive('/history') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                History
              </Link>
            </div>
          </div>
          <Link
            href="/consent"
            className="ml-auto px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
          >
            Begin Screening
          </Link>
        </div>
      </div>
    </nav>
  );
}
