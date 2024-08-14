import { BigInt, ByteArray, Bytes, crypto, ens } from "@graphprotocol/graph-ts";

import {
    NameRegistered as ControllerNameRegisteredEvent,
    NameRenewed as ControllerNameRenewedEvent,
  } from "../generated/EthRegistrarController/EthRegistrarController";
  
  import {
    checkValidLabel,
    concat,
    getRootNode,
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

export function handleNameRegisteredByController(
    event: ControllerNameRegisteredEvent
  ): void {
    setNamePreimage(
      event.params.name,
      event.params.label,
      event.params.baseCost.plus(event.params.premium),
      event.params.tld,
    );
  }
  
export function handleNameRenewedByController(
  event: ControllerNameRenewedEvent
): void {
  setNamePreimage(event.params.name, event.params.label, event.params.cost, event.params.tld);
}

function setNamePreimage(name: string, label: Bytes, cost: BigInt, tld: string): void {
  if (!checkValidLabel(name)) {
    return;
  }

  let rootNode: ByteArray = getRootNode(tld);

  let domain = Domain.load(crypto.keccak256(concat(rootNode, label)).toHex())!;
  if (domain.labelName !== name) {
    domain.labelName = name;
    domain.name = name + `.${tld}`;
    domain.save();
  }

  let registration = Registration.load(label.toHex());
  if (registration == null) return;
  registration.labelName = name;
  registration.cost = cost;
  registration.save();
}