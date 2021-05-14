using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class User
    {
        public string personal_id;

        public string email;

        public string pass;
        public User(string personal_id,string pass)
        {
            this.personal_id = personal_id;
            this.pass = pass;
        }

        public User(string personal_id, string email, string pass)
        {
            this.personal_id = personal_id;
            this.email = email;
            this.pass = pass;
        }

        //public User(string personal_id, string email)
        //{
        //    this.personal_id = personal_id;
        //    this.email = email;
        //}
        public string GetPersonalId()
        {
            return this.personal_id;
        }
        public string GetEmail()
        {
            return this.email;
        }
        public string GetPass()
        {
            return this.pass;
        }
    }
}