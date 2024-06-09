import { UserButton } from '@clerk/nextjs';

import { MainNav } from '@/components/main-nav';
import { StoreSwitcher } from '@/components/store-switcher';
import { db } from '@/lib/db';
import { ThemeButton } from '@/components/theme-button';

export const Navbar = async () => {
  const stores = await db.store.findMany();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeButton />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
