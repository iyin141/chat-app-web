
import React from 'react'
import './components/Home.css'
import {Inter } from "next/font/google";
import Navigation from './components/Naviagtion';
import HeroSection from './components/Hero';
import FloatingAssets from './components/Floatingmessages';


const font = Inter({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const Home = () => {
  return (
    <div className={`${font.className}flex flex-col h-[100vh]`}>
      
      <Navigation />
      <main>
        <HeroSection />
        <FloatingAssets />
      </main>
    </div>
  )
}

export default Home
