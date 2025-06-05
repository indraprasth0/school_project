import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from "@/lib/connectDB";
import User from '@/models/userModel'; 


export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enabled } = await req.json();
    if (typeof enabled !== 'boolean') {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }    

    await connectDB().catch((error) => {
        console.error("Failed to connect to the database:", error);
        throw new Error("Database connection error");
    });
    
    await User.findByIdAndUpdate(session.user.id, {
        isTwoFactorEnabled: enabled,
    });

    return NextResponse.json({ success: true });
}