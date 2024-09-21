figma.showUI(__html__);

figma.ui.resize(600,500);

async function init() {
    await figma.loadAllPagesAsync(); // Carrega todas as páginas do documento

    figma.ui.onmessage = pluginMessage => {
        const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
        // const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
        // const defaultDark = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;

        /* if (pluginMessage.imageVariant === true) {
            defaultDark.createInstance()
        } else {
            defaultVariant.createInstance()
        } */

        console.log(postComponentSet);
        console.log(postComponentSet.children);
        console.log(postComponentSet.name);

        const {name, username, description, darkModeState, imageVariant} = pluginMessage;
        console.log(name, username, description, darkModeState, imageVariant);

        if(pluginMessage.darkModeState === true) {
            console.log('dark')
        } else {
            console.log('light')
        }

        figma.closePlugin();
    }
}

init();

//figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post");

