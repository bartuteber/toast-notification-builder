# Toast Notification Builder

Configure a toast notification, preview it live, fire real toasts that stack, save
configurations as presets, and export the result as a config object.

Built with Vue 3 (Composition API), TypeScript, Vite, Pinia, and Jest.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173 (or the next free port)
npm run test     # Jest test suites
npm run build    # type-check + production build
```

Requires Node `^20.19` or `>=22.12`.

## Features

Core:

- Configuration panel: type, title, message, duration, position, colors, icon
  toggle, close-button toggle
- Live preview that updates as you edit
- "Show Notification" fires a real toast at the selected position
- Auto-dismiss after the configured duration; persistent toasts stay until closed
- Entrance/exit animations
- Multiple toasts stack per corner (newest on top) instead of replacing each other
- Presets: save / load / delete, kept in `localStorage`

Extras:

- Animation styles (fade / slide / bounce)
- Per-type default colors, title, message, and icon
- Progress bar for time remaining
- Icon picker (Iconify)
- Code export with copy-to-clipboard, syntax highlighted
- Dark / light theme toggle

## Approach

The project is split into layers so that logic which doesn't depend on Vue stays
separate from the UI:

```
types/        domain types, shared everywhere
lib/          plain TypeScript: type defaults, option lists, a localStorage helper
stores/       Pinia state
composables/  reactive logic that needs Vue (theme)
components/    UI
containers/   ToastBuilder that composes the screen
```

A few decisions worth calling out:

**State is split into three stores by lifecycle.** The config store is the draft the
user is editing, the notification store is the list of toasts currently on screen, and
the preset store is the saved configurations. They change at different times and for
different reasons, so keeping them apart avoids one store doing three jobs. Showing a
toast copies the draft rather than referencing it, so editing the form afterwards
doesn't affect toasts that are already visible.

**The components under `components/ui/` are presentational.** They take props and emit
events, and don't know the stores exist. `ToastItem` is the clearest example: it renders
a toast purely from the data it's given, which is why the same component is used for both
the live preview and the real overlay. The stores are wired in higher up, in the config
and container components. `SegmentedControl` is generic over its value type, so Type,
Position, and Animation reuse one component without giving up type safety.

**Styling goes through CSS custom properties** defined in `assets/styles/tokens.css`.
Components reference `var(--…)` instead of literal colors or spacing, so the dark theme is
mainly a matter of swapping those variables under a `data-theme` attribute.

**localStorage access is wrapped** in a small typed helper rather than called directly
across the code, so JSON parsing and missing-value handling live in one place.

**Persistent is derived, not stored.** Duration is the single field; `persistent` is a
getter for `duration === 0`, so there's no second flag to keep in sync.

### Testing

Two suites, aimed at the logic most likely to break rather than at rendering:

- `usePresetStore.spec.ts` -> saving and loading round-trips through localStorage, delete
  works, and a saved preset is a snapshot (later edits don't change it).
- `useNotificationStore.spec.ts` -> with fake timers: a toast auto-dismisses when its
  duration elapses, the seconds→ms conversion is correct, persistent toasts (duration 0)
  never auto-dismiss, and a manual dismiss clears the pending timer.

## Assumptions

- **Each type has default colors, title, message, and icon, and picking a type fills
  them in.** Without this, choosing a type wouldn't really do anything on its own. The
  defaults are a starting point. Every field stays editable afterwards.
- **Four positions** (`top-left`, `top-right`, `bottom-left`, `bottom-right`), matching
  the provided `Position` type, even though an early mockup showed six cells. The type
  was treated as the source of truth.
- **`id` stays on `NotificationConfig` to match the brief's type**, even though it
  really describes a concrete instance rather than the configuration itself. So the
  editable draft is `Omit<NotificationConfig, 'id'>`, and an id is only assigned once a
  config becomes an active toast (to dismiss the right one in a stack) or a saved preset.
  The preset id is what delete keys off; an edit feature would have needed it too, but
  edit isn't in the brief, so it wasn't built.
