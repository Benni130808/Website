import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Benjamin's finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Benjamin — Field Notes<\/title>/i);
  assert.match(html, /Benjamin, 18: Sport, Musik, Code und Meer/);
  assert.match(html, /BENJAMIN/);
  assert.match(html, /Neun Dinge/);
  assert.match(html, /Drei Ziele/);
  assert.match(html, /\/images\/sport-benjamin\.webp/);
  assert.match(html, /\/images\/musik-benjamin\.webp/);
  assert.match(html, /\/images\/code-benjamin\.webp/);
  assert.match(html, /\/images\/meer-benjamin\.webp/);
  assert.match(html, /\/og-v3\.png/);
  assert.doesNotMatch(html, /codex-preview|Building your site|Starter Project/i);
});

test("keeps the generated identity assets project-local", async () => {
  const page = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  for (const asset of [
    "sport-benjamin.webp",
    "musik-benjamin.webp",
    "code-benjamin.webp",
    "meer-benjamin.webp",
  ]) {
    assert.match(page, new RegExp(`/images/${asset.replace(".", "\\.")}`));
    await access(new URL(`../public/images/${asset}`, import.meta.url));
  }

  assert.match(layout, /og-v3\.png/);
  await access(new URL("../public/og-v3.png", import.meta.url));
  assert.doesNotMatch(page, /\/images\/(sport|musik|code|meer)\.png/);
});
