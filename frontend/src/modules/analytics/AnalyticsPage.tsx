import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '@/shared/components/Card'

const weeklyAdmits = [
  { week: 'W1', admits: 128, telehealth: 54 },
  { week: 'W2', admits: 132, telehealth: 61 },
  { week: 'W3', admits: 118, telehealth: 58 },
  { week: 'W4', admits: 141, telehealth: 72 },
  { week: 'W5', admits: 136, telehealth: 69 },
  { week: 'W6', admits: 150, telehealth: 74 },
]

const departmentMix = [
  { name: 'Cardio', value: 42 },
  { name: 'Endo', value: 28 },
  { name: 'Pulm', value: 19 },
  { name: 'Ortho', value: 24 },
  { name: 'ER', value: 33 },
]

export function AnalyticsPage() {
  return (
    <div className="stack stack--page">
      <div className="page-intro">
        <h2>Population analytics</h2>
        <p className="muted">Synthetic utilization data for executive review.</p>
      </div>

      <div className="chart-grid">
        <Card title="Admissions vs telehealth" subtitle="Trailing six weeks">
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAdmits} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillAdmits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis width={32} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="admits"
                  stroke="var(--chart-1)"
                  fill="url(#fillAdmits)"
                  strokeWidth={2}
                  name="Admits"
                />
                <Area
                  type="monotone"
                  dataKey="telehealth"
                  stroke="var(--chart-2)"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="Telehealth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Department mix" subtitle="Share of encounters (%)">
          <div className="chart-wrap chart-wrap--short">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentMix} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis width={32} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'var(--accent-soft)' }}
                  contentStyle={{
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="value" fill="var(--chart-3)" radius={[6, 6, 0, 0]} name="Share" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
