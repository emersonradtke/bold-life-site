import { useEffect } from 'react';
import { SITE_CONFIG } from '@/config/site';

export const SITE_URL = 'https://bold-life-hub.base44.app';
export const BRAND_NAME = SITE_CONFIG.site_name || 'Boldlife';
export const DEFAULT_LOGO = SITE_CONFIG.logo_url;
export const DEFAULT_SOCIAL_IMAGE = SITE_CONFIG.social_image || DEFAULT_LOGO;

let analyticsInjected = false;
function injectAnalytics() {
  if (analyticsInjected) return;
  if (SITE_CONFIG.ga4_id) {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.ga4_id}`;
    document.head.appendChild(s1);
    const s2 = document.createElement('script');
    s2.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE_CONFIG.ga4_id}');`;
    document.head.appendChild(s2);
  }
  if (SITE_CONFIG.gtm_id) {
    const s = document.createElement('script');
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE_CONFIG.gtm_id}');`;
    document.head.appendChild(s);
  }
  if (SITE_CONFIG.gsc_verification) {
    let m = document.querySelector('meta[name="google-site-verification"]');
    if (!m) {
      m = document.createElement('meta');
      m.name = 'google-site-verification';
      document.head.appendChild(m);
    }
    m.content = SITE_CONFIG.gsc_verification;
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
  useEffect(() => {
    injectAnalytics();

    const siteName = BRAND_NAME;
    const desc = description || SITE_CONFIG.default_seo_description || '';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Consumo Inteligente`;
    const img = image || SITE_CONFIG.social_image || DEFAULT_SOCIAL_IMAGE;
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
  }, [title, description, path, type, image, jsonLd, noindex]);
}