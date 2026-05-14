import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Pencil, Trash2, CheckCircle2, Clock, Loader2, Lock, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPasswordModal from '@/components/roadmap/AdminPasswordModal';
import RoadmapItemForm from '@/components/roadmap/RoadmapItemForm';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';
const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

const statusConfig = {
  planejado:   { label: 'Planejado',    Icon: Clock,         color: 'text-muted-foreground', nodeBg: 'bg-muted',         nodeBorder: 'border-border',        cardBorder: 'border-border',         glow: '' },
  em_andamento:{ label: 'Em Andamento', Icon: Loader2,       color: 'text-primary',          nodeBg: 'bg-primary',       nodeBorder: 'border-primary',        cardBorder: 'border-primary/60',     glow: 'shadow-[0_0_20px_rgba(43,159,232,0.35)]' },
  concluido:   { label: 'Concluído',    Icon: CheckCircle2,  color: 'text-green-400',        nodeBg: 'bg-green-500',     nodeBorder: 'border-green-400',      cardBorder: 'border-green-400/60',   glow: 'shadow-[0_0_20px_rgba(74,222,128,0.25)]' },
};

function RoadmapNode({ item, index, isAdmin, onEdit, onDelete }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  const cfg = statusConfig[item.status] || statusConfig.planejado;
  const { Icon } = cfg;

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full" style={{ minHeight: 120 }}>
      {/* Card side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`absolute ${isLeft ? 'right-[calc(50%+36px)]' : 'left-[calc(50%+36px)]'} w-[42%] max-w-xs`}
      >
        {isLeft ? (
          <div className={`relative bg-card/80 backdrop-blur-sm border ${cfg.cardBorder} ${cfg.glow} rounded-sm p-4 group text-right`}>
            <StatusBadge cfg={cfg} status={item.status} alignRight />
            <h3 className="font-heading font-bold text-sm mb-1 mt-2">{item.title}</h3>
            {item.description && <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>}
            <AdminActions isAdmin={isAdmin} onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
          </div>
        ) : (
          <div className={`relative bg-card/80 backdrop-blur-sm border ${cfg.cardBorder} ${cfg.glow} rounded-sm p-4 group`}>
            <StatusBadge cfg={cfg} status={item.status} />
            <h3 className="font-heading font-bold text-sm mb-1 mt-2">{item.title}</h3>
            {item.description && <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>}
            <AdminActions isAdmin={isAdmin} onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
          </div>
        )}
        {/* Connector line to road */}
        <div className={`absolute top-1/2 -translate-y-1/2 h-px w-8 bg-border ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`} />
      </motion.div>

      {/* Center node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}
        className={`relative z-10 w-10 h-10 rounded-full ${cfg.nodeBg} border-2 ${cfg.nodeBorder} flex items-center justify-center shrink-0`}
      >
        <Icon className={`w-4 h-4 text-white ${item.status === 'em_andamento' ? 'animate-spin' : ''}`} />
      </motion.div>

      {/* Quarter label on opposite side of card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`absolute ${isLeft ? 'left-[calc(50%+36px)]' : 'right-[calc(50%+36px)]'} ${isLeft ? 'text-left' : 'text-right'}`}
      >
        <span className="font-heading font-black text-xs tracking-[0.2em] uppercase text-primary/60">{item.quarter}</span>
      </motion.div>
    </div>
  );
}

function StatusBadge({ cfg, status, alignRight }) {
  const { Icon, label, color } = cfg;
  return (
    <div className={`inline-flex items-center gap-1.5 ${alignRight ? 'flex-row-reverse' : ''}`}>
      <Icon className={`w-3 h-3 ${color} ${status === 'em_andamento' ? 'animate-spin' : ''}`} />
      <span className={`text-xs font-heading font-bold ${color}`}>{label}</span>
    </div>
  );
}

function AdminActions({ isAdmin, onEdit, onDelete }) {
  if (!isAdmin) return null;
  return (
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={onEdit} className="p-1 rounded bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors">
        <Pencil className="w-3 h-3" />
      </button>
      <button onClick={onDelete} className="p-1 rounded bg-muted/60 hover:bg-destructive/20 border border-border text-muted-foreground hover:text-red-400 transition-colors">
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

export default function Roadmap() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await base44.entities.RoadmapItem.list('order', 100);
    setItems(data);
    setLoading(false);
  };

  const handleSave = async (form) => {
    if (editingItem) {
      await base44.entities.RoadmapItem.update(editingItem.id, form);
    } else {
      await base44.entities.RoadmapItem.create(form);
    }
    setShowForm(false);
    setEditingItem(null);
    loadItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Remover este item do roadmap?')) return;
    await base44.entities.RoadmapItem.delete(id);
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pt-8 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-heading font-semibold">Voltar</span>
          </button>

          {isAdmin ? (
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={() => { setEditingItem(null); setShowForm(true); }} className="font-heading font-bold gap-2">
                <Plus className="w-4 h-4" /> Novo Item
              </Button>
              <button onClick={() => setIsAdmin(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Sair do modo admin
              </button>
            </div>
          ) : (
            <button onClick={() => setShowPasswordModal(true)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <Lock className="w-4 h-4" />
              <span className="font-heading font-semibold hidden sm:inline">Admin</span>
            </button>
          )}
        </div>

        <div className="h-0.5 w-12 bg-primary mb-6" />
        <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">Evolução da Plataforma</p>
        <img src={HEADER_LOGO} alt="Bold Life" className="h-10 mb-6" />
        <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-4">Roadmap Bold Life</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          Acompanhe os marcos e novidades que estamos construindo para transformar ainda mais a sua experiência na plataforma.
        </p>
      </div>

      {/* Admin form */}
      {showForm && isAdmin && (
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 mb-8">
          <RoadmapItemForm
            item={editingItem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
          />
        </div>
      )}

      {/* Road */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-heading font-semibold text-lg mb-2">Nenhum item no roadmap ainda.</p>
            {isAdmin && <p className="text-sm">Clique em "Novo Item" para adicionar o primeiro marco.</p>}
          </div>
        ) : (
          <div className="relative">
            {/* Road center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-border to-border/20" />

            {/* Dashed road markings */}
            <div className="absolute left-1/2 -translate-x-[8px] top-0 bottom-0 w-4 flex flex-col items-center gap-0 pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-px h-6 bg-primary/20 mb-2 shrink-0" />
              ))}
            </div>

            {/* Start flag */}
            <div className="relative flex justify-center mb-8">
              <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-primary-foreground shadow-lg">
                <Flag className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

            {/* Nodes */}
            <div className="flex flex-col gap-10">
              {items.map((item, idx) => (
                <RoadmapNode
                  key={item.id}
                  item={item}
                  index={idx}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* End dot */}
            <div className="relative flex justify-center mt-8">
              <div className="z-10 w-6 h-6 rounded-full border-2 border-border bg-background" />
            </div>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <AdminPasswordModal
          onSuccess={() => { setIsAdmin(true); setShowPasswordModal(false); }}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
}