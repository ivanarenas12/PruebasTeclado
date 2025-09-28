
Device.Name = "Aula F108";
Device.VendorId = 0x258A;
Device.ProductId = 0x010C;
Device.Type = "Keyboard";
Device.MaxLeds = 108;
Device.Description = "Aula F108 Mechanical Keyboard - 108-Key Per-Key RGB";

// ---------------- Inicialización ----------------
Device.Initialize = function() {
    if (!Device.OpenRGBDevice()) {
        Console.Print("❌ No se pudo abrir el Aula F108");
        return false;
    }
    Console.Print("✅ Aula F108 inicializado correctamente");
    return true;
};

// ---------------- Renderizado RGB ----------------
// Basado en el XINMENG X75: buffer extendido de 520 bytes
Device.Render = function() {
    var buffer = new Array(520).fill(0);

    // Encabezado (igual al X75)
    buffer[0] = 0x00;
    buffer[1] = 0x00;
    buffer[2] = 0x00;
    buffer[3] = 0x00;

    for (var i = 0; i < Device.MaxLeds; i++) {
        var color = Device.GetLedColor(i); // [R, G, B]
        var offset = 4 + (i * 4);

        buffer[offset]     = color[0]; // R
        buffer[offset + 1] = color[1]; // G
        buffer[offset + 2] = color[2]; // B
        buffer[offset + 3] = 0x00;     // reservado (padding/alpha)
    }

    Device.SendRGBReport(buffer);
};

// ---------------- Liberar recurso ----------------
Device.Release = function() {
    Device.Close();
};

// ---------------- Layout 108 teclas ----------------
Device.Leds = [
    // Row 0
    { Name: "Key_Escape", X: 0, Y: 0 },
    { Name: "Key_F1", X: 2, Y: 0 }, { Name: "Key_F2", X: 3, Y: 0 }, { Name: "Key_F3", X: 4, Y: 0 }, { Name: "Key_F4", X: 5, Y: 0 },
    { Name: "Key_F5", X: 7, Y: 0 }, { Name: "Key_F6", X: 8, Y: 0 }, { Name: "Key_F7", X: 9, Y: 0 }, { Name: "Key_F8", X: 10, Y: 0 },
    { Name: "Key_F9", X: 12, Y: 0 }, { Name: "Key_F10", X: 13, Y: 0 }, { Name: "Key_F11", X: 14, Y: 0 }, { Name: "Key_F12", X: 15, Y: 0 },
    { Name: "Key_PrintScreen", X: 17, Y: 0 }, { Name: "Key_ScrollLock", X: 18, Y: 0 }, { Name: "Key_Pause", X: 19, Y: 0 },

    // Row 1
    { Name: "Key_Backquote", X: 0, Y: 1 }, { Name: "Key_1", X: 1, Y: 1 }, { Name: "Key_2", X: 2, Y: 1 }, { Name: "Key_3", X: 3, Y: 1 },
    { Name: "Key_4", X: 4, Y: 1 }, { Name: "Key_5", X: 5, Y: 1 }, { Name: "Key_6", X: 6, Y: 1 }, { Name: "Key_7", X: 7, Y: 1 },
    { Name: "Key_8", X: 8, Y: 1 }, { Name: "Key_9", X: 9, Y: 1 }, { Name: "Key_0", X: 10, Y: 1 }, { Name: "Key_Minus", X: 11, Y: 1 },
    { Name: "Key_Equals", X: 12, Y: 1 }, { Name: "Key_Backspace", X: 13.5, Y: 1 },
    { Name: "Key_Insert", X: 15.5, Y: 1 }, { Name: "Key_Home", X: 16.5, Y: 1 }, { Name: "Key_PageUp", X: 17.5, Y: 1 },
    { Name: "Key_NumLock", X: 19, Y: 1 }, { Name: "Key_NumpadDivide", X: 20, Y: 1 }, { Name: "Key_NumpadMultiply", X: 21, Y: 1 }, { Name: "Key_NumpadSubtract", X: 22, Y: 1 },

    // Row 2
    { Name: "Key_Tab", X: 0, Y: 2 }, { Name: "Key_Q", X: 1.5, Y: 2 }, { Name: "Key_W", X: 2.5, Y: 2 }, { Name: "Key_E", X: 3.5, Y: 2 },
    { Name: "Key_R", X: 4.5, Y: 2 }, { Name: "Key_T", X: 5.5, Y: 2 }, { Name: "Key_Y", X: 6.5, Y: 2 }, { Name: "Key_U", X: 7.5, Y: 2 },
    { Name: "Key_I", X: 8.5, Y: 2 }, { Name: "Key_O", X: 9.5, Y: 2 }, { Name: "Key_P", X: 10.5, Y: 2 }, { Name: "Key_LeftBracket", X: 11.5, Y: 2 }, { Name: "Key_RightBracket", X: 12.5, Y: 2 },
    { Name: "Key_Backslash", X: 13.75, Y: 2 },
    { Name: "Key_Delete", X: 15.5, Y: 2 }, { Name: "Key_End", X: 16.5, Y: 2 }, { Name: "Key_PageDown", X: 17.5, Y: 2 },
    { Name: "Key_Numpad7", X: 19, Y: 2 }, { Name: "Key_Numpad8", X: 20, Y: 2 }, { Name: "Key_Numpad9", X: 21, Y: 2 }, { Name: "Key_NumpadAdd", X: 22, Y: 2, Height: 2 },

    // Row 3
    { Name: "Key_CapsLock", X: 0, Y: 3 }, { Name: "Key_A", X: 1.75, Y: 3 }, { Name: "Key_S", X: 2.75, Y: 3 }, { Name: "Key_D", X: 3.75, Y: 3 },
    { Name: "Key_F", X: 4.75, Y: 3 }, { Name: "Key_G", X: 5.75, Y: 3 }, { Name: "Key_H", X: 6.75, Y: 3 }, { Name: "Key_J", X: 7.75, Y: 3 },
    { Name: "Key_K", X: 8.75, Y: 3 }, { Name: "Key_L", X: 9.75, Y: 3 }, { Name: "Key_Semicolon", X: 10.75, Y: 3 }, { Name: "Key_Apostrophe", X: 11.75, Y: 3 },
    { Name: "Key_Enter", X: 13, Y: 3, Width: 2 },
    { Name: "Key_Numpad4", X: 19, Y: 3 }, { Name: "Key_Numpad5", X: 20, Y: 3 }, { Name: "Key_Numpad6", X: 21, Y: 3 },

    // Row 4
    { Name: "Key_LeftShift", X: 0, Y: 4, Width: 2.25 }, { Name: "Key_Z", X: 2.5, Y: 4 }, { Name: "Key_X", X: 3.5, Y: 4 }, { Name: "Key_C", X: 4.5, Y: 4 },
    { Name: "Key_V", X: 5.5, Y: 4 }, { Name: "Key_B", X: 6.5, Y: 4 }, { Name: "Key_N", X: 7.5, Y: 4 }, { Name: "Key_M", X: 8.5, Y: 4 },
    { Name: "Key_Comma", X: 9.5, Y: 4 }, { Name: "Key_Period", X: 10.5, Y: 4 }, { Name: "Key_Slash", X: 11.5, Y: 4 }, { Name: "Key_RightShift", X: 13.25, Y: 4, Width: 2.75 },
    { Name: "Key_ArrowUp", X: 16.5, Y: 4 },
    { Name: "Key_Numpad1", X: 19, Y: 4 }, { Name: "Key_Numpad2", X: 20, Y: 4 }, { Name: "Key_Numpad3", X: 21, Y: 4 }, { Name: "Key_NumpadEnter", X: 22, Y: 4, Height: 2 },

    // Row 5
    { Name: "Key_LeftCtrl", X: 0, Y: 5 }, { Name: "Key_LeftWin", X: 1.25, Y: 5 }, { Name: "Key_LeftAlt", X: 2.25, Y: 5 },
    { Name: "Key_Space", X: 4.25, Y: 5, Width: 6.25 },
    { Name: "Key_RightAlt", X: 10.75, Y: 5 }, { Name: "Key_Fn", X: 11.75, Y: 5 }, { Name: "Key_Menu", X: 12.75, Y: 5 }, { Name: "Key_RightCtrl", X: 13.75, Y: 5 },
    { Name: "Key_ArrowLeft", X: 15.5, Y: 5 }, { Name: "Key_ArrowDown", X: 16.5, Y: 5 }, { Name: "Key_ArrowRight", X: 17.5, Y: 5 },
    { Name: "Key_Numpad0", X: 19, Y: 5, Width: 2 }, { Name: "Key_NumpadDecimal", X: 21, Y: 5 },

    // Multimedia sobre el pad numérico
    { Name: "Key_Calculator", X: 19, Y: -1 }, { Name: "Key_VolumeUp", X: 20, Y: -1 }, { Name: "Key_VolumeDown", X: 21, Y: -1 }, { Name: "Key_Mute", X: 22, Y: -1 },
];
