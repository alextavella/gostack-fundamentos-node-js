import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumTransactionValues = (type: TransactionType) => {
      return this.transactions
        .filter((t: Transaction) => t.type === type)
        .reduce((acc: number, t: Transaction) => acc + t.value, 0);
    };

    const income = sumTransactionValues('income');
    const outcome = sumTransactionValues('outcome');

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const { total } = this.getBalance();
    if (total < value && type === 'outcome') {
      throw new Error('Transaction invalid');
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
