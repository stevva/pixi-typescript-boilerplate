# Test task

### Task 1

- Create a 4 by 3 `SlotMatrix` consisting of `Symbol` objects (4 symbols in width, 3 in height) visually centered on the Pixi.js canvas
- Pixi.js canvas should cover available screen dimensions and respond to resizes. `SymbolMatrix` should respond to the canvas (Stage) resize - all `Symbols` within `SymbolMatrix` should always be visible.
- Symbol is characterized (& instantiated) by it’s **id** (string, i.e. “L01”, “L02”, “H01” etc). Symbol is visually represented with a `Sprite`(200px in width & 250px in height). Use provided texture for appropriate Symbol ids. **Alternatively** - you can visually represent a symbol as a container with `Graphics` background and `Text` object on top of it displaying its **id**. Feel free to choose approach.
- `SymbolMatrix` should be instantiated with randomly populated Symbols.

### Task 1.1

- 2 seconds after loading start animation of zooming out the `SlotMatrix` to 0.8 factor of its current scale. Bonus points - keep `SlotMatrix` centered on the screen. Animation should last 1 second.

### Task 1.2.1

- If randomly generated SlotMatrix contains same symbol in first three columns (at least) - perform “win” animation on those symbols (i.e. mild scale-up on each symbol, or alpha change etc). This should happen after all previous animations are finished.

### Task 1.2.2

- If randomly generated SlotMatrix doesn’t contain same symbol in first three columns - 3 seconds after loading perform movement animation of top left Symbol to the position of the bottom right symbol. Bonus points - apply easing. Animation should last 2 seconds.
