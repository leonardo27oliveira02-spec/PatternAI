'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  async function handleCadastro() {
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nome },
        emailRedirectTo: `${window.location.origin}/auth/confirmar`,
      },
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? 'Este e-mail já está cadastrado. Faça login.'
        : 'Erro ao criar conta. Tente novamente.')
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-lg font-medium text-white mb-2">Confirme seu e-mail</h2>
          <p className="text-sm text-[#4a6080] mb-6">
            Enviamos um link de confirmação para <strong className="text-[#c0cce0]">{email}</strong>.
            Acesse seu e-mail e clique no link para ativar sua conta.
          </p>
          <Link href="/auth/login" className="text-[#4fc3f7] text-sm hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🧠</div>
          <h1 className="text-xl font-medium text-white">Criar conta</h1>
          <p className="text-sm text-[#4a6080] mt-1">PatternAI — acesso restrito</p>
        </div>

        <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-6">
          <div className="mb-4">
            <label className="block text-xs text-[#4a6080] uppercase tracking-wider mb-1">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-[#060c18] border border-[#1e2a45] rounded-lg px-3 py-2 text-sm text-[#c0cce0] outline-none focus:border-[#4fc3f7] transition-colors"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full bg-[#060c18] border border-[#1e2a45] rounded-lg px-3 py-2 text-sm text-[#c0cce0] outline-none focus:border-[#4fc3f7] transition-colors"
            />
          </div>

          {error && (
            <div className="mb-4 bg-[#3a1a1a] border border-[#f87171] rounded-lg px-3 py-2 text-xs text-[#f87171]">
              {error}
            </div>
          )}

          <button
            onClick={handleCadastro}
            disabled={loading || !email || !password || !nome}
            className="w-full bg-[#1a3a5a] border border-[#4fc3f7] text-[#4fc3f7] rounded-lg py-2.5 text-sm font-medium hover:bg-[#1e4570] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

          <div className="mt-4 pt-4 border-t border-[#1e2a45] text-center text-xs text-[#4a6080]">
            Já tem conta?{' '}
            <Link href="/auth/login" className="text-[#4fc3f7] hover:underline">
              Fazer login
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
