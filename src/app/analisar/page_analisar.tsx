import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function AnalisarPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="text-[#4a6080] hover:text-[#4fc3f7] text-sm">
            ← Dashboard
          </Link>
          <span className="text-[#1e2a45]">/</span>
          <span className="text-sm text-[#c0cce0]">Nova análise</span>
        </div>
        <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">🔬</div>
          <h1 className="text-base font-medium text-white mb-2">Engine de análise</h1>
          <p className="text-sm text-[#4a6080]">
            Esta tela será desenvolvida na Etapa 3 — engine de análise de print com IA.
          </p>
        </div>
      </div>
    </div>
  )
}
