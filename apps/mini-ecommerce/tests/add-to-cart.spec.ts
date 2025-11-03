import { test, expect } from '@playwright/test';

test('ajouter un produit au panier depuis la liste', async ({ page }) => {
  await page.goto('/');                           // = http://localhost:3000/shop/
  // Au cas où la page met un peu de temps à charger les produits:
  await page.getByText('Mini e-commerce').waitFor({ state: 'visible' });

  // Clique sur le premier bouton "Ajouter"
  await page.getByRole('button', { name: 'Ajouter' }).first().click();

  // Le bouton Panier doit afficher (1)
  const cartBtn = page.getByRole('button', { name: /Panier \(\d+\)/ });
  await expect(cartBtn).toHaveText(/Panier \(1\)/);

  // Ouvre le tiroir et vérifie qu’un item est présent
  await cartBtn.click();
  await expect(page.getByText(/Total :/)).toBeVisible();
});

test('ajouter depuis la page produit', async ({ page }) => {
  await page.goto('/product/1');
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  const cartBtn = page.getByRole('button', { name: /Panier \(\d+\)/ });
  await expect(cartBtn).toHaveText(/Panier \(1\)/);
});
