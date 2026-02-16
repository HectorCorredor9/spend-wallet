import { ICard } from '@/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CardStoreState {
  card: ICard;
  setCurrentCard: (card: ICard) => void;
}

/**
 * Zustand store para manejar la tarjeta seleccionada en la aplicación.
 *
 * @property {ICard} card - Tarjeta seleccionada.
 * @property {function} setCurrentCard - Función para actualizar la tarjeta seleccionada.
 *
 * @example
 * ```tsx
 * import { useCardStore } from '@/store/useCardsStore';
 *
 * const card = useCardStore((state) => state.card);
 * const setCurrentCard = useCardStore((state) => state.setCurrentCard);
 *
 * // Para actualizar la tarjeta seleccionada:
 * setCurrentCard(nuevaTarjeta);
 * ```
 */
export const useCardStore = create<CardStoreState>()(
  devtools(
    (set) => ({
      card: {},
      setCurrentCard: (card: ICard) => set({ card }, false, 'useCardStore'),
    }),
    { name: 'useCardStore' },
  ),
);
