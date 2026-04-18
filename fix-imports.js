const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /Shared\/models\/Account/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Basket/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Category/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Delivery/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Orders/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Pagination/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/ProductParams/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/Product/g, replacement: 'shared/models' },
  { regex: /Shared\/models\/rating/g, replacement: 'shared/models' },
  { regex: /Shared\//g, replacement: 'shared/' },
  { regex: /core\/loading\.service/g, replacement: 'core/services/loading.service' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.html') || fullPath.endsWith('.scss')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      // Cleanup multiple imports from the same barrel file like:
      // import { X } from '../shared/models';
      // import { Y } from '../shared/models';
      // I'll just leave it and let IDE or linter optimize it, or we could just fix the casing.
      // Wait, let's just use the exact model files so we don't break things.
      /**
       * Actually, I should replace "Shared/models/Product" with "shared/models/product.model"
       * because if they do `import { Product } from '../Shared/models/Product';`, 
       * it could become `import { Product } from '../shared/models';` which is valid for the barrel file!
       * Yes, barrel files work like that. The typescript compiler resolves `../shared/models` to `../shared/models/index.ts`.
       */

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
