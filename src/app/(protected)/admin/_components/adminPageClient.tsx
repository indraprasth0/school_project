'use client';

import React, { useTransition, useState } from 'react';

import { LogoutButton } from '@/components/auth/logout-button';
import { Switch } from "@/components/ui/switch";

interface User {
  name: string;
  email: string;
  role: string;
  isTwoFactorEnabled: boolean;
}

function AdminPageClient({ user }: { user: User }) {
  const [enabled, setEnabled] = useState(user?.isTwoFactorEnabled);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    startTransition(async () => {
      try {
        const res = await fetch('/api/settings/2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ enabled: checked }),
        });

        if (!res.ok) {
          throw new Error('Failed to update 2FA status');
        }
      } catch (err) {
        console.error(err);
        setEnabled(!checked); // rollback on error
      }
    });
  };

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>2FA: {String(enabled)}  
      <Switch
        checked={enabled}
        onCheckedChange={handleToggle}
        className="w-16 h-8"
        disabled={isPending}
      />
        </p>
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
}

export default AdminPageClient;