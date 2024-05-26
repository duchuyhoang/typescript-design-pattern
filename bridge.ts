abstract class PaymentProcess {
  constructor() {}
  public abstract pay(amount: number): any;
}

class TechcombankPayment extends PaymentProcess {
  pay(amount: number): void {
    console.log(`Techcombank payment with: ${amount}`);
  }
}

class VisaCardPayment extends PaymentProcess {
  constructor(cardNumber: string, expireDate: Date) {
    super();
  }
  pay(amount: number): void {
    console.log(`Visa payment with: ${amount}`);
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
}

abstract class PaymentProcessor {
  constructor(private paymentProcess: PaymentProcess) {}

  abstract buyProduct(product: Product): any;
}

interface Coupon {
  displayName: string;
  discount: number;
  type: "SUBSTRACT" | "DIVIDE";
  max: number;
}

class CartPaymentProcessor extends PaymentProcessor {
  constructor(paymentProcess: PaymentProcess) {
    super(paymentProcess);
  }
  buyProduct(product: Product) {
    console.log(`Cart payment with`)
  }
}

class OnlinePaymentProcessor extends PaymentProcessor {
  constructor(paymentProcess: PaymentProcess, private coupons: Array<Coupon>) {
    super(paymentProcess);
  }
  buyProduct(product: Product) {}
}

const cartPaymentProcessor = new CartPaymentProcessor(new TechcombankPayment());

cartPaymentProcessor.buyProduct({
  id: "1",
  name: "bc",
  price: 100_000_000,
});

const onlinePaymentProcessor = new OnlinePaymentProcessor(
  new VisaCardPayment("11113131313", new Date()),
  []
);

onlinePaymentProcessor.buyProduct({
  id: "2",
  name: "3bc",
  price: 400_050_000,
});
