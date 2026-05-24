'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmarPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setStatus('success')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else if (event === 'USER_UPDATED') {
        setStatus('success')
        setTimeout(() => router.push('/dashboard'), 2000)
      }
    })

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('success')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setTimeout(() => setStatus('error'), 3000)
      }
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {status === 'loading' && (
          <>
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <h2 className="text-lg font-medium text-white mb-2">Confirmando sua conta...</h2>
            <p className="text-sm text-[#4a6080]">Aguarde um momento</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-lg font-medium text-white mb-2">E-mail confirmado!</h2>
            <p className="text-sm text-[#4a6080]">Redirecionando para o dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-lg font-medium text-white mb-2">Link inválido ou expirado</h2>
            <p className="text-sm text-[#4a6080] mb-6">
              O link de confirmação expirou. Faça login para receber um novo.
            </p>
            <Link href="/auth/login" className="text-[#4fc3f7] text-sm hover:underline">
              Ir para o login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
