import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });


  if(token){
      //Nexted Condation
      // If user is logged in → block /login and /register → redirect to home "/"
      if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register"){
          return NextResponse.redirect(new URL('/',request.url));
      }else{
          return NextResponse.next();
      }

        
  }else{
    // If user is not logged in → block /cart and /wishlist → redirect to "/login"
    if(request.nextUrl.pathname === "/cart" || request.nextUrl.pathname === "/wishlist"){
      return NextResponse.redirect(new URL('/login',request.url));
    }else{
      return NextResponse.next();
    }
    
  }
}

export const config={
  matcher:['/cart','/wishlist','/login','/register']
}