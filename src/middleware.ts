import { type NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/analisar']
const AUTH_ONLY = ['/auth/login', '/auth/cadastro']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Verificar sessão pelo cookie do Supabase
  const hasSession = request.cookies.getAll().some(
    c => c.name.includes('sb-') && c.name.includes('-auth-token')
  )

  if (PROTECTED.some(r => path.startsWith(r)) && !hasSession) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (AUTH_ONLY.some(r => path.startsWith(r)) && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
