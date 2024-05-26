interface Address {
  name: string;
  location: string;
}

abstract class TravelStrategy {
  public name: string = "";
  public abstract doTransport(address: Address): any;
  constructor() {}
}

class CarTravel extends TravelStrategy {
  public name: string = "car";
  constructor(private carName: string) {
    super();
  }
  public doTransport(address: Address) {
    console.log(`Go to ${address.name} by ${this.carName}`);
  }
}

class PlaneTravel extends TravelStrategy {
  public name: string = "plane";
  constructor(private planeName: string) {
    super();
  }
  public doTransport(address: Address) {
    console.log(`Go to ${address.name} by ${this.planeName}`);
  }
}

class Transport {
  private travelStrategiesMap: Map<string, TravelStrategy> = new Map();
  constructor() {}
  public addStrategy(strategy: TravelStrategy) {
    this.travelStrategiesMap.set(strategy.name, strategy);
  }

  public doTransport(name: string, address: Address) {
    const selectingStrategy = this.travelStrategiesMap.get(name);
    if (selectingStrategy) {
      selectingStrategy.doTransport(address);
    }
  }
}

const holidayAddress: Address = {
  location: "xxxx",
  name: "Nha Trang",
};

const carTravel = new CarTravel("Limousine");
const planeTravel = new PlaneTravel("Boeing");

const transporation = new Transport();

transporation.addStrategy(carTravel);
transporation.addStrategy(planeTravel);

transporation.doTransport("car", holidayAddress);
transporation.doTransport("plane", holidayAddress);

