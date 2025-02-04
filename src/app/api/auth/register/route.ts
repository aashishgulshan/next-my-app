import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@src/db/db";
import User from "@/src/models/user";
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email Already Exist !" },
        { status: 400 }
      );
    }
    await User.create({ email, password });
    return NextResponse.json(
      { message: "User Created Success" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unable to register user !" },
      { status: 500 }
    );
  }
}
