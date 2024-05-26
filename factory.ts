import { ethers } from "ethers";
import cDevEnvs from "./factory-envs/development.json";
import cDevProd from "./factory-envs/development.json";
import airDropAbi from "./abi/Airdrop.json";
import lentRentAbi from "./abi/Lent-Rent.json";
import usdt from "./abi/ERC20.json";
import blackListAbi from "./abi/BlackList.json";
import util from "util";
type CONTRACT_NAME = "airdrop" | "lent-rent" | "usdt" | "blacklist";

const abis: Record<CONTRACT_NAME, any> = {
  airdrop: airDropAbi,
  blacklist: blackListAbi,
  "lent-rent": lentRentAbi,
  usdt: usdt,
};

interface Contract {
  call: (methodName: string, ...params: any[]) => any;
  send: (methodName: string) => any;
}

class EtherContract implements Contract {
  constructor(private c: ethers.Contract) {}
  async call(methodName: string, ...params: any[]) {
    // 0x04F83f05CD8D329c67b044c224319C1F6226e23B
    // const res = await this.c[methodName](...params);
    console.log("pa", ...params, this.c.isBlacklisted);
    const res = await this.c.isBlacklisted(...params);

    console.log("rs", res);
    // console.log(util.inspect(this.c), this.c.isContract, this.c.isBlacklisted);
    // console.log(this.c);
  }
  send(methodName: string) {
    console.log("ether contract");
  }
}

class CaverContract implements Contract {
  constructor(private c: any) {}
  call(methodName: string, ...params: any[]) {}
  send(methodName: string) {
    console.log("caver contract");
  }
}

enum NODE_ENV {
  dev = "dev",
  prod = "prod",
}

enum ContractType {
  ETH = "ETH",
  BSC = "BSC",
  POLYGON = "POLYGON",
  KLAYTN = "KLAYTN",
}

const configs = {
  [NODE_ENV.dev]: cDevEnvs,
  [NODE_ENV.prod]: cDevProd,
};

// let a:Maybe<string>=
class ContractFactory {
  private configs: any;
  constructor(private env: NODE_ENV) {
    this.configs = configs[this.env];
  }

  getContract(type: ContractType, contractName: CONTRACT_NAME): Contract {
    if (type !== ContractType.KLAYTN) {
      const provider = new ethers.JsonRpcProvider(
        this.configs.networks[type].rpcUrls[0]
      );
      //   const signer = new JsonRpcSigner(provider);
      // console.log("aaa", abis[contractName]);
      const c = new ethers.Contract(
        this.configs.addresses[type][contractName],
        abis[contractName],
        provider
      );
      return new EtherContract(c);
    } else {
      return new CaverContract({});
    }
  }
}

const devContractFactory = new ContractFactory(NODE_ENV.dev);

const lentRentContract = devContractFactory.getContract(
  ContractType.ETH,
  "blacklist"
);

const lentRentContractCaver = devContractFactory.getContract(
  ContractType.KLAYTN,
  "blacklist"
);

lentRentContract.call(
  "isBlacklisted",
  "0x04F83f05CD8D329c67b044c224319C1F6226e23B"
);
// lentRentContractCaver.send("avc");
