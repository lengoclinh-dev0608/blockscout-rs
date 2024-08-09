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
pub struct RawTraceCallAction {
    #[serde(rename = "callType")]
    pub call_type: String,
    #[serde(rename = "to")]
    pub to: String,
    #[serde(rename = "from")]
    pub from: String,
    #[serde(rename = "input")]
    pub input: String,
    #[serde(rename = "gas")]
    pub gas: String,
    #[serde(rename = "value")]
    pub value: String,
}

impl RawTraceCallAction {
    pub fn new(
        call_type: String,
        to: String,
        from: String,
        input: String,
        gas: String,
        value: String,
    ) -> RawTraceCallAction {
        RawTraceCallAction {
            call_type,
            to,
            from,
            input,
            gas,
            value,
        }
    }
}
