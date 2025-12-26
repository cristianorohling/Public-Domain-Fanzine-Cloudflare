
// config/settings.ts

/**
 * ARQUIVO DE CONFIGURAÇÃO CENTRAL
 * --------------------------------
 * Edite os valores neste arquivo para atualizar os preços e custos de frete
 * em todo o site.
 */

/**
 * Preços de cada edição do fanzine.
 * A chave é o número da edição (issue) e o valor é o preço em BRL.
 * Edições da série principal usam números baixos (1, 2, 3...).
 * Edições especiais/independentes usam IDs a partir de 101.
 */
export const EDITION_PRICES: Record<number, number> = {
  1: 22.00, // The Black Orchid
  2: 24.00, // Thor, God of Thunder
  3: 22.00, // Bob Phantom
  4: 24.00, // Mysta of the Moon
  5: 25.00, // Daredevil, Master of Courage
  6: 25.00, // Stardust the Super Wizard
  101: 35.00, // Chocantes Histórias #01 (Independente)
};

/**
 * Configurações de Custo de Frete
 */
// O custo base para o envio do primeiro item.
export const SHIPPING_BASE_COST = 10.00;

// O custo adicional para cada item extra adicionado ao carrinho.
// Ex: Se o carrinho tem 3 itens, o frete será:
// SHIPPING_BASE_COST + (2 * SHIPPING_ADDITIONAL_COST_PER_ITEM)
export const SHIPPING_ADDITIONAL_COST_PER_ITEM = 5.00;
