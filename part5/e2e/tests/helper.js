const loginWith = async (page, username, password) => {
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Show blog form" }).click();
  await page.locator("#create-title").fill(title);
  await page.locator("#create-author").fill(author);
  await page.locator("#create-url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
