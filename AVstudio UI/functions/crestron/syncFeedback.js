function syncFeedback(data) {
    const api = window?.avstudio;
    if (!api) return data;
    const value = Number(api.getVariableByName({ name: data }));
    if (!Number.isInteger(value) || value < 0) return data;
    if (data === 'cameraNumber') {
        if (value <= 4) api.setVariableByName({ name: 'currentCamera', value: value ? 'Camera_' + value : '' });
        return data;
    }
    if (data === 'cameraPresetNumber') {
        if (value <= 3) api.setVariableByName({ name: 'currentCameraPreset', value: value ? 'Preset_' + value : '0' });
        return data;
    }
    const targets = {
        presentationSourceNumber: 'presentationSource', conferenceSourceNumber: 'conferenceSource',
        destinationASourceNumber: 'destinationASource', destinationBSourceNumber: 'destinationBSource', destinationCSourceNumber: 'destinationCSource'
    };
    const target = targets[data];
    if (!target) return data;
    const sources = api.getDatasource({ path: 'datasources/sources.datasource' });
    if (!Array.isArray(sources)) return data;
    const source = value === 0 ? null : sources.find(item => item.joinValue === value);
    if (value !== 0 && !source) return data;
    api.setVariableByName({ name: target, value: source ? source.id : '' });
    if (target.startsWith('destination')) {
        api.setVariableByName({ name: target + 'Label', value: source ? source.label : 'No source' });
        api.setVariableByName({ name: target + 'Icon', value: source ? source.icon : 'FaDesktop' });
    }
    return data;
}
