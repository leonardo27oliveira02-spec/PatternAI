import Link from 'next/link'

export default function PlanosPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="text-[#4a6080] hover:text-[#4fc3f7] text-sm">
            ← Dashboard
          </Link>
          <span className="text-[#1e2a45]">/</span>
          <span className="text-sm text-[#c0cce0]">Planos</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { nome: 'Starter', preco: 'R$ 97', cor: '#8899bb' },
            { nome: 'Pro', preco: 'R$ 197', cor: '#4fc3f7', destaque: true },
            { nome: 'Elite', preco: 'R$ 497', cor: '#fbbf24' },
          ].map(plano => (
            <div
              key={plano.nome}
              className="bg-[#0d1220] rounded-xl p-6 text-center"
              style={{ border: `1px solid ${plano.destaque ? plano.cor : '#1e2a45'}` }}
            >
              <div className="text-sm font-medium text-white mb-2">{plano.nome}</div>
              <div className="text-2xl font-medium mb-4" style={{ color: plano.cor }}>
                {plano.preco}
                <span className="text-xs text-[#4a6080]">/mês</span>
              </div>
              <button
                className="w-full py-2 rounded-lg text-sm transition-colors"
                style={{ border: `1px solid ${plano.cor}`, color: plano.cor, background: 'transparent' }}
              >
                Assinar
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#4a6080] mt-6">
          Integração com Stripe será configurada na Etapa 6.
        </p>
      </div>
    </div>
  )
}
