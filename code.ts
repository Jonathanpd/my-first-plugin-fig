figma.showUI(__html__);

figma.ui.resize(600,500);

figma.ui.onmessage = pluginMessage => {
    const {name, username, description, darkModeState, imageVariant} = pluginMessage;
    console.log(name, username, description, darkModeState, imageVariant);
}