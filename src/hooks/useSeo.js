import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export const SITE_URL = 'https://bold-life-hub.base44.app';
export const BRAND_NAME = 'Boldlife';
export const DEFAULT_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';
export const DEFAULT_SOCIAL_IMAGE = DEFAULT_LOGO;

let cachedConfig = null;
let configPromise = null;

async function loadConfig() {
  if (cachedConfig) return cachedConfig;
  if (!configPromise) {
    configPromise = base44.entities.SeoConfig.list()
      .then((rows) => (rows && rows[0]) || null)
      .catch(() => null)
      .then((c) => {
        cachedConfig = c;
        return c;
      });
  }
  return configPromise;
}

let analyticsInjected = false;
function injectAnalytics(config) {
  if (analyticsInjected || !config) return;
  if (config.ga4_id) {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4_id}`;
    document.head.appendChild(s1);
    const s2 = document.createElement('script');
    s2.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.ga4_id}');`;
    document.head.appendChild(s2);
  }
  if (config.gtm_id) {
    const s = document.createElement('script');
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtm_id}');`;
    document.head.appendChild(s);
  }
  if (config.gsc_verification) {
    let m = document.querySelector('meta[name="google-site-verification"]');
    if (!m) {
      m = document.createElement('meta');
      m.name = 'google-site-verification';
      document.head.appendChild(m);
    }
    m.content = config.gsc_verification;
  }
  analyticsInjected = true;
}

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id, obj) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(obj);
}

export function useSeo({ title, description, path = '/', type = 'website', image, jsonLd, noindex = false }) {
  const [config, setConfig] = useState(cachedConfig);

  useEffect(() => {
    loadConfig().then((c) => {
      setConfig(c);
      injectAnalytics(c);
    });
  }, []);

  useEffect(() => {
    const siteName = (config && config.site_name) || BRAND_NAME;
    const desc = description || (config && config.default_seo_description) || '';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Consumo Inteligente`;
    const img = image || (config && config.social_image) || DEFAULT_SOCIAL_IMAGE;
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(canonical);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:locale', 'pt_BR');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);

    if (jsonLd) setJsonLd('page-jsonld', jsonLd);
  }, [title, description, path, type, image, jsonLd, noindex, config]);
}