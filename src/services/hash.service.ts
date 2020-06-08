import * as bcrypt from 'bcrypt';

export class HashService {
  private readonly rounds: number = 5;

  async encrypt(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.rounds);

    return bcrypt.hash(password, salt);
  }
}
