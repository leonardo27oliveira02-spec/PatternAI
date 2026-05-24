import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', session.user.id)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', session.user.id)
    .single()

  const { data: performance } = await supabase
    .from('performance_summary')
    .select('total_followed, total_wins, total_losses, win_rate')
    .eq('user_id', session.user.id)
    .single()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-medium text-white">
              Olá, {profile?.full_name?.split(' ')[0] || 'bem-vindo'} 👋
            </h1>
            <p className="text-sm text-[#4a6080] mt-0.5">
              Plano <span className="text-[#4fc3f7] capitalize">{subscription?.plan || 'starter'}</span>
              {subscription?.status === 'trial' && ' · período de teste'}
            </p>
          </div>
          <Link
            href="/analisar"
            className="bg-[#1a3a5a] border border-[#4fc3f7] text-[#4fc3f7] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e4570] transition-colors"
          >
            + Nova análise
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-5 text-center">
            <div className="text-2xl font-medium text-[#4fc3f7]">
              {performance?.total_followed ?? 0}
            </div>
            <div className="text-xs text-[#4a6080] mt-1">Alertas seguidos</div>
          </div>
          <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-5 text-center">
            <div className="text-2xl font-medium text-[#4ade80]">
              {performance?.total_wins ?? 0}
            </div>
            <div className="text-xs text-[#4a6080] mt-1">Acertos</div>
          </div>
          <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-5 text-center">
            <div className="text-2xl font-medium text-[#fbbf24]">
              {performance?.win_rate ?? 0}%
            </div>
            <div className="text-xs text-[#4a6080] mt-1">Taxa de acerto</div>
          </div>
        </div>

        <div className="bg-[#0d1220] border border-[#1e2a45] rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">🧠</div>
          <h2 className="text-base font-medium text-white mb-2">Faça sua primeira análise</h2>
          <p className="text-sm text-[#4a6080] mb-4">
            Envie um print do jogo e o sistema identificará os padrões e alertas de previsibilidade.
          </p>
          <Link
            href="/analisar"
            className="inline-block bg-[#1a3a5a] border border-[#4fc3f7] text-[#4fc3f7] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e4570] transition-colors"
          >
            Analisar agora
          </Link>
        </div>

      </div>
    </div>
  )
}
