'use client';

import { useState, useEffect } from 'react';
import { Terminal, Activity, Code2, Cpu, CheckCircle2, Zap } from 'lucide-react';

export default function DynamicHeroTerminal() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'metrics' | 'code'>('terminal');

  // Dynamic Metrics State
  const [metrics, setMetrics] = useState({
    rps: 1420,
    latency: 14,
    uptime: '99.98%',
    activeConnections: 384,
    memoryUsage: '42.8 MB',
  });

  // Dynamic Terminal Logs
  const [logs, setLogs] = useState<Array<{ id: number; time: string; level: string; msg: string; tag: string }>>([
    { id: 1, time: '10:42:01.04', level: 'SYS', msg: 'Init deep-ocean cluster v2.4...', tag: 'KERNEL' },
    { id: 2, time: '10:42:01.28', level: 'OK', msg: 'PostgreSQL pool connected (5432)', tag: 'DATABASE' },
    { id: 3, time: '10:42:01.65', level: 'AI', msg: 'Gemini LLM API pipeline active', tag: 'EMBEDDINGS' },
    { id: 4, time: '10:42:02.12', level: 'WS', msg: 'WebSocket state sync initialized', tag: 'REALTIME' },
    { id: 5, time: '10:42:02.89', level: 'HTTP', msg: 'GET /api/v1/health -> 200 OK', tag: 'API' },
  ]);

  // Dynamic code typing index
  const [codeIndex, setCodeIndex] = useState(0);

  const codeSnippets = [
    'async function shipProduct(req: ProductSpec) {',
    '  const api = await buildAPI(req.backend);',
    '  const ui = await renderNextJS(req.frontend);',
    '  const ai = await connectLLM(req.aiModel);',
    '  return { status: 200, shipped: true };',
    '}',
  ];

  // Fluctuate metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        rps: 1400 + Math.floor(Math.random() * 60),
        latency: 12 + Math.floor(Math.random() * 5),
        activeConnections: 380 + Math.floor(Math.random() * 20),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Append new logs dynamically
  useEffect(() => {
    const logTemplates = [
      { level: 'AI', msg: 'Context window parsed (token_len: 2048)', tag: 'LLM_APIS' },
      { level: 'HTTP', msg: 'POST /api/v1/chat -> 200 Streamed', tag: 'EXPRESS' },
      { level: 'DB', msg: 'Prisma query executed in 1.4ms', tag: 'POSTGRES' },
      { level: 'WS', msg: 'Broadcasted player_state (300fps)', tag: 'SOCKET.IO' },
      { level: 'SYS', msg: 'Memory garbage collection nominal', tag: 'NODEJS' },
      { level: 'DEPLOY', msg: 'Edge route verified (Vercel Edge)', tag: 'NEXTJS' },
    ];

    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);

      setLogs((prevLogs) => {
        const nextId = (prevLogs[prevLogs.length - 1]?.id || 0) + 1;
        const newLogs = [...prevLogs.slice(-6), { id: nextId, time: timeStr, ...template }];
        return newLogs;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Code typewriter loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % (codeSnippets.length + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <div className="group relative h-[420px] w-[320px] sm:h-[480px] sm:w-[400px] lg:h-[530px] lg:w-[450px] rounded-2xl border border-accent/30 bg-[#031A24]/90 p-3.5 shadow-[0_0_50px_rgba(25,211,197,0.15)] backdrop-blur transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_60px_rgba(25,211,197,0.22)]">
      {/* Background Animated Sonar Pulse Ring */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -right-16 -top-16 size-72 rounded-full border border-accent/15 animate-ping opacity-25"></div>
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full border border-accent/10 opacity-30"></div>
      </div>

      {/* Terminal Window Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-hairline/60 pb-3">
        {/* Mac-style controls */}
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#FF5F56]/80"></span>
          <span className="size-3 rounded-full bg-[#FFBD2E]/80"></span>
          <span className="size-3 rounded-full bg-[#27C93F]/80"></span>
        </div>

        {/* Window Title */}
        <span className="font-mono text-[11px] text-muted flex items-center gap-1.5">
          <Terminal className="size-3 text-accent" />
          akanksha@deep-ocean:~
        </span>

        {/* Live Status Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-2.5 py-0.5 font-mono text-[10px] text-accent font-medium">
          <span className="size-1.5 rounded-full bg-accent animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* Tab Selector */}
      <div className="relative z-10 mt-3 flex items-center gap-1.5 border-b border-hairline/40 pb-2">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
            activeTab === 'terminal'
              ? 'bg-accent-tint text-accent border border-accent/30 font-medium'
              : 'text-muted hover:text-ink hover:bg-surface/50'
          }`}
        >
          <Terminal className="size-3.5" />
          stream.sh
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
            activeTab === 'metrics'
              ? 'bg-accent-tint text-accent border border-accent/30 font-medium'
              : 'text-muted hover:text-ink hover:bg-surface/50'
          }`}
        >
          <Activity className="size-3.5" />
          telemetry.json
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
            activeTab === 'code'
              ? 'bg-accent-tint text-accent border border-accent/30 font-medium'
              : 'text-muted hover:text-ink hover:bg-surface/50'
          }`}
        >
          <Code2 className="size-3.5" />
          builder.ts
        </button>
      </div>

      {/* Tab 1: Live Log Streamer */}
      {activeTab === 'terminal' && (
        <div className="relative z-10 mt-3 flex h-[calc(100%-7.5rem)] flex-col justify-between font-mono text-[11px] leading-6">
          <div className="space-y-2 overflow-hidden">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between gap-2 border-b border-hairline/20 pb-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-muted/70">{log.time}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${
                      log.level === 'AI'
                        ? 'bg-accent/20 text-accent'
                        : log.level === 'HTTP' || log.level === 'OK'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-ink truncate">{log.msg}</span>
                </div>
                <span className="hidden sm:inline-block rounded border border-hairline/40 bg-surface/50 px-1.5 text-[9px] text-muted">
                  {log.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Terminal Input Bar */}
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-hairline/50 bg-[#020B10]/80 p-2.5 text-muted">
            <span className="text-accent font-bold">&gt;</span>
            <span className="text-ink flex-1 truncate">await system.execute({JSON.stringify({ mode: 'fullstack' })})</span>
            <span className="inline-block h-3.5 w-1.5 animate-cursor bg-accent"></span>
          </div>
        </div>
      )}

      {/* Tab 2: Live Telemetry Metrics */}
      {activeTab === 'metrics' && (
        <div className="relative z-10 mt-4 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border border-hairline/50 bg-[#020B10]/80 p-3">
              <div className="flex items-center justify-between text-muted text-[10px]">
                <span>THROUGHPUT</span>
                <Zap className="size-3 text-accent" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-ink">{metrics.rps.toLocaleString()} <span className="text-xs font-normal text-muted">req/s</span></p>
            </div>

            <div className="rounded-lg border border-hairline/50 bg-[#020B10]/80 p-3">
              <div className="flex items-center justify-between text-muted text-[10px]">
                <span>LATENCY</span>
                <Activity className="size-3 text-accent" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-accent">{metrics.latency} <span className="text-xs font-normal text-muted">ms avg</span></p>
            </div>

            <div className="rounded-lg border border-hairline/50 bg-[#020B10]/80 p-3">
              <div className="flex items-center justify-between text-muted text-[10px]">
                <span>ACTIVE CONNECTIONS</span>
                <Cpu className="size-3 text-accent" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-ink">{metrics.activeConnections}</p>
            </div>

            <div className="rounded-lg border border-hairline/50 bg-[#020B10]/80 p-3">
              <div className="flex items-center justify-between text-muted text-[10px]">
                <span>SYSTEM UPTIME</span>
                <CheckCircle2 className="size-3 text-emerald-400" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-emerald-400">{metrics.uptime}</p>
            </div>
          </div>

          {/* Stack Telemetry Progress Indicators */}
          <div className="rounded-lg border border-hairline/50 bg-[#020B10]/80 p-3 space-y-2 text-[11px]">
            <div className="flex justify-between text-muted">
              <span>Memory Heap Usage</span>
              <span className="text-accent">{metrics.memoryUsage}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface">
              <div className="h-1.5 rounded-full bg-accent transition-all duration-500" style={{ width: '42%' }}></div>
            </div>

            <div className="flex justify-between text-muted pt-1">
              <span>LLM Inference Stream</span>
              <span className="text-emerald-400">NOMINAL (85ms)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface">
              <div className="h-1.5 rounded-full bg-emerald-400 transition-all duration-500" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Animated Builder Code */}
      {activeTab === 'code' && (
        <div className="relative z-10 mt-3 flex h-[calc(100%-7.5rem)] flex-col justify-between rounded-lg border border-hairline/50 bg-[#020B10]/90 p-3.5 font-mono text-[11px] leading-6 text-muted">
          <div className="space-y-1">
            <p className="text-muted/60">// Full-Stack &amp; AI Integration Pipeline</p>
            {codeSnippets.slice(0, codeIndex || codeSnippets.length).map((line, idx) => (
              <p key={idx} className={idx === 0 ? 'text-accent font-semibold' : idx === codeSnippets.length - 1 ? 'text-accent' : 'text-ink'}>
                {line}
              </p>
            ))}
            <p className="inline-block h-3.5 w-1.5 animate-cursor bg-accent mt-1"></p>
          </div>

          <div className="border-t border-hairline/40 pt-2 flex items-center justify-between text-[10px] text-muted">
            <span>Next.js 14 + TypeScript</span>
            <span className="text-accent">Ready to Ship</span>
          </div>
        </div>
      )}
    </div>
  );
}
