const mongoose = require("mongoose");

const timeSeries = mongoose.Schema({ name: String, timestamp: Date, metadata: Object }, {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours'
    },
    autoCreate: false,
    expireAfterSeconds: 86400
  });

  module.exports = mongoose.model("TimeSeries", timeSeries)