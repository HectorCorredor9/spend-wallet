/**
 * Props for the NotFoundError component.
 *
 * @property code - HTTP status code for the error (e.g., 404, 500).
 * @property tenant - Optional tenant identifier for multi-tenant applications.
 */
export interface NotFoundErrorProps {
  code: number;
  tenant?: string;
}

/**
 * Form data for identity verification.
 *
 * @property dni - Document identification number.
 * @property cardNumber - Card number for verification.
 * @property pin - Personal identification number.
 */
export interface CardFormData {
  dni: string;
  cardNumber: string;
  pin: string;
}

/**
 * Card movement transaction data.
 *
 * @property id - Unique identifier for the transaction.
 * @property date - Transaction date in string format.
 * @property description - Description of the transaction.
 * @property amount - Transaction amount as a string.
 * @property status - Transaction status: 'cancelado' (cancelled), 'pendiente' (pending), or 'procesado' (processed).
 * @property type - Transaction type: 'debit' or 'credit'.
 */
export interface CardMovement {
  id: number;
  date: string;
  description: string;
  amount: string;
  status: 'cancelado' | 'pendiente' | 'procesado';
  type: 'debit' | 'credit';
}

/**
 * Card interface represents the structure of a card object.
 * @property id - Unique identifier for the card.
 * @property number - Card number in masked format (e.g., **** **** **** 1234).
 * @property type - Type of the card (e.g., Física, Virtual).
 * @property description - Description of the card (e.g., Plata Compras, Plata Alimentación).
 * @property exp - Expiration date of the card (e.g., MM/YY).
 * @property active - Indicates whether the card is active or not.
 * @property franchise - The card's franchise (e.g., VISA, MasterCard).
 * @property cvv2 - Optional CVV2 code for the card, used for verification purposes.
 * @property amount - Available balance or limit associated with the card.
 */
export interface ICard {
  id: number;
  number: string;
  type: string;
  description: string;
  exp: string;
  active: boolean;
  franchise: string;
  cvv2?: string;
  amount: string;
}

/**
 * Interface for the data generator utility class, providing methods to generate mock data for testing and development purposes.
 * @property keyword - A string used for filtering movements based on their description.
 * @property type - A string representing the type of movement, which can be 'debit' or 'credit'.
 * @property status - A string representing the status of the movement, which can be 'pendiente', 'procesado', or 'cancelado'.
 * @property minAmount - A string representing the minimum amount for filtering movements.
 * @property maxAmount - A string representing the maximum amount for filtering movements.
 * @property startDate - A string representing the start date for filtering movements.
 * @property endDate - A string representing the end date for filtering movements.
 */
export interface MovementsFilter {
  keyword: string;
  type: '' | 'debit' | 'credit';
  status: '' | 'pendiente' | 'procesado' | 'cancelado';
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}
