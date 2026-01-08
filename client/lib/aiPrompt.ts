type OutfitInput = {
    category: string;
    fabric?: string;
    color?: string;
    embroidery?: string;
    sleeve?: string;
  };
  
  export function buildOutfitPrompt(input: OutfitInput) {
    const basePrompt = `
  A high-quality studio fashion photograph of a female mannequin
  wearing a traditional Indian outfit.
  Neutral expression, straight standing pose,
  plain light background, professional studio lighting,
  ultra-realistic fabric texture, sharp focus, fashion catalog style.
  `;
  
    const details = `
  Outfit type: ${input.category}
  Fabric: ${input.fabric || "plain cotton"}
  Color: ${input.color || "white"}
  Embroidery: ${input.embroidery || "none"}
  Sleeve style: ${input.sleeve || "sleeveless"}
  `;
  
    return `${basePrompt}\n${details}`;
  }
  