/*
 * BlockScout API
 *
 * API for BlockScout web app
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: you@your-company.com
 * Generated by: https://openapi-generator.tech
 */

use crate::models;
use serde::{Deserialize, Serialize};

#[derive(Clone, Default, Debug, PartialEq, Serialize, Deserialize)]
pub struct Address {
    #[serde(
        rename = "creator_address_hash",
        skip_serializing_if = "Option::is_none"
    )]
    pub creator_address_hash: Option<String>,
    #[serde(rename = "creation_tx_hash", skip_serializing_if = "Option::is_none")]
    pub creation_tx_hash: Option<String>,
    #[serde(rename = "token", skip_serializing_if = "Option::is_none")]
    pub token: Option<models::TokenInfo>,
    #[serde(rename = "coin_balance", skip_serializing_if = "Option::is_none")]
    pub coin_balance: Option<String>,
    #[serde(rename = "exchange_rate", skip_serializing_if = "Option::is_none")]
    pub exchange_rate: Option<String>,
    #[serde(
        rename = "implementation_address",
        skip_serializing_if = "Option::is_none"
    )]
    pub implementation_address: Option<String>,
    #[serde(
        rename = "block_number_balance_updated_at",
        skip_serializing_if = "Option::is_none"
    )]
    pub block_number_balance_updated_at: Option<i32>,
    #[serde(rename = "hash")]
    pub hash: String,
    #[serde(
        rename = "implementation_name",
        skip_serializing_if = "Option::is_none"
    )]
    pub implementation_name: Option<String>,
    #[serde(rename = "name", skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(rename = "is_contract", skip_serializing_if = "Option::is_none")]
    pub is_contract: Option<bool>,
    #[serde(rename = "private_tags", skip_serializing_if = "Option::is_none")]
    pub private_tags: Option<Vec<models::AddressTag>>,
    #[serde(rename = "watchlist_names", skip_serializing_if = "Option::is_none")]
    pub watchlist_names: Option<Vec<models::WatchlistName>>,
    #[serde(rename = "public_tags", skip_serializing_if = "Option::is_none")]
    pub public_tags: Option<Vec<models::AddressTag>>,
    #[serde(rename = "is_verified", skip_serializing_if = "Option::is_none")]
    pub is_verified: Option<bool>,
    #[serde(
        rename = "has_beacon_chain_withdrawals",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_beacon_chain_withdrawals: Option<bool>,
    #[serde(
        rename = "has_custom_methods_read",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_custom_methods_read: Option<bool>,
    #[serde(
        rename = "has_custom_methods_write",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_custom_methods_write: Option<bool>,
    #[serde(
        rename = "has_decompiled_code",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_decompiled_code: Option<bool>,
    #[serde(rename = "has_logs", skip_serializing_if = "Option::is_none")]
    pub has_logs: Option<bool>,
    #[serde(rename = "has_methods_read", skip_serializing_if = "Option::is_none")]
    pub has_methods_read: Option<bool>,
    #[serde(rename = "has_methods_write", skip_serializing_if = "Option::is_none")]
    pub has_methods_write: Option<bool>,
    #[serde(
        rename = "has_methods_read_proxy",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_methods_read_proxy: Option<bool>,
    #[serde(
        rename = "has_methods_write_proxy",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_methods_write_proxy: Option<bool>,
    #[serde(
        rename = "has_token_transfers",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_token_transfers: Option<bool>,
    #[serde(rename = "has_tokens", skip_serializing_if = "Option::is_none")]
    pub has_tokens: Option<bool>,
    #[serde(
        rename = "has_validated_blocks",
        skip_serializing_if = "Option::is_none"
    )]
    pub has_validated_blocks: Option<bool>,
}

impl Address {
    pub fn new(hash: String) -> Address {
        Address {
            creator_address_hash: None,
            creation_tx_hash: None,
            token: None,
            coin_balance: None,
            exchange_rate: None,
            implementation_address: None,
            block_number_balance_updated_at: None,
            hash,
            implementation_name: None,
            name: None,
            is_contract: None,
            private_tags: None,
            watchlist_names: None,
            public_tags: None,
            is_verified: None,
            has_beacon_chain_withdrawals: None,
            has_custom_methods_read: None,
            has_custom_methods_write: None,
            has_decompiled_code: None,
            has_logs: None,
            has_methods_read: None,
            has_methods_write: None,
            has_methods_read_proxy: None,
            has_methods_write_proxy: None,
            has_token_transfers: None,
            has_tokens: None,
            has_validated_blocks: None,
        }
    }
}
