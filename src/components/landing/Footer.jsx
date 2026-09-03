import { Instagram, Facebook, Youtube, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site';

const LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/aa85e3a3d_BOLDLIFE02-LOGO1.png';
const ICON = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/6b81ab293_BOLDLIFE-ICON.png';
const NETWORK_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/2d871558f_generated_551aebed.png';

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin, twitter: Twitter };

export default function Footer() {
  const socials = ['instagram', 'facebook', 'youtube', 'linkedin', 'tiktok', 'twitter']
    .map((k) => ({ key: k, url: SITE_CONFIG[k] }))
    .filter((s) => s.url);

  const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Como funciona', to: '/como-funciona' },
    { label: 'Contato', to: '/contato' },
  ];

  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="absolute inset-0 opacity-5">
        <img src={NETWORK_IMG} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src={ICON} alt="" className="w-[600px] h-[600px] object-contain" style={{ filter: 'invert(1)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <img src={LOGO} alt="Boldlife – Consumo Inteligente" className="h-16 mx-auto opacity-80" />

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6" aria-label="Navegação institucional">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-heading font-semibold text-muted-foreground hover:text-primary transition-colors duration-300">
                {l.label}
              </Link>
            ))}
          </nav>

          {socials.length > 0 ? (
            <div className="flex justify-center gap-5 mt-6">
              {socials.map((s) => {
                const Icon = socialIcons[s.key] || Instagram;
                return (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Boldlife no ${s.key}`} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center mt-6">
              <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300">
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-heading font-semibold">@boldlifebrasil</span>
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p className="font-heading font-semibold text-foreground">Boldlife™ — Consumo Inteligente</p>
          <p>Ecossistema de educação e consumo inteligente.</p>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Nascida na solidez industrial do Vale do Aço — Minas Gerais, Brasil.
        </p>

        <div className="text-center mt-4 flex items-center justify-center gap-4">
          <a
            href={SITE_CONFIG.webmail_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/40 hover:text-primary transition-colors duration-300"
          >
            Webmail
          </a>
          <span className="text-muted-foreground/20">·</span>
          <a
            href="https://boldlife7.com.br/bold/bold_acesso_painel_admin_2026/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}