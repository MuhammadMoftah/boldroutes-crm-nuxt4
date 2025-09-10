import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const iconsDir = join(process.cwd(), 'app', 'components', 'icons');

function transformSFC(source) {
  // If there's no <script> block with export default, do nothing
  const scriptMatch = source.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (!scriptMatch) return source;
  const scriptContent = scriptMatch[1];

  // Detect export default with optional name field
  const hasExportDefault = /export\s+default\s*\{[\s\S]*?\}/.test(scriptContent);
  if (!hasExportDefault) return source;

  // Extract name if present
  let name = null;
  const nameMatch = scriptContent.match(/name\s*:\s*['\"]([^'\"]+)['\"]/);
  if (nameMatch) name = nameMatch[1];

  // Build replacement <script setup>
  const setupLines = [];
  setupLines.push('<script setup>');
  if (name) {
    setupLines.push(`defineOptions({ name: '${name}' });`);
  }
  setupLines.push('</script>');
  const scriptSetup = setupLines.join('\n');

  // Replace the original <script>...</script> with <script setup>...
  const updated = source.replace(/<script[^>]*>[\s\S]*?<\/script>/i, scriptSetup);
  return updated;
}

function run() {
  const files = readdirSync(iconsDir).filter(f => f.endsWith('.vue'));
  for (const file of files) {
    const full = join(iconsDir, file);
    const src = readFileSync(full, 'utf8');
    const transformed = transformSFC(src);
    if (transformed !== src) {
      writeFileSync(full, transformed, 'utf8');
      console.log('Updated', file);
    } else {
      console.log('No change', file);
    }
  }
}

run();




