"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export default async function getMyToken(){
  try{
   // Get session token from cookies
    const decodedToken = (await cookies()).get('next-auth.session-token')?.value || 
    (await cookies()).get('__Secure-next-auth.session-token')?.value;

  // If no token in cookies → return null
  if(!decodedToken) return null;

  // Decode token using NEXTAUTH_SECRET
    const token = await decode({token: decodedToken,secret:process.env.NEXTAUTH_SECRET!});

    
    return token?.token || null;
  }catch(err:unknown){
    if(err instanceof Error){
      return;
    }
  return null;
  }
}