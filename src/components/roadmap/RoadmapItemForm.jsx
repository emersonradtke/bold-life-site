import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const statusOptions = [
  { value: 'planejado', label: 'Planejado' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'concluido', label: 'Concluído' },
];

export default function RoadmapItemForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState(item || {
    quarter: '',
    title: '',
    description: '',
    status: 'planejado',
    order: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-card border border-primary/30 rounded-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-bold">{item ? 'Editar Item' : 'Novo Item'}</h4>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Período (ex: Q1 2025)</label>
            <Input
              value={form.quarter}
              onChange={(e) => setForm({ ...form, quarter: e.target.value })}
              placeholder="Q1 2025"
              required
              className="bg-background border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full h-9 px-3 rounded-md bg-background border border-border text-sm text-foreground"
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Título</label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título do marco"
            required
            className="bg-background border-border text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Descrição</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descreva o que está planejado..."
            rows={3}
            className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Ordem</label>
          <Input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="bg-background border-border text-sm w-24"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <Button type="submit" size="sm" className="font-heading font-bold">Salvar</Button>
          <Button type="button" size="sm" variant="outline" onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}