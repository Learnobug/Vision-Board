'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: { children: React.ReactNode }, {session}: { session: any }) => {
  return (
   <SessionProvider session={session}>
   {children}
   </SessionProvider>
    
  );
};