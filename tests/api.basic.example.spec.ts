import { test, expect, APIRequestContext } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://petstore.swagger.io/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  });
})

test.afterAll(async () => {
  // Dispose all responses.
  await apiContext.dispose();
});


test('GET: get inventory', async () => {
  const inventory = await apiContext.get('/v2/store/inventory');
  expect(inventory.ok()).toBeTruthy();
  expect(inventory.status()).toBe(200);
});


test('GET: find by status', async () => {
  const inventory = await apiContext.get('/v2/pet/findByStatus?status=pending');
  expect(inventory.ok()).toBeTruthy();
  expect(inventory.status()).toBe(200);
});


test('POST order', async () => {
  const inventory = await apiContext.post('v2/store/order',
  {
    data: {
      "id": 1,
      "petId": 1,
      "quantity": 10,
      "shipDate": "2024-02-04T19:30:00.403+0000",
      "status": "placed",
      "complete": true
    }
  });

  expect(inventory.ok()).toBeTruthy();
  expect(inventory.status()).toBe(200);
});
