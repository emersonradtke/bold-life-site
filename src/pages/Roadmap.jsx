import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Pencil, Trash2, CheckCircle2, Clock, Loader2, Lock, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPasswordModal from '@/components/roadmap/AdminPasswordModal';
import RoadmapItemForm from '@/components/roadmap/RoadmapItemForm';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';
const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

const statusConfig = {
  planejado:    { label: 'Planejado',    Icon: Clock,        color: 'text-muted-foreground', nodeBg: 'bg-muted',       nodeBorder: 'border-border',       cardBorder: 'border-border',        glow: '' },
  em_andamento: { label: 'Em Andamento', Icon: Loader2,      color: 'text-primary',          nodeBg: 'bg-primary',     nodeBorder: 'border-primary',      cardBorder: 'border-primary/60',    glow: 'shadow-[0_0_24px_rgba(43,159,232,0.4)]' },
  concluido:    { label: 'Concluído',    Icon: CheckCircle2, color: 'text-green-400',        nodeBg: 'bg-green-500',   nodeBorder: 'border-green-400',    cardBorder: 'border-green-400/60',  glow: 'shadow-[0_0_24px_rgba(74,222,128,0.3)]' },
};

/* Animated road line that draws itself as user scrolls */
function RoadLine({ containerRef, items }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end end'] });
  const rawHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const height = useSpring(rawHeight, { stiffness: 60, damping: 20 });

  // Calculate % of items concluded to show blue segment
  const total = items.length;
  const concluded = items.filter(i => i.status === 'concluido').length;
  const bluePct = total > 0 ? (concluded / total) * 100 : 0;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full bg-border/30 overflow-hidden">
      {/* Blue concluded segment */}
      {bluePct > 0 && (
        <div
          className="absolute top-0 left-0 w-full bg-primary transition-all duration-700"
          style={{ height: `${bluePct}%` }}
        />
      )}
      {/* Scroll-animated overlay for the rest */}
      <motion.div style={{ height }} className="w-full bg-gradient-to-b from-primary/40 to-primary/10 origin-top" />
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

function RoadmapNode({ item, index, isAdmin, onEdit, onDelete }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const cfg = statusConfig[item.status] || statusConfig.planejado;
  const { Icon } = cfg;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60, rotateY: isLeft ? -8 : 8 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.2, type: 'spring', stiffness: 260, damping: 18 } },
  };

  const labelVariants = {
    hidden: { opacity: 0, x: isLeft ? 30 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full" style={{ minHeight: 120 }}>

      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={`absolute ${isLeft ? 'right-[calc(50%+40px)]' : 'left-[calc(50%+40px)]'} w-[42%] max-w-xs`}
        style={{ perspective: 600 }}
      >
        <motion.div
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          className={`relative bg-card/80 backdrop-blur-sm border ${cfg.cardBorder} ${cfg.glow} rounded-sm p-4 group ${isLeft ? 'text-right' : ''}`}
        >
          <StatusBadge cfg={cfg} status={item.status} alignRight={isLeft} />
          <h3 className="font-heading font-bold text-sm mb-1 mt-2">{item.title}</h3>
          {item.description && <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>}
          <AdminActions isAdmin={isAdmin} onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
        </motion.div>
        {/* Connector */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.35 }}
          style={{ originX: isLeft ? 1 : 0 }}
          className={`absolute top-1/2 -translate-y-1/2 h-px w-8 bg-border ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`}
        />
      </motion.div>

      {/* Center node */}
      <motion.div
        variants={nodeVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 shrink-0"
      >
        {/* Pulse ring for em_andamento */}
        {item.status === 'em_andamento' && (
          <motion.div
            animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary/40"
          />
        )}
        <div className={`w-10 h-10 rounded-full ${cfg.nodeBg} border-2 ${cfg.nodeBorder} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 text-white ${item.status === 'em_andamento' ? 'animate-spin' : ''}`} />
        </div>
      </motion.div>

      {/* Quarter label */}
      <motion.div
        variants={labelVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={`absolute ${isLeft ? 'left-[calc(50%+40px)]' : 'right-[calc(50%+40px)]'} ${isLeft ? 'text-left' : 'text-right'}`}
      >
        <span className="font-heading font-black text-xs tracking-[0.2em] uppercase text-primary/60">{item.quarter}</span>
      </motion.div>
    </div>
  );
}

export default function Roadmap() {
  const navigate = useNavigate();
  const roadRef = useRef(null);

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
      {/* Animated background */}
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center"
      >
        <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
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
            Acompanhe os marcos e novidades que estamos construindo para transformar ainda mais a sua experiência na plataforma.
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

      {/* Road */}
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
          <div ref={roadRef} className="relative">
            {/* Animated road line */}
            <RoadLine containerRef={roadRef} items={items} />

            {/* Start flag */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              className="relative flex justify-center mb-10"
            >
              <motion.div
                animate={{ boxShadow: ['0 0 0px rgba(43,159,232,0)', '0 0 20px rgba(43,159,232,0.6)', '0 0 0px rgba(43,159,232,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center border-2 border-primary-foreground"
              >
                <Flag className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </motion.div>

            {/* Nodes */}
            <div className="flex flex-col gap-12">
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="relative flex justify-center mt-10"
            >
              <div className="z-10 w-6 h-6 rounded-full border-2 border-border bg-background" />
            </motion.div>
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