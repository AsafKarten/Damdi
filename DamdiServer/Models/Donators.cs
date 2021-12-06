using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Donators
    {
        int auto_worker_id;
        string personal_id_worker;
        string first_name;
        string last_name;
        string salted_hash;

        public Donators(int auto_worker_id, string personal_id_worker, string first_name, string last_name, string salted_hash)
        {
            Auto_worker_id = auto_worker_id;
            Personal_id_worker = personal_id_worker;
            First_name = first_name;
            Last_name = last_name;
            Salted_hash = salted_hash;
        }



        public int Auto_worker_id { get => auto_worker_id; set => auto_worker_id = value; }
        public string Personal_id_worker { get => personal_id_worker; set => personal_id_worker = value; }
        public string First_name { get => first_name; set => first_name = value; }
        public string Last_name { get => last_name; set => last_name = value; }
        public string Salted_hash { get => salted_hash; set => salted_hash = value; }
    }
}