import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Params is required!', { status: 400 });
    }

    const store = await db.store.updateMany({
      where: { id: params.storeId, userId },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Params is required!', { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: { id: params.storeId, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};
