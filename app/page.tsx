'use client';
import React from 'react';
import {
  Globe,
  Github,
  Server,
  Rocket,
  CheckCircle2,
  Link2,
  Settings2,
  Clock3,
  FileCode2,
  Database,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const steps = [
  {
    title: '1. Dung repo local sach',
    icon: FileCode2,
    desc: 'Tao project Next.js production, cai UI, ORM, cache client, roi chay local truoc khi day GitHub.',
    code: 'npx create-next-app@latest hot-news-pulse --typescript --tailwind',
  },
  {
    title: '2. Tach file theo dung cau truc repo',
    icon: Settings2,
    desc: 'Khong de toan bo logic trong mot file. Tach dashboard, routes, scoring, providers, verify, DB schema.',
    code: 'app/page.tsx\napp/api/ingest/route.ts\napp/api/events/route.ts',
  },
  {
    title: '3. Ket noi database',
    icon: Database,
    desc: 'Tao PostgreSQL that, migrate schema, seed du lieu test de dashboard co output ngay khi deploy.',
    code: 'npx prisma init\nnpx prisma migrate dev --name init',
  },
  {
    title: '4. Push len GitHub',
    icon: Github,
    desc: 'Commit sach lan dau, day len repo public hoac private.',
    code: 'git init && git add . && git push -u origin main',
  },
  {
    title: '5. Deploy len Vercel',
    icon: Rocket,
    desc: 'Phu hop nhat la Vercel cho frontend + API routes.',
    code: 'vercel',
  },
  {
    title: '6. Gan domain doc lap',
    icon: Globe,
    desc: 'Mua domain o Cloudflare, tro DNS ve nen tang deploy, bat HTTPS.',
    code: 'news.yourdomain.com',
  },
];

const envVars = [
  'DATABASE_URL',
  'REDIS_URL',
  'OPENAI_API_KEY',
  'X_BEARER_TOKEN',
  'NEWS_API_KEY',
  'CRON_SECRET',
  'NEXT_PUBLIC_APP_URL',
];

const goLiveChecklist = [
  'Repo chay duoc local voi npm run dev',
  'Prisma migrate chay thanh cong',
  'API /api/events tra JSON that',
  'API /api/ingest co secret bao ve',
  'Co du lieu seed hoac ingest test',
  'Da add env vars tren host',
  'Da gan custom domain',
  'HTTPS hoat dong binh thuong',
  'Cron ingest chay moi 5-10 phut',
  'Co log loi va canh bao rate-limit',
];

const recommendedStack = [
  { name: 'Frontend + API', value: 'Next.js tren Vercel' },
  { name: 'Database', value: 'Neon / Supabase Postgres' },
  { name: 'Redis cache', value: 'Upstash Redis' },
  { name: 'Cron', value: 'Vercel Cron hoac GitHub Actions' },
  { name: 'LLM verify', value: 'OpenAI Responses API' },
  { name: 'Domain + DNS', value: 'Cloudflare' },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-4 text-xs leading-6 text-neutral-100">
      <code>{code}</code>
    </pre>
  );
}

export default function HotNewsPulseDeployGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="rounded-3xl border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle>Hot News Pulse Pro - Go Live Plan</CardTitle>
            <CardDescription>
              Lo trinh thuc chien tu blueprint sang he thong online co domain
              rieng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Uu tien host', value: 'Vercel' },
                { label: 'DNS khuyen nghi', value: 'Cloudflare' },
                { label: 'DB khuyen nghi', value: 'Postgres' },
                { label: 'Cron ingest', value: '5-10 phut' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border p-4">
                  <div className="text-sm text-neutral-500">{item.label}</div>
                  <div className="mt-1 text-xl font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.title}
                className="rounded-3xl border-neutral-200 shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {step.desc}
                  </p>
                  <div className="mt-4">
                    <CodeBlock code={step.code} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="rounded-3xl border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Bien moi truong phai co</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {envVars.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border px-3 py-2 font-mono text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Stack khuyen nghi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedStack.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 rounded-2xl border p-4"
                  >
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-right text-sm text-neutral-600">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle>Checklist go-live</CardTitle>
            <CardDescription>
              Dat du nhung muc nay thi tool moi nen mo tren domain doc lap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goLiveChecklist.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border p-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div className="text-sm leading-6 text-neutral-700">
                    {idx + 1}. {item}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-sm text-neutral-500">
                  <span>Muc san sang go-live</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle>Ket luan thuc chien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Github,
                  label: 'GitHub',
                  desc: 'Repo phai sach, build pass, co README va env example.',
                },
                {
                  icon: Server,
                  label: 'Hosting',
                  desc: 'Connect repo vao Vercel, add env vars, deploy ban dau tien.',
                },
                {
                  icon: Link2,
                  label: 'Domain',
                  desc: 'Tro DNS, xac minh domain, kiem tra HTTPS.',
                },
                {
                  icon: Clock3,
                  label: 'Cron',
                  desc: 'Bat lich ingest dinh ky sau cung.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border p-4">
                    <div className="mb-2 inline-flex items-center gap-2 font-medium">
                      <Icon className="h-4 w-4" /> {item.label}
                    </div>
                    <div className="text-sm leading-6 text-neutral-600">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
