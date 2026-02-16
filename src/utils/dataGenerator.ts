import { ICard, CardMovement } from '@/interfaces';

/**
 * Utility class for generating mock data for development and testing purposes.
 * Provides static methods to generate sample information
 */
export class DataGenerator {
  static getCardMovements(): CardMovement[] {
    const descriptions = [
      'Plata Compras',
      'Bonus Alimentación',
      'Plata Viaticos',
      'Plata',
      'Provis',
      'Pago Servicio',
      'Transferencia',
      'Recarga',
      'Devolución',
      'Compra Online',
      'Retiro ATM',
      'Pago Suscripción',
      'Bonificación',
      'Ajuste',
      'Cobro Comisión',
      'Reembolso',
      'Pago Tarjeta',
      'Transferencia Saliente',
      'Transferencia Entrante',
      'Pago Nómina',
      'Descuento',
      'Recibo',
    ];
    const statuses: Array<'pendiente' | 'procesado' | 'cancelado'> = ['pendiente', 'procesado', 'cancelado'];
    const types: Array<'debit' | 'credit'> = ['debit', 'credit'];
    const today = new Date('2026-02-08');
    return Array.from({ length: 22 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return {
        id: i + 1,
        date: date.toISOString().slice(0, 10),
        description: descriptions[i % descriptions.length],
        amount: (Math.random() * 1000 + 1).toFixed(2),
        status: statuses[i % statuses.length],
        type: types[i % types.length],
      };
    });
  }

  static getUserData() {
    return {
      id: 1,
      name: 'Usuario Demo',
      email: 'usuario@demo.com',
      role: 'admin',
    };
  }

  static getCardsData(): ICard[] {
    return [
      {
        id: 1,
        number: '**** **** **** 1234',
        type: 'f',
        description: 'Plata Compras',
        exp: '12/28',
        active: true,
        franchise: 'VISA',
        amount: '500.00',
      },
      {
        id: 2,
        number: '**** **** **** 5678',
        type: 'v',
        description: 'Plata Alimentación',
        exp: '09/27',
        active: false,
        franchise: 'VISA',
        amount: '7000.00',
      },
      {
        id: 3,
        number: '**** **** **** 9012',
        type: 'f',
        description: 'Plata Viaticos',
        exp: '03/29',
        active: true,
        franchise: 'VISA',
        amount: '2348.00',
      },
      {
        id: 4,
        number: '**** **** **** 3456',
        type: 'v',
        description: 'Plata',
        exp: '07/26',
        active: true,
        franchise: 'VISA',
        amount: '94961.00',
      },
      {
        id: 5,
        number: '**** **** **** 7890',
        type: 'f',
        description: 'Provis',
        exp: '11/25',
        active: false,
        franchise: 'VISA',
        amount: '84711.00',
      },
    ];
  }
}
