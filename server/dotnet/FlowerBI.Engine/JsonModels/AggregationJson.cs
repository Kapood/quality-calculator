﻿using System.Collections.Generic;

namespace FlowerBI.Engine.JsonModels
{
    public class AggregationJson
    {
        public AggregationType Function { get; set; }

        public string Column { get; set; }

        public List<FilterJson> Filters { get; set; }
    }
}
