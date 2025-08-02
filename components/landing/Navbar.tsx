'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BarChart3, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-sky rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              VideoAnalyzer Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              功能特性
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              价格方案
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              登录
            </Link>
            <Button asChild>
              <Link href="/register">免费开始</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-gray-600 hover:text-gray-900 transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                功能特性
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-600 hover:text-gray-900 transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                价格方案
              </Link>
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                登录
              </Link>
              <div className="px-4">
                <Button asChild className="w-full">
                  <Link href="/register">免费开始</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}