"use strict";

import { miscellaneousUtilities } from "necessary";

import { UPDATE_URI, INITIALISE_URI } from "./uris";

const { post } = miscellaneousUtilities;

const host = "";  ///

export function updatePost(json, callback) { post(host, UPDATE_URI, json, callback); }

export function initialisePost(json, callback) { post(host, INITIALISE_URI, json, callback); }
