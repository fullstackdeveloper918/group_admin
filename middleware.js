import { NextResponse } from 'next/server'
 
// This function can be marked async if using await inside
export function middleware(request) {
    const userToken = request.cookies.get('token')?.value;
    // const userToken = null;
    console.log(userToken,"usser token");
   
    if(!userToken){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    else{
        return NextResponse.next();
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/dashboard/:path*"],
}