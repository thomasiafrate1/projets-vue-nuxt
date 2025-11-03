import { test, expect } from '@playwright/test';

test('la page d’accueil du shop s’affiche', async ({ page }) => {
  // Va sur ton site local
  await page.goto('http://localhost:3002/shop');

  // Vérifie que le titre ou un texte attendu est présent
  await expect(page.locator('text=Mini E-commerce')).toBeVisible();
});

test('on peut cliquer sur un produit', async ({ page }) => {
  await page.goto('http://localhost:3002/shop');
  const firstProduct = page.locator('.card').first();
  await firstProduct.click();

  // Vérifie qu’on est bien sur la page du produit
  await expect(page.locator('text=Ajouter au panier')).toBeVisible();
});
