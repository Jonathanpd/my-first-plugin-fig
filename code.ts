figma.showUI(__html__);

figma.ui.onmessage = async (msg: { type: string, count?: number }) => {
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      // createRectangle()
      const rect = figma.createRectangle();
      rect.x = i * 150;

      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);

      // createText()
      const text = figma.createText();
      text.x = i * 150;
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      text.characters = 'Hello world!';
      text.fontSize = 18;
      figma.currentPage.appendChild(text);
      nodes.push(text);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};