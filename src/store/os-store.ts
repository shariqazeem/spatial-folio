import { create } from 'zustand';

export type AppId = 'about' | 'work' | 'stack' | 'contact';

export interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    prevPosition?: { x: number; y: number };
    prevSize?: { width: number; height: number };
}

interface OSState {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    highestZIndex: number;
    soundEnabled: boolean;

    // Actions
    openWindow: (id: AppId) => void;
    closeWindow: (id: AppId) => void;
    minimizeWindow: (id: AppId) => void;
    toggleMaximizeWindow: (id: AppId) => void;
    focusWindow: (id: AppId) => void;
    updateWindowPosition: (id: AppId, position: { x: number; y: number }) => void;
    toggleSound: () => void;
    closeAllWindows: () => void;
}

const getDefaultWindows = (): Record<AppId, WindowState> => ({
    about: {
        id: 'about',
        title: 'About',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100, y: 80 },
        size: { width: 550, height: 520 },
        zIndex: 0,
    },
    work: {
        id: 'work',
        title: 'Work',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        position: { x: 150, y: 60 },
        size: { width: 850, height: 600 },
        zIndex: 0,
    },
    stack: {
        id: 'stack',
        title: 'Stack',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        position: { x: 200, y: 80 },
        size: { width: 700, height: 500 },
        zIndex: 0,
    },
    contact: {
        id: 'contact',
        title: 'Contact',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        position: { x: 250, y: 100 },
        size: { width: 480, height: 450 },
        zIndex: 0,
    },
});

export const useOSStore = create<OSState>((set, get) => ({
    windows: getDefaultWindows(),
    activeWindowId: null,
    highestZIndex: 0,
    soundEnabled: true,

    openWindow: (id) => {
        const { highestZIndex, windows } = get();
        const newZIndex = highestZIndex + 1;

        // If already open, just focus it
        if (windows[id].isOpen && !windows[id].isMinimized) {
            get().focusWindow(id);
            return;
        }

        // Calculate center position
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        const openCount = Object.values(windows).filter(w => w.isOpen && !w.isMinimized).length;
        const offset = openCount * 25;

        set({
            windows: {
                ...windows,
                [id]: {
                    ...windows[id],
                    isOpen: true,
                    isMinimized: false,
                    zIndex: newZIndex,
                    position: {
                        x: Math.max(40, (windowWidth - windows[id].size.width) / 2 + offset),
                        y: Math.max(40, (windowHeight - windows[id].size.height) / 2 - 40 + offset),
                    },
                },
            },
            activeWindowId: id,
            highestZIndex: newZIndex,
        });
    },

    closeWindow: (id) => {
        const { windows, activeWindowId } = get();

        // Find next active window
        let nextActive: AppId | null = null;
        if (activeWindowId === id) {
            const openWindows = Object.values(windows)
                .filter(w => w.isOpen && w.id !== id && !w.isMinimized)
                .sort((a, b) => b.zIndex - a.zIndex);
            nextActive = openWindows[0]?.id || null;
        }

        set({
            windows: {
                ...windows,
                [id]: {
                    ...getDefaultWindows()[id],
                    zIndex: 0,
                },
            },
            activeWindowId: activeWindowId === id ? nextActive : activeWindowId,
        });
    },

    minimizeWindow: (id) => {
        const { windows, activeWindowId } = get();

        // Find next active window
        let nextActive: AppId | null = activeWindowId;
        if (activeWindowId === id) {
            const openWindows = Object.values(windows)
                .filter(w => w.isOpen && w.id !== id && !w.isMinimized)
                .sort((a, b) => b.zIndex - a.zIndex);
            nextActive = openWindows[0]?.id || null;
        }

        set({
            windows: {
                ...windows,
                [id]: {
                    ...windows[id],
                    isMinimized: true,
                },
            },
            activeWindowId: nextActive,
        });
    },

    toggleMaximizeWindow: (id) => {
        const { windows, highestZIndex } = get();
        const win = windows[id];
        const newZIndex = highestZIndex + 1;

        if (win.isMaximized) {
            // Restore
            set({
                windows: {
                    ...windows,
                    [id]: {
                        ...win,
                        isMaximized: false,
                        position: win.prevPosition || win.position,
                        size: win.prevSize || win.size,
                        zIndex: newZIndex,
                    },
                },
                activeWindowId: id,
                highestZIndex: newZIndex,
            });
        } else {
            // Maximize
            const padding = 10;
            const dockHeight = 80;
            set({
                windows: {
                    ...windows,
                    [id]: {
                        ...win,
                        isMaximized: true,
                        prevPosition: win.position,
                        prevSize: win.size,
                        position: { x: padding, y: padding },
                        size: {
                            width: (typeof window !== 'undefined' ? window.innerWidth : 1200) - padding * 2,
                            height: (typeof window !== 'undefined' ? window.innerHeight : 800) - padding * 2 - dockHeight,
                        },
                        zIndex: newZIndex,
                    },
                },
                activeWindowId: id,
                highestZIndex: newZIndex,
            });
        }
    },

    focusWindow: (id) => {
        const { windows, highestZIndex, activeWindowId } = get();

        // Unminimize if minimized
        const isMinimized = windows[id].isMinimized;

        if (activeWindowId === id && !isMinimized) return;

        const newZIndex = highestZIndex + 1;
        set({
            windows: {
                ...windows,
                [id]: {
                    ...windows[id],
                    zIndex: newZIndex,
                    isMinimized: false,
                },
            },
            activeWindowId: id,
            highestZIndex: newZIndex,
        });
    },

    updateWindowPosition: (id, position) => {
        const { windows } = get();
        // Don't update position if maximized
        if (windows[id].isMaximized) return;

        set({
            windows: {
                ...windows,
                [id]: {
                    ...windows[id],
                    position,
                },
            },
        });
    },

    toggleSound: () => {
        set({ soundEnabled: !get().soundEnabled });
    },

    closeAllWindows: () => {
        set({
            windows: getDefaultWindows(),
            activeWindowId: null,
            highestZIndex: 0,
        });
    },
}));
