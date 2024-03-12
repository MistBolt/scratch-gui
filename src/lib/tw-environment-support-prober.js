import Renderer from 'scratch-render';

let cachedRendererSupport = null;
export const isRendererSupported = () => {
    if (cachedRendererSupport === null) {
        cachedRendererSupport = Renderer.isSupported();
    }
    return cachedRendererSupport;
};

let cachedNewFunctionSupport = null;
export const isNewFunctionSupported = () => {
    if (cachedNewFunctionSupport === null) {
        try {
            // This will throw if blocked by CSP
            // eslint-disable-next-line no-new
            new Function('');
            cachedNewFunctionSupport = true;
        } catch (e) {
            cachedNewFunctionSupport = false;
        }
    }
    return cachedNewFunctionSupport;
};

export const findIncompatibleUserscripts = () => {
    /* eslint-disable max-len */

    // Chibi < v4 breaks extensionURLs in project.json
    // Check suggested by SinanShiki
    if (typeof window.chibi === 'object' && Number(window.chibi.version) <= 3) {
        return ['You are using an old version of the "Chibi" userscript that has known project corruption bugs. Please disable it, uninstall it, or update to version 4.'];
    }

    /* eslint-enable max-len */
    return [];
};

export const isBrowserSupported = () => (
    isNewFunctionSupported() &&
    isRendererSupported() &&
    findIncompatibleUserscripts().length === 0
);
