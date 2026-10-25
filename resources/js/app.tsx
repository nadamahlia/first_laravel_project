import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<{ default: ComponentType<any> }>(
    './pages/**/*.tsx',
);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: async (name) => {
        const page = pages[`./pages/${name}.tsx`];

        if (!page) {
            throw new Error(`Page not found: ./pages/${name}.tsx`);
        }

        return (await page()).default;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});