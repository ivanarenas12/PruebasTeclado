// ========================
// Plugin SignalRGB - Aula F108
// ========================

export function Name() { return "Aula F108"; }
export function VendorId() { return 0x258A; }
export function ProductId() { return 0x010C; }
export function Publisher() { return "Iván"; }
export function Documentation() { return "devices/aula/f108"; }
export function DeviceType() { return "Keyboard"; }
export function Size() { return [23,6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 12.0; }

// ========================
// Parámetros configurables
// ========================
export function ControllableParameters() {
    return [
        { property: "shutdownColor", group: "lighting", label: "Shutdown Color", type: "color", default: "#009bde" },
        { property: "lightingMode", group: "lighting", label: "Lighting Mode", type: "combobox", values: ["Canvas", "Forced"], default: "Canvas" },
        { property: "forcedColor", group: "lighting", label: "Forced Color", type: "color", default: "#009bde" },
    ];
}

// ========================
// LEDs
// ========================
const vKeyNames = [
  // Fila 0 - Función y Esc
  "Esc","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrtSc","ScrollLock","Pause","Calculator","VolumeDown","Mute","VolumeUp",
  // Fila 1 - ` y números
  "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
  // Fila 2 - Bloque de navegación
  "Insert","Home","PageUp","NumLock","NumpadDivide","NumpadMultiply","NumpadSubtract",
  // Fila 3 - Q-P
  "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\",
  "Delete","End","PageDown","Numpad7","Numpad8","Numpad9","NumpadAdd",
  // Fila 4 - A-L
  "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter","Numpad4","Numpad5","Numpad6",
  // Fila 5 - Z-M + flechas
  "LeftShift","Z","X","C","V","B","N","M",",",".","/","RightShift","ArrowUp","Numpad1","Numpad2","Numpad3","NumpadEnter",
  // Fila 6 - Barra espaciadora y teclas especiales
  "LeftCtrl","LeftWin","LeftAlt","Space","RightAlt","Fn","Menu","RightCtrl","ArrowLeft","ArrowDown","ArrowRight","Numpad0","NumpadDecimal"
];

const vKeyPositions = [
  // Fila 0 - Función y Esc
  [0,0],[2,0],[3,0],[4,0],[5,0],[7,0],[8,0],[9,0],[10,0],[12,0],[13,0],[14,0],[15,0],[17,0],[18,0],[19,0],[21,0],[22,0],[23,0],
  // Fila 1 - ` y números
  [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],
  // Fila 2 - Bloque de navegación y numpad
  [15,1],[16,1],[17,1],[19,1],[20,1],[21,1],[22,1],
  // Fila 3 - Q-P
  [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],
  [15,2],[16,2],[17,2],[19,2],[20,2],[21,2],[22,2],
  // Fila 4 - A-L
  [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],
  [15,3],[16,3],[17,3],
  // Fila 5 - Z-M + flechas
  [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],
  [15,4],[16,4],[17,4],[19,4],
  // Fila 6 - Barra espaciadora y teclas especiales
  [0,5],[2,5],[4,5],[6,5],[8,5],[10,5],[12,5],[14,5],[16,5],[18,5],[20,5],[22,5],[23,5]
];


// ========================
// Inicialización
// ========================
let deviceColors = new Array(vKeyNames.length).fill([0,0,0]);
export function Initialize() {
    console.log("🟢 Aula F108 plugin initialized");
}

// ========================
// Validación
// ========================
export function Validate(endpoint) {
    return endpoint.interface === 1 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff00;
}

// ========================
// Render y envío de colores
// ========================
export function Render() {
    let rgbData = grabColors();
    let packet = [0x06,0x08,0x00,0x00,0x01,0x00,0x7a,0x01].concat(rgbData);
    device.send_report(packet, 520);
}

function grabColors() {
    let rgbData = [];
    for (let i = 0; i < vKeyNames.length; i++) {
        let color;
        let pos = vKeyPositions[i];

        if(pos[0] < 0 || pos[1] < 0) {
            color = [0,0,0]; // apagado
        } else if (lightingMode === "Forced") {
            color = hexToRgb(forcedColor);
        } else {
            color = device.color(pos[0], pos[1]);
        }
        rgbData.push(...color);
    }
    // Padding para el envío
    rgbData.push(...new Array(24).fill(0));
    return rgbData;
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
}

// ========================
// Funciones de cierre
// ========================
export function Shutdown() {
    console.log("🔴 Aula F108 plugin shutdown");
}

// ========================
// LEDs accesibles
// ========================
export function LedNames() { return vKeyNames; }
export function LedPositions() { return vKeyPositions; }






