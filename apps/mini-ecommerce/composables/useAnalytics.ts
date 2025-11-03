export function useAnalytics() {
  function gtagExists(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
  }

  function trackAddToCart(p: { id: number|string; name: string; category?: string; price: number }) {
    if (!gtagExists()) return;
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: Number(p.price) || 0,
      items: [{
        item_id: String(p.id),
        item_name: p.name,
        item_category: p.category || '',
        price: Number(p.price) || 0,
        quantity: 1
      }]
    });
  }

  return { trackAddToCart };
}
