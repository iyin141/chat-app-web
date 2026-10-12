'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../img/Logo_2.png'
import { LogoutButton } from '@/components/logout-button'
import { useState } from 'react';
import { MessageCircle, Users, Archive, Settings, Moon , User2Icon } from 'lucide-react';
import { useThemeStore } from '@/components/Theme'
import { useRouter, useSearchParams } from "next/navigation";










const Nav = () => {

  const router = useRouter();
    const searchParams = useSearchParams();

  const { toggleTheme } = useThemeStore();
  
  
  const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };


  

 const [activeItem, setActiveItem] = useState('messages');

  const navItems = [
    { id: 'messages', icon: MessageCircle, label: 'Messages' , action: () => {updateView('default')}},
    { id: 'contacts', icon: Users, label: 'Contacts' ,action: () => {updateView('Friends')} },
    { id: 'brightness', icon: Moon, label: 'Brightness', action: () => {toggleTheme()}},
    { id: 'search', icon: User2Icon, label: 'User Profile', action: () => {updateView('Profile')}},
    { id: 'archive', icon: Archive, label: 'Archive', action: () => {} },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' ,action: () => {} },
   
  ];

    return (
      
      <aside 
      style={{
        width: '64px',
        backgroundColor: '#000000',
        borderRight: '1px solid #1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        position: 'relative',
      }}
      className='h-[100vh]'
    >
      {/* Logo */}
      <div 
        style={{
          
          marginBottom: '24px',
          cursor: 'pointer',
            transition: 'transform 0.2s ease'
          
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
           <div><Image src={logo} alt="Logo" className='w-[2.5rem]' /></div>
      </div>

      {/* Divider */}
      <div 
        style={{
          width: '32px',
          height: '1px',
          backgroundColor: '#1a1a1a',
          marginBottom: '16px',
        }}
      />

      {/* Main Navigation */}
      <nav style={{ flex: 1, width: '100%' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {setActiveItem(item.id); item.action()}}
              style={{
                width: '100%',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#000000' : '#ffffff',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                marginBottom: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#0a0a0a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              title={item.label}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '2px',
                    height: '24px',
                    backgroundColor: '#000000',
                    borderRadius: '0 2px 2px 0',
                  }}
                />
              )}
              <Icon 
                style={{
                  width: '20px',
                  height: '20px',
                  strokeWidth: isActive ? 2.5 : 2,
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div 
        style={{
          width: '32px',
          height: '1px',
          backgroundColor: '#1a1a1a',
          marginBottom: '16px',
        }}
      />

      {/* Bottom Navigation */}
      <div style={{ width: '100%' }} className='flex flex-col gap-2'>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              style={{
                width: '100%',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#000000' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#0a0a0a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              title={item.label}
            >
              <Icon 
                style={{
                  width: '20px',
                  height: '20px',
                  strokeWidth: isActive ? 2.5 : 2,
                }}
              />
            </button>
          );
        })}
          <LogoutButton />
      </div>
    </aside>
  )
}

export default Nav
