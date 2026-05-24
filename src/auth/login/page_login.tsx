'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos. Verifique e tente novamente.')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🧠</div>
          <h1 className="text-xl font-medium text-white">PatternAI</h1>
          <p className="text-sm text-[#4a6080] mt-1">Acesse sua conta</p>
        </div>

        <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-6">
          <div className="mb-4">
            <label className="block text-xs text-[#4a6080] uppercase tracking-wider mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-[#060c18] border border-[#1e2a45] rounded-lg px-3 py-2 text-sm text-[#c0cce0] outline-none focus:border-[#4fc3f7] transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-[#4a6080] uppercase tracking-wider mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="w-full bg-[#060c18] border border-[#1e2a45] rounded-lg px-3 py-2 text-sm text-[#c0cce0] outline-none focus:border-[#4fc3f7] transition-colors"
            />
          </div>

          {error && (
            <div className="mb-4 bg-[#3a1a1a] border border-[#f87171] rounded-lg px-3 py-2 text-xs text-[#f87171]">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full bg-[#1a3a5a] border border-[#4fc3f7] text-[#4fc3f7] rounded-lg py-2.5 text-sm font-medium hover:bg-[#1e4570] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="mt-4 pt-4 border-t border-[#1e2a45] text-center text-xs text-[#4a6080]">
            Ainda não tem conta?{' '}
            <Link href="/auth/cadastro" className="text-[#4fc3f7] hover:underline">
              Criar conta
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
