import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionType } from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = {
      title,
      value,
      type,
    };

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
