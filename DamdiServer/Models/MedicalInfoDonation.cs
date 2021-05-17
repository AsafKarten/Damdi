using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class MedicalInfoDonation
    {
        private string personal_id;
        private int client_que_code;
        private int client_ans_code;
        private string answer_date;

        public string Personal_id { get => personal_id; set => personal_id = value; }
        public int Client_que_code { get => client_que_code; set => client_que_code = value; }
        public int Client_ans_code { get => client_ans_code; set => client_ans_code = value; }
        public string Answer_date { get => answer_date; set => answer_date = value; }

        //public MedicalInfoDonation(string personal_id)
        //{
        //    Personal_id = personal_id;
        //}
        public MedicalInfoDonation()
        {

        }
        public MedicalInfoDonation(string personal_id, int client_que_code, int client_ans_code, string answer_date)
        {
            Personal_id = personal_id;
            Client_que_code = client_que_code;
            Client_ans_code = client_ans_code;
            Answer_date = answer_date;
        }
    }
}