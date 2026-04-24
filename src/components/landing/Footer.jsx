import { Instagram } from 'lucide-react';

const LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/aa85e3a3d_BOLDLIFE02-LOGO1.png';
const ICON = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/6b81ab293_BOLDLIFE-ICON.png';
const NETWORK_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/2d871558f_generated_551aebed.png';

export default function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <img src={NETWORK_IMG} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Large icon watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src={ICON} alt="" className="w-[600px] h-[600px] object-contain" style={{ filter: 'invert(1)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Logo centered */}
        <div className="text-center mb-12">
          <img src={LOGO} alt="Bold Life" className="h-16 mx-auto opacity-80" />
          <div className="flex justify-center mt-6">
            <a
              href="https://www.instagram.com/boldlifebrasil/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-heading font-semibold">@boldlifebrasil</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p className="font-heading font-semibold text-foreground">Bold Life™</p>
          <p>Ecossistema de educação e consumo inteligente.</p>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Nascida na solidez industrial do Vale do Aço — Minas Gerais, Brasil.
        </p>
      </div>
    </footer>
  );
}