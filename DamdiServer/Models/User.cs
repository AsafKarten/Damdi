using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class User
    {
        public int User_number { get; set; }

        public string Personal_id { get; set; }

        public string Email { get; set; }

        public string Pass { get; set; }//כאן שיניתי לפבליק כדי לשלוח את הסיסמא לדאטאבייס דרך הדאל

        public User(int user_number, string personal_id, string email, string pass)
        {
            User_number = user_number;
            Personal_id = personal_id;
            Email = email;
            Pass = pass;
        }

        public User(int user_number, string personal_id, string email)
        {
            User_number = user_number;
            Personal_id = personal_id;
            Email = email;
        }
    }
}