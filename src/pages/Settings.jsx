import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ArrowLeft, Save, Globe, Mail, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEO_FIELDS = [
  { key: 'site_name', label: 'Nome do site', placeholder: 'Boldlife' },
  { key: 'default_seo_title', label: 'Título SEO padrão', placeholder: 'Boldlife | Consumo Inteligente' },
  { key: 'default_seo_description', label: 'Descrição SEO padrão (até 160 caracteres)', placeholder: 'Conheça a Boldlife...', textarea: true },
  { key: 'social_image', label: 'Imagem social padrão (URL)', placeholder: 'https://...' },
  { key: 'logo_url', label: 'URL pública e permanente da logo', placeholder: 'https://...' },
  { key: 'favicon_url', label: 'URL do favicon', placeholder: 'https://...' },
  { key: 'gsc_verification', label: 'Google Search Console — código de verificação', placeholder: 'conteúdo da tag google-site-verification' },
  { key: 'ga4_id', label: 'Google Analytics 4 — Measurement ID', placeholder: 'G-XXXXXXX' },
  { key: 'gtm_id', label: 'Google Tag Manager — Container ID', placeholder: 'GTM-XXXXXX' },
  { key: 'instagram', label: 'Instagram (URL)', placeholder: 'https://instagram.com/...' },
  { key: 'facebook', label: 'Facebook (URL)', placeholder: 'https://facebook.com/...' },
  { key: 'youtube', label: 'YouTube (URL)', placeholder: 'https://youtube.com/@...' },
  { key: 'linkedin', label: 'LinkedIn (URL)', placeholder: 'https://linkedin.com/company/...' },
  { key: 'tiktok', label: 'TikTok (URL)', placeholder: 'https://tiktok.com/@...' },
  { key: 'twitter', label: 'X / Twitter (URL)', placeholder: 'https://x.com/...' },
  { key: 'phone', label: 'Telefone', placeholder: '+55 ...' },
  { key: 'whatsapp', label: 'WhatsApp (somente dígitos, com DDI)', placeholder: '5531...' },
  { key: 'email', label: 'E-mail de contato', placeholder: 'contato@boldlifeoficial.com.br' },
  { key: 'address', label: 'Endereço (se público)', placeholder: 'Cidade, UF, Brasil' },
  { key: 'cnpj', label: 'CNPJ (se público)', placeholder: '00.000.000/0001-00' },
  { key: 'razao_social', label: 'Razão Social (se pública)', placeholder: '...' },
];

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('support');

  // Support emails state
  const [configs, setConfigs] = useState([]);
  const [loadingSupport, setLoadingSupport] = useState(true);
  const [newDept, setNewDept] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // SEO state
  const [seo, setSeo] = useState(null);
  const [loadingSeo, setLoadingSeo] = useState(true);
  const [savingSeo, setSavingSeo] = useState(false);
  const [seoSaved, setSeoSaved] = useState(false);

  useEffect(() => {
    loadConfigs();
    loadSeo();
  }, []);

  const loadConfigs = async () => {
    try {
      const data = await base44.entities.SupportEmailConfig.list();
      setConfigs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSupport(false);
    }
  };

  const handleAdd = async () => {
    if (!newDept || !newEmail) return alert('Preencha todos os campos');
    try {
      await base44.entities.SupportEmailConfig.create({ department: newDept, email: newEmail });
      setNewDept(''); setNewEmail('');
      loadConfigs();
    } catch (e) {
      alert('Erro ao adicionar configuração');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja remover?')) return;
    try {
      await base44.entities.SupportEmailConfig.delete(id);
      loadConfigs();
    } catch (e) {
      alert('Erro ao deletar configuração');
    }
  };

  const loadSeo = async () => {
    try {
      const rows = await base44.entities.SeoConfig.list();
      setSeo(rows && rows[0] ? rows[0] : { site_name: 'Boldlife' });
    } catch (e) {
      setSeo({ site_name: 'Boldlife' });
    } finally {
      setLoadingSeo(false);
    }
  };

  const handleSeoChange = (key, value) => setSeo((s) => ({ ...s, [key]: value }));

  const handleSeoSave = async () => {
    setSavingSeo(true); setSeoSaved(false);
    try {
      const payload = { ...seo };
      delete payload.id; delete payload.created_date; delete payload.updated_date; delete payload.created_by_id;
      if (seo.id) {
        await base44.entities.SeoConfig.update(seo.id, payload);
      } else {
        const created = await base44.entities.SeoConfig.create(payload);
        setSeo(created);
      }
      setSeoSaved(true);
      setTimeout(() => setSeoSaved(false), 2500);
    } catch (e) {
      alert('Erro ao salvar configuração de SEO');
    } finally {
      setSavingSeo(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-card rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-heading font-bold">Configurações</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button onClick={() => setTab('support')} className={`flex items-center gap-2 px-4 py-2 font-heading font-semibold text-sm transition-colors ${tab === 'support' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <Mail className="w-4 h-4" /> Suporte
          </button>
          <button onClick={() => setTab('seo')} className={`flex items-center gap-2 px-4 py-2 font-heading font-semibold text-sm transition-colors ${tab === 'seo' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <Globe className="w-4 h-4" /> SEO
          </button>
        </div>

        {tab === 'support' && (
          <>
            <div className="bg-card border border-border rounded-sm p-6 mb-8">
              <h2 className="font-heading font-bold text-lg mb-4">Adicionar Email do Departamento</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-heading font-semibold text-muted-foreground block mb-2">Departamento</label>
                  <Input placeholder="Ex: Suporte TI" value={newDept} onChange={(e) => setNewDept(e.target.value)} className="bg-muted border border-border" />
                </div>
                <div>
                  <label className="text-sm font-heading font-semibold text-muted-foreground block mb-2">Email</label>
                  <Input type="email" placeholder="Ex: ti@boldlifeoficial.com.br" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="bg-muted border border-border" />
                </div>
                <Button onClick={handleAdd} className="bg-primary text-primary-foreground font-heading font-bold">
                  <Plus className="w-4 h-4 mr-2" /> Adicionar
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading font-bold text-lg">Departamentos Configurados</h2>
              {loadingSupport ? (
                <p className="text-muted-foreground">Carregando...</p>
              ) : configs.length === 0 ? (
                <p className="text-muted-foreground">Nenhum departamento configurado.</p>
              ) : (
                configs.map((c) => (
                  <div key={c.id} className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold">{c.department}</p>
                      <p className="text-sm text-muted-foreground">{c.email}</p>
                    </div>
                    <button onClick={() => handleDelete(c.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {tab === 'seo' && (
          loadingSeo ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
          ) : (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">
                Configure a identidade digital, SEO, redes sociais oficiais e códigos do Google.
                Estes valores são aplicados dinamicamente em todas as páginas públicas.
              </p>
              {SEO_FIELDS.map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-heading font-semibold text-muted-foreground block mb-2">{f.label}</label>
                  {f.textarea ? (
                    <Textarea value={seo?.[f.key] || ''} onChange={(e) => handleSeoChange(f.key, e.target.value)} placeholder={f.placeholder} className="bg-muted border border-border min-h-[80px]" maxLength={f.key === 'default_seo_description' ? 160 : undefined} />
                  ) : (
                    <Input value={seo?.[f.key] || ''} onChange={(e) => handleSeoChange(f.key, e.target.value)} placeholder={f.placeholder} className="bg-muted border border-border" />
                  )}
                </div>
              ))}
              <Button onClick={handleSeoSave} disabled={savingSeo} className="bg-primary text-primary-foreground font-heading font-bold gap-2">
                {savingSeo ? <Loader2 className="w-4 h-4 animate-spin" /> : seoSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {savingSeo ? 'Salvando...' : seoSaved ? 'Salvo!' : 'Salvar configuração de SEO'}
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}