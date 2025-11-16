// book-source/tests/e2e/test_highlight_flow.spec.js
import { test, expect } from '@playwright/test';

test.describe('Highlight AI Dialogue End-to-End Flow', () => {
  test('should highlight content, confirm, and display AI dialogue', async ({ page }) => {
    // Navigate to a Docusaurus page with content
    await page.goto('http://localhost:3000/docs/intro'); // Assuming Docusaurus is running on 3000

    // Select some text
    await page.locator('text=Docusaurus Tutorial').selectText();

    // Expect the confirmation popup to appear
    await expect(page.locator('.highlight-popup')).toBeVisible();
    await expect(page.locator('.highlight-popup')).toContainText('Analyze "Docusaurus Tutorial"...?');

    // Confirm the action (e.g., by pressing Enter or clicking a button)
    // For Playwright, we can simulate key press
    await page.keyboard.press('Enter');

    // Expect the AI dialogue to appear
    await expect(page.locator('.highlight-dialog')).toBeVisible();
    await expect(page.locator('.highlight-dialog')).toContainText('AI Guidance');
    await expect(page.locator('.highlight-dialog')).toContainText('Highlighted Content:');
    await expect(page.locator('.highlight-dialog')).toContainText('Explanation:');
    
    // Expect loading state to disappear and response to be present
    await expect(page.locator('.highlight-dialog')).not.toContainText('Loading AI response...');
    await expect(page.locator('.highlight-dialog')).toContainText('This is an AI-generated explanation for: "Docusaurus Tutorial".');

    // Close the dialogue
    await page.locator('.highlight-dialog-close-button').click();
    await expect(page.locator('.highlight-dialog')).not.toBeVisible();
  });

  test('should trigger AI dialogue with Ctrl+Shift+G shortcut', async ({ page }) => {
    await page.goto('http://localhost:3000/docs/intro');

    // Select some text
    await page.locator('text=Docusaurus Tutorial').selectText();

    // Trigger shortcut
    await page.keyboard.press('Control+Shift+G');

    // Expect the AI dialogue to appear directly
    await expect(page.locator('.highlight-dialog')).toBeVisible();
    await expect(page.locator('.highlight-dialog')).toContainText('AI Guidance');
    await expect(page.locator('.highlight-dialog')).toContainText('This is an AI-generated explanation for: "Docusaurus Tutorial".');

    // Close the dialogue
    await page.locator('.highlight-dialog-close-button').click();
    await expect(page.locator('.highlight-dialog')).not.toBeVisible();
  });

  test('should handle API key limit exceeded scenario', async ({ page }) => {
    // This test would require mocking the backend response for 403 Forbidden
    // or setting up a test environment where the default API key limit can be reached.
    // For now, this is a placeholder.
    await page.goto('http://localhost:3000/docs/intro');
    await page.locator('text=Docusaurus Tutorial').selectText();
    await page.keyboard.press('Enter');
    
    // Simulate backend returning 403
    // await expect(page.locator('.highlight-dialog')).toContainText('Default API key limit exceeded.');
    
    // Close the dialogue
    // await page.locator('.highlight-dialog-close-button').click();
  });
});
