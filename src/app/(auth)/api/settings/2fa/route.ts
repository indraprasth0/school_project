import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

import User from '@/models/userModel'; 
import dbConnect from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enabled } = await req.json();

    await dbConnect();

    await User.findByIdAndUpdate(session.user.id, {
        isTwoFactorEnabled: enabled,
    });

    return NextResponse.json({ success: true });
}