figma.showUI(__html__);

figma.ui.resize(600,500);

async function init() {
    await figma.loadAllPagesAsync(); // Carrega todas as páginas do documento

    figma.ui.onmessage = async (pluginMessage) => {
        await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

        const nodes:SceneNode[] = [];

        const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
        let selectedVariant;

        if (pluginMessage.darkModeState === true) {
            switch (pluginMessage.imageVariant) {
                case "2":
                    selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
                    break;
                case "3":
                    selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
                    break;            
                default:
                    selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
                    break;
            }
        } else {
            switch (pluginMessage.imageVariant) {
                case "2":
                    selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
                    break;
                case "3":
                    selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
                    break;            
                default:
                    selectedVariant = postComponentSet.defaultVariant as ComponentNode;
                    break;
            }
        }

        //const variants = postComponentSet.findAll(node => node.type === "COMPONENT");
        //console.log(variants.map(v => v.name)); 

        try {
            const newPost = selectedVariant.createInstance();
            if (!newPost) {
                console.error("Falha ao criar uma nova instância.");
            }

            const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
            const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
            const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;
            const numLikes = newPost.findOne(node => node.name == "likesLabel" && node.type == "TEXT") as TextNode;
            const numComments = newPost.findOne(node => node.name == "commentsLabel" && node.type == "TEXT") as TextNode;

            templateName.characters = pluginMessage.name;
            templateUsername.characters = pluginMessage.username;
            templateDescription.characters = pluginMessage.description;
            numLikes.characters = (Math.floor(Math.random() * 1000) + 1).toString();
            numComments.characters = (Math.floor(Math.random() * 1000) + 1).toString();

            if (newPost) {
                nodes.push(newPost);
            } else {
                console.error("newPost não é válido.");
            }

            figma.viewport.scrollAndZoomIntoView(nodes);
        } catch (error) {
            console.error("Erro ao criar instância:", error);
        }

        figma.closePlugin();
    }
}

init();