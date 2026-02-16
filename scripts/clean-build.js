import { execSync } from 'child_process';
import { rmSync } from 'fs';

// Clean .next cache
try {
  rmSync('.next', { recursive: true, force: true });
  console.log('Cleaned .next directory');
} catch (e) {
  console.log('.next not found or already clean');
}

// Clean node_modules
try {
  rmSync('node_modules', { recursive: true, force: true });
  console.log('Cleaned node_modules directory');
} catch (e) {
  console.log('node_modules not found or already clean');
}

// Reinstall dependencies
try {
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' });
  console.log('Dependencies reinstalled');
} catch (e) {
  console.log('Install error:', e.message);
}
