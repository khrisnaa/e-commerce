import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

interface LayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  //check if store exist
  const store = await db.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
};
export default Layout;
