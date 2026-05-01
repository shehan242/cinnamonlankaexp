
'use client';

import { useAppStore } from '@/lib/store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { currentUser } = useAppStore();

  useEffect(() => {
    if (currentUser) {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }, [currentUser]);

  return null;
}
