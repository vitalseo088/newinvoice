import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.resolve(process.cwd(), 'src/locales');
const BASE_LANG = 'en';
const TARGET_LANGS = ['es', 'fr', 'de', 'pt', 'it'];

function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      keys = keys.concat(getKeys(val, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

let hasError = false;

const namespaces = fs.readdirSync(path.join(LOCALES_DIR, BASE_LANG)).filter(f => f.endsWith('.json'));

console.log(`Checking i18n keys against base language: ${BASE_LANG}`);

for (const nsFile of namespaces) {
  const ns = nsFile.replace('.json', '');
  const basePath = path.join(LOCALES_DIR, BASE_LANG, nsFile);
  const baseContent = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  const baseKeys = getKeys(baseContent);

  console.log(`\n--- Namespace: ${ns} (${baseKeys.length} keys in ${BASE_LANG}) ---`);

  for (const lang of TARGET_LANGS) {
    const targetPath = path.join(LOCALES_DIR, lang, nsFile);
    if (!fs.existsSync(targetPath)) {
      console.error(`❌ [${lang}] Missing file: ${nsFile}`);
      hasError = true;
      continue;
    }

    const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const targetKeys = getKeys(targetContent);

    const missing = baseKeys.filter(k => !targetKeys.includes(k));
    const extra = targetKeys.filter(k => !baseKeys.includes(k));

    if (missing.length > 0) {
      console.error(`❌ [${lang}] Missing ${missing.length} keys:`, missing);
      hasError = true;
    }
    if (extra.length > 0) {
      console.warn(`⚠️ [${lang}] Has ${extra.length} extra keys:`, extra);
    }

    if (missing.length === 0) {
      console.log(`✅ [${lang}] All ${baseKeys.length} keys present`);
    }
  }
}

if (hasError) {
  console.error('\n❌ i18n check failed: missing keys detected.');
  process.exit(1);
} else {
  console.log('\n🎉 i18n check passed: all keys match perfectly across all languages!');
  process.exit(0);
}
