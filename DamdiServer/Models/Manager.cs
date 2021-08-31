using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Manager
    {
        int auto_worker_id;
        string personal_id;
        string first_name;
        string last_name;
        string salted_hash;
        int access_level;
        public Manager(int auto_worker_id, string personal_id, string first_name, string last_name, string salted_hash, int access_level)
        {
            Auto_worker_id = auto_worker_id;
            Personal_id = personal_id;
            First_name = first_name;
            Last_name = last_name;
            Salted_hash = salted_hash;
            Access_level = access_level;
        }

        public int Auto_worker_id { get => auto_worker_id; set => auto_worker_id = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string First_name { get => first_name; set => first_name = value; }
        public string Last_name { get => last_name; set => last_name = value; }
        public string Salted_hash { get => salted_hash; set => salted_hash = value; }
        public int Access_level { get => access_level; set => access_level = value; }


    }
}