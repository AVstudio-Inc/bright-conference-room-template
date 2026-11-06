function shutdownCountdown(data) {
    const api = window?.avstudio;
    if (!api) return data;
    function cancel() {
        const previous = window.brightConferenceShutdown;
        window.brightConferenceShutdown = null;
        if (previous) clearTimeout(previous.timer);
    }
    function finish() {
        const state = window.brightConferenceShutdown;
        if (!state) return;
        cancel();
        api.setVariableByName({ name: 'shutdownSeconds', value: 0 });
        api.publishDigital({ signalName: '307', value: true });
        // Release must still run after the overlay unmounts.
        setTimeout(function releaseShutdown() {
            api.publishDigital({ signalName: '307', value: false });
        }, 100);
        const request = Number(api.getVariableByName({ name: 'shutdownCloseRequest' })) || 0;
        api.setVariableByName({ name: 'shutdownCloseRequest', value: request + 1 });
    }
    if (data === 'cancel') { cancel(); return data; }
    if (data === 'finish') { finish(); return data; }
    if (data !== 'start') return data;
    cancel();
    const state = { deadline: Date.now() + 10000, timer: null };
    window.brightConferenceShutdown = state;
    api.setVariableByName({ name: 'shutdownSeconds', value: 10 });
    function tick() {
        if (window.brightConferenceShutdown !== state) return;
        const remaining = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
        api.setVariableByName({ name: 'shutdownSeconds', value: remaining });
        if (remaining === 0) finish();
        else state.timer = setTimeout(tick, Math.min(1000, state.deadline - Date.now()));
    }
    state.timer = setTimeout(tick, 1000);
    return data;
}
