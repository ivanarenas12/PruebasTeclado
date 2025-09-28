// Aula F108 Plugin para SignalRGB
// Autor: Iván + Sr Dev Support

export function Name() { return "Aula F108"; }
export function VendorId() { return 0x258A; }
export function ProductId() { return 0x010C; }
export function Publisher() { return "Iván"; }
export function Documentation() { return "devices/aula/f108"; }

export function Size() { return [23, 6]; }

export function ControllableParameters() {
    return [];
}

export function Validate(endpoint) {
    return endpoint.interface === 0 && endpoint.usage === 0x0002 && endpoint.usage_page === 0xffc1;
}

export function LedNames() {
    return [
        "Key_Escape", "Key_F1", "Key_F2", "Key_F3", "Key_F4", "Key_F5", "Key_F6", "Key_F7", "Key_F8",
        "Key_F9", "Key_F10", "Key_F11", "Key_F12", "Key_PrintScreen", "Key_ScrollLock", "Key_Pause",
        "Key_Backquote", "Key_1", "Key_2", "Key_3", "Key_4", "Key_5", "Key_6", "Key_7", "Key_8", "Key_9",
        "Key_0", "Key_Minus", "Key_Equals", "Key_Backspace", "Key_Insert", "Key_Home", "Key_PageUp",
        "Key_NumLock", "Key_NumpadDivide", "Key_NumpadMultiply", "Key_NumpadSubtract", "Key_Tab", "Key_Q",
        "Key_W", "Key_E", "Key_R", "Key_T", "Key_Y", "Key_U", "Key_I", "Key_O", "Key_P", "Key_LeftBracket",
        "Key_RightBracket", "Key_Backslash", "Key_Delete", "Key_End", "Key_PageDown", "Key_Numpad7",
        "Key_Numpad8", "Key_Numpad9", "Key_NumpadAdd", "Key_CapsLock", "Key_A", "Key_S", "Key_D", "Key_F",
        "Key_G", "Key_H", "Key_J", "Key_K", "Key_L", "Key_Semicolon", "Key_Apostrophe", "Key_Enter",
        "Key_Numpad4", "Key_Numpad5", "Key_Numpad6", "Key_LeftShift", "Key_Z", "Key_X", "Key_C", "Key_V",
        "Key_B", "Key_N", "Key_M", "Key_Comma", "Key_Period", "Key_Slash", "Key_RightShift", "Key_ArrowUp",
        "Key_Numpad1", "Key_Numpad2", "Key_Numpad3", "Key_NumpadEnter", "Key_LeftCtrl", "Key_LeftWin",
        "Key_LeftAlt", "Key_Space", "Key_RightAlt", "Key_Fn", "Key_Menu", "Key_RightCtrl", "Key_ArrowLeft",
        "Key_ArrowDown", "Key_ArrowRight", "Key_Numpad0", "Key_NumpadDecimal", "Key_Calculator",
        "Key_VolumeUp", "Key_VolumeDown", "Key_Mute"
    ];
}

export function LedPositions() {
    return [
        [0, 0], [2, 0], [3, 0], [4, 0], [5, 0], [7, 0], [8, 0], [9, 0], [10, 0], [12, 0], [13, 0],
        [14, 0], [15, 0], [17, 0], [18, 0], [19, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
        [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13.5, 1], [15.5, 1], [16.5, 1],
        [17.5, 1], [19, 1], [20, 1], [21, 1], [22, 1], [0, 2], [1.5, 2], [2.5, 2], [3.5, 2], [4.5, 2],
        [5.5, 2], [6.5, 2], [7.5, 2], [8.5, 2], [9.5, 2], [10.5, 2], [11.5, 2], [12.5, 2], [13.75, 2],
        [15.5, 2], [16.5, 2], [17.5, 2], [19, 2], [20, 2], [21, 2], [22, 2], [0, 3], [1.75, 3], [2.75, 3],
        [3.75, 3], [4.75, 3], [5.75, 3], [6.75, 3], [7.75, 3], [8.75, 3], [9.75, 3], [10.75, 3], [11.75, 3],
        [13, 3], [19, 3], [20, 3], [21, 3], [0, 4], [2.5, 4], [3.5, 4], [4.5, 4], [5.5, 4], [6.5, 4],
        [7.5, 4], [8.5, 4], [9.5, 4], [10.5, 4], [11.5, 4], [13.25, 4], [16.5, 4], [19, 4], [20, 4],
        [21, 4], [22, 4], [0, 5], [1.25, 5], [2.25, 5], [4.25, 5], [10.75, 5], [11.75, 5], [12.75, 5],
        [13.75, 5], [15.5, 5], [16.5, 5], [17.5, 5], [19, 5], [21, 5], [19, -1], [20, -1], [21, -1],
        [22, -1]
    ];
}

// ========================
// Inicialización del dispositivo
// ========================
let rgbEndpoint = null;

export function Initialize() {
    rgbEndpoint = device.OpenRGBDevice();
    if (!rgbEndpoint) {
        console.error("❌ No se pudo abrir Aula F108");
        return false;
    }
    console.log("✅ Aula F108 inicializado");
    return true;
}

// ========================
// Render con control de warning solo la primera vez
// ========================
let warnedNoColors = false;

export function Render(colors) {
    if (!Array.isArray(colors) || colors.length === 0) {
        if (!warnedNoColors) {
            console.warn("⚠ Render llamado sin colores válidos");
            warnedNoColors = true;
        }
        colors = new Array(LedNames().length).fill([0, 0, 0]);
    }

    let buffer = new Array(520).fill(0);
    buffer[0] = 0x00;
    buffer[1] = 0x00;
    buffer[2] = 0x00;
    buffer[3] = 0x00;

    for (let i = 0; i < colors.length && i < LedNames().length; i++) {
        let c = colors[i];
        buffer[4 + i * 4] = c[0] || 0;
        buffer[4 + i * 4 + 1] = c[1] || 0;
        buffer[4 + i * 4 + 2] = c[2] || 0;
        buffer[4 + i * 4 + 3] = 0x00;
    }

    if (rgbEndpoint) {
        rgbEndpoint.SendReport(buffer);
    }
}

// ========================
// Cierre del dispositivo
// ========================
export function Shutdown() {
    if (rgbEndpoint) {
        rgbEndpoint.Close();
        rgbEndpoint = null;
        console.log("🔴 Aula F108 cerrado");
    }
}



