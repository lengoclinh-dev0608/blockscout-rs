import { BigInt, ByteArray, Bytes, crypto, ens } from "@graphprotocol/graph-ts";

import {
    NameRegistered as ControllerNameRegisteredEvent,
    NameRenewed as ControllerNameRenewedEvent,
  } from "../generated/EthRegistrarController/EthRegistrarController";
  
  import {
    checkValidLabel,
    concat,
    byteArrayFromHex,
    BASE_NODE_HASH_ETH,
    BASE_NODE_HASH_EVMTN,
    BASE_NODE_EVMTN,
    BASE_NODE_ETH,
  } from "./utils";


  // Import entity types generated from the GraphQL schema
import {
    Account,
    Domain,
    NameRegistered,
    NameRenewed,
    NameTransferred,
    Registration,
  } from "../generated/schema";


  var rootNodeETH: ByteArray = byteArrayFromHex(BASE_NODE_HASH_ETH);
  var rootNodeEVMTN: ByteArray = byteArrayFromHex(BASE_NODE_HASH_EVMTN);

export function handleNameRegisteredByController(
    event: ControllerNameRegisteredEvent
  ): void {
    setNamePreimage(
      event.params.name,
      event.params.label,
      event.params.baseCost.plus(event.params.premium)
    );
  }
  
export function handleNameRenewedByController(
  event: ControllerNameRenewedEvent
): void {
  setNamePreimage(event.params.name, event.params.label, event.params.cost);
}

function setNamePreimage(name: string, label: Bytes, cost: BigInt): void {
  if (!checkValidLabel(name)) {
    return;
  }

  let domain = Domain.load(crypto.keccak256(concat(rootNodeETH, label)).toHex())!;
  if (domain.labelName !== name) {
    domain.labelName = name;
    domain.name = name + BASE_NODE_ETH;
    domain.save();
  }

  let registration = Registration.load(label.toHex());
  if (registration == null) return;
  registration.labelName = name;
  registration.cost = cost;
  registration.save();
}

// Second TLD
export function handleNameRegisteredByControllerEVMTN(
  event: ControllerNameRegisteredEvent
): void {
  setNamePreimageEVMTN(
    event.params.name,
    event.params.label,
    event.params.baseCost.plus(event.params.premium)
  );
}

export function handleNameRenewedByControllerEVMTN(
  event: ControllerNameRenewedEvent
): void {
  setNamePreimageEVMTN(event.params.name, event.params.label, event.params.cost);
}

function setNamePreimageEVMTN(name: string, label: Bytes, cost: BigInt): void {
  if (!checkValidLabel(name)) {
    return;
  }

  let domain = Domain.load(crypto.keccak256(concat(rootNodeEVMTN, label)).toHex())!;
  if (domain.labelName !== name) {
    domain.labelName = name;
    domain.name = name + BASE_NODE_EVMTN;
    domain.save();
  }

  let registration = Registration.load(label.toHex());
  if (registration == null) return;
  registration.labelName = name;
  registration.cost = cost;
  registration.save();
}