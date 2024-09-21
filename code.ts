figma.showUI(__html__);

figma.ui.resize(600,500);

figma.ui.onmessage = pluginMessage => {
    const {name, username, description, darkModeState, imageVariant} = pluginMessage;
    console.log(name, username, description, darkModeState, imageVariant);

    if(pluginMessage.darkModeState === true) {
        console.log('dark')
    } else {
        console.log('light')
    }

    figma.closePlugin();
}

//figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post");