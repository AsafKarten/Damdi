﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class ProfileImage
    {
        public class Img
        {
            public string Uri { get; set; }
            public string Name { get; set; }
            public string Folder { get; set; }
            public string Type { get; set; }
        }

        public class ImgRes
        {
            public string Message { get; set; }
            public string Path { get; set; }
            public bool IsOk { get; set; }
        }
    }
}