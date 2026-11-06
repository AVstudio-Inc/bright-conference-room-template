// Demonstration only: optimistic local display labels/icons.
// The Crestron processor performs routing and returns actual state on A111–113.
function routeSource(data) {
    if (data !== 'presentationSource' && data !== 'conferenceSource') return data;
    const api = window?.avstudio;
    if (!api) return data;
    const id = api.getVariableByName({ name: data });
    const sources = api.getDatasource({ path: 'datasources/sources.datasource' });
    const source = Array.isArray(sources) ? sources.find(item => item.id === id) : null;
    if (!source || !Number.isInteger(source.joinValue)) return data;
    if (data === 'conferenceSource') return data;
    for (const letter of ['A', 'B', 'C']) {
        const prefix = 'destination' + letter;
        if (api.getVariableByName({ name: prefix + 'Selected' }) !== true) continue;
        api.setVariableByName({ name: prefix + 'Source', value: source.id });
        api.setVariableByName({ name: prefix + 'SourceLabel', value: source.label });
        api.setVariableByName({ name: prefix + 'SourceIcon', value: source.icon });
    }
    return data;
}
