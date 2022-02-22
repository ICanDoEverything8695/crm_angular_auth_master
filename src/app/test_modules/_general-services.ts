export class SharedMockService {
  fspl: boolean;
  displayingMessage: string;

  setFspl(flag) {
    this.fspl = flag;
  }

  showSuccessMessage(msg: string) {
    this.displayingMessage = msg;
  }
}
