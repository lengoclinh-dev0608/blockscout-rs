import { BigInt, ByteArray, Bytes, crypto, ethereum, log } from "@graphprotocol/graph-ts";
import { Account, Domain } from "../generated/schema";

export const BASE_NODE_HASH_EVMTN = "0xab0a63786a024f06ae4dfb7fd446aeb66b14802f38f4fdc0c6002478d63836a2"
export const BASE_NODE_EVMTN =
  ".evmtn";
export const BASE_NODE_HASH_ETH = "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"
export const BASE_NODE_ETH =
  ".eth";

export const ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_ADDRESS_BYTEARRAY = new ByteArray(20);


export function createEventID(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.transaction.index.toString())
    .concat("-")
    .concat(event.transactionLogIndex.toString());
}

// Helper for concatenating two byte arrays
export function concat(a: ByteArray, b: ByteArray): ByteArray {
    let out = new Uint8Array(a.length + b.length);
    for (let i = 0; i < a.length; i++) {
      out[i] = a[i];
    }
    for (let j = 0; j < b.length; j++) {
      out[a.length + j] = b[j];
    }
    // return out as ByteArray
    return changetype<ByteArray>(out);
  }
  
  export function byteArrayFromHex(s: string): ByteArray {
    if (s.length % 2 !== 0) {
      throw new TypeError("Hex string must have an even number of characters");
    }
    let out = new Uint8Array(s.length / 2);
    for (var i = 0; i < s.length; i += 2) {
      out[i / 2] = parseInt(s.substring(i, i + 2), 16) as u32;
    }
    return changetype<ByteArray>(out);
  }
  
  export function uint256ToByteArray(i: BigInt): ByteArray {
    let hex = i
      .toHex()
      .slice(2)
      .padStart(64, "0");
    return byteArrayFromHex(hex);
  }
  
  export function createOrLoadAccount(address: string): Account {
    let account = Account.load(address);
    if (account == null) {
      account = new Account(address);
      account.save();
    }
  
    return account;
  }
  
  export function createOrLoadDomain(node: string): Domain {
    let domain = Domain.load(node);
    if (domain == null) {
      domain = new Domain(node);
      domain.save();
    }
  
    return domain;
  }
  
  export function checkValidLabel(name: string): boolean {
    for (let i = 0; i < name.length; i++) {
      let c = name.charCodeAt(i);
      if (c === 0) {
        log.warning("Invalid label '{}' contained null byte. Skipping.", [name]);
        return false;
      } else if (c === 46) {
        log.warning(
          "Invalid label '{}' contained separator char '.'. Skipping.",
          [name]
        );
        return false;
      }
    }
  
    return true;
  }


export function maybeSaveDomainName(name: string): void {
  const nodehash = hashByName(name);
  const domain = Domain.load(nodehash.toHex());
  if (domain != null) {
    const label = labelFromName(name);
    domain.labelName = label;
    domain.labelhash = Bytes.fromByteArray(keccakFromStr(label));
    domain.name = name;
    domain.save()
  }
}

export function hashByName(name: string): ByteArray {
  if (name === BASE_NODE_ETH.slice(1)) {
    return byteArrayFromHex(BASE_NODE_HASH_ETH)
  } else if (!name) {
    return byteArrayFromHex(ROOT_NODE.slice(2))
  } else {
    const partition = splitStringOnce(name, '.');
    const label = partition[0];
    const remainder = partition[1];

    return crypto.keccak256(
      concat(
        hashByName(remainder),
        keccakFromStr(label)
      )
    )
  }
  }

// Second TLD
export function hashByNameEVMTN(name: string): ByteArray {
  if (name === BASE_NODE_EVMTN.slice(1)) {
    return byteArrayFromHex(BASE_NODE_HASH_EVMTN)
  } else if (!name) {
    return byteArrayFromHex(ROOT_NODE.slice(2))
  } else {
    const partition = splitStringOnce(name, '.');
    const label = partition[0];
    const remainder = partition[1];

    return crypto.keccak256(
      concat(
        hashByName(remainder),
        keccakFromStr(label)
      )
    )
  }
  }

  function splitStringOnce(input: string, separator: string): string[] {
    const splitArray = input.split(separator, 2);
    
    if (splitArray.length === 2) {
      return [splitArray[0], splitArray[1]];
    } else {
      return [input, ''];
    }
  }

function labelFromName(name: string): string {
  const labels = splitStringOnce(name, '.');
  return labels[0]
}

function keccakFromStr(s: string): ByteArray {
  return crypto.keccak256(Bytes.fromUTF8(s))
}