using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class User
    {
        private string personal_id;
        private string email;
        private string pass;

        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string Email { get => email; set => email = value; }
        public string Pass { get => pass; set => pass = value; }

        public User()
        {

        }

        public User(string personal_id, string email, string pass)
        {
            Personal_id = personal_id;
            Email = email;
            Pass = pass;
        }

        public User(string personal_id, string email)
        {
            Personal_id = personal_id;
            Email = email;
        }
    }
}