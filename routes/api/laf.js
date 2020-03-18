// This api will be responsible for all the HTTP request in the lost and found Form 

// The form will request the following.

    // Legend: * Important 

// - Name of the Student *
// - Their SR-Code *
// - What year that student is
// - What campus *
// - what department *
// - their course *
// - details of the lost item *
// - Contact Email or Mobile phone number) *
// -  Status of the report (default = Unfound/Unclaimed)

const express = require('express');
const router = express.Router();

const LafReports = require('../../models/laf.model');