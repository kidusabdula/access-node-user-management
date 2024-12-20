import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = signupSchema.parse(body);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return NextResponse.json(user);
}
