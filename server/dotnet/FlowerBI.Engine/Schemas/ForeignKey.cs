﻿using System;

namespace FlowerBI
{
    public interface IForeignKey : IColumn
    {
        IColumn To { get; }
    }

    public sealed class ForeignKey<T> : Column<T>, IForeignKey
    {
        public PrimaryKey<T> To { get; }

        public ForeignKey(string name, PrimaryKey<T> to, Func<T, T> converter = null, Column<T> extends = null)
            : base(name, converter, extends)
        {
            To = to;
        }

        IColumn IForeignKey.To => To;
    }
}
