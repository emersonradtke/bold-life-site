import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Pencil, Trash2, CheckCircle2, Clock, Loader2, Lock, Flag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPasswordModal from '@/components/roadmap/AdminPasswordModal';
import RoadmapItemForm from '@/components/roadmap/RoadmapItemForm';
import BrainRoad from '@/components/roadmap/BrainRoad';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';
const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

const statusConfig = {
  planejado:    { label: 'Planejado',    Icon: Clock,        color: 'text-muted-foreground', nodeBg: 'bg-muted',     nodeBorder: 'border-border',     cardBorder: 'border-border',       glow: '' },
  em_andamento: { label: 'Em Andamento', Icon: Loader2,      color: 'text-primary',          nodeBg: 'bg-primary',   nodeBorder: 'border-primary',    cardBorder: 'border-primary/60',   glow: 'shadow-[0_0_24px_rgba(43,159,232,0.5)]' },
  concluido:    { label: 'Concluído',    Icon: CheckCircle2, color: 'text-green-400',        nodeBg: 'bg-green-500', nodeBorder: 'border-green-400',  cardBorder: 'border-green-400/60', glow: 'shadow-[0_0_24px_rgba(74,222,128,0.35)]' },
};

/* A node dot placed on the brain path */
function BrainNode({ item, index, isAdmin, onEdit, onDelete, onSelect, selected }) {
  const cfg = statusConfig[item.status] || statusConfig.planejado;
  const { Icon } = cfg;

  return (
    <div className="relative">
      {/* Pulse for em_andamento */}
      {item.status === 'em_andamento' && (
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/40"
        />
      )}

      <motion.button
        onClick={() => onSelect(selected ? null : item)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.2 }}
        className={`relative w-9 h-9 rounded-full ${cfg.nodeBg} border-2 ${cfg.nodeBorder} flex items-center justify-center cursor-pointer ${selected ? 'ring-2 ring-white ring-offset-1 ring-offset-background' : ''}`}
      >
        <Icon className={`w-4 h-4 text-white ${item.status === 'em_andamento' ? 'animate-spin' : ''}`} />
      </motion.button>
    </div>
  );
}

/* Floating info card that appears when a node is clicked */
function InfoCard({ item, isAdmin, onEdit, onDelete, onClose }) {
  const cfg = statusConfig[item.status] || statusConfig.planejado;
  const { Icon } = cfg;

  return (
    <AnimatePresence>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`bg-card/95 backdrop-blur-md border ${cfg.cardBorder} ${cfg.glow} rounded-sm p-5 w-72 relative`}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 mb-3">
          <Icon className={`w-3.5 h-3.5 ${cfg.color} ${item.status === 'em_andamento' ? 'animate-spin' : ''}`} />
          <span className={`text-xs font-heading font-bold ${cfg.color}`}>{cfg.label}</span>
          <span className="text-xs text-primary/60 font-heading font-black tracking-widest uppercase ml-2">{item.quarter}</span>
        </div>

        <h3 className="font-heading font-bold text-base mb-2">{item.title}</h3>
        {item.description && <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>}

        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-border">
            <button onClick={() => onEdit(item)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Pencil className="w-3 h-3" /> Editar
            </button>
            <button onClick={() => onDelete(item.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors ml-2">
              <Trash2 className="w-3 h-3" /> Remover
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
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
  const [selectedItem, setSelectedItem] = useState(null);

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
    setSelectedItem(null);
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    setSelectedItem(null);
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center"
      >
        <img src={BACKGROUND_LOGO} alt="" className="w-[700px] h-[700px] object-contain" />
      </motion.div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pt-8 pb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
            Cada ponto no cérebro representa um marco da plataforma. Toque para explorar.
          </p>
        </motion.div>
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

      {/* Brain Road + Info Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Loader2 className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-heading font-semibold text-lg mb-2">Nenhum item no roadmap ainda.</p>
            {isAdmin && <p className="text-sm">Clique em "Novo Item" para adicionar o primeiro marco.</p>}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Brain */}
            <div className="flex-1 flex justify-center">
              <BrainRoad
                items={items}
                renderNode={(item, index, pos) => (
                  <BrainNode
                    key={item.id}
                    item={item}
                    index={index}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSelect={setSelectedItem}
                    selected={selectedItem?.id === item.id}
                  />
                )}
              />
            </div>

            {/* Info panel */}
            <div className="lg:w-80 w-full">
              {selectedItem ? (
                <InfoCard
                  item={selectedItem}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClose={() => setSelectedItem(null)}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground text-sm font-heading flex flex-col items-center justify-center h-40 border border-border/40 rounded-sm bg-card/30 px-6 text-center"
                >
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mb-3">
                    <Flag className="w-4 h-4 text-primary" />
                  </div>
                  Toque em um ponto do<br />cérebro para ver os detalhes
                </motion.div>
              )}

              {/* Legend */}
              <div className="mt-6 space-y-2">
                {Object.entries(statusConfig).map(([key, cfg]) => {
                  const { Icon } = cfg;
                  return (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full ${cfg.nodeBg} border ${cfg.nodeBorder} flex items-center justify-center`}>
                        <Icon className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className={cfg.color}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
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