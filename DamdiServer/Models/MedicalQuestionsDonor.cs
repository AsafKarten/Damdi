using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class MedicalQuestionsDonor
    {
        private int client_que_code;
        private string question_desc;
        public int Client_que_code { get => client_que_code; set => client_que_code = value; }
        public string Question_desc { get => question_desc; set => question_desc = value; }
        public MedicalQuestionsDonor()
        {
        }

        public MedicalQuestionsDonor(int client_que_code, string question_desc)
        {
            Client_que_code = client_que_code;
            Question_desc = question_desc;
        }
    }
}