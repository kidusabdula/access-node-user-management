import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Signed out successfully' });
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      path: '/',
      maxAge: 0, 
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Error signing out', error: (error as Error).message },
      { status: 500 }
    );
  }
}
