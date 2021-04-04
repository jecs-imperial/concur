"use strict";

import { ajaxUtilities } from "necessary";

import { updateURI, initialiseURI } from "./uris";

const { post } = ajaxUtilities;

const host = "",  ///
      parameters = {};

export function updatePost(json, callback) { post(host, updateURI, parameters, json, callback); }

export function initialisePost(json, callback) { post(host, initialiseURI, parameters, json, callback); }
