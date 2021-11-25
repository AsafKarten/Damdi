using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class ValidForm
    {
        int id_form;
        string personal_id;
        string dateForm;
        bool valid1;
        bool valid2;
        bool valid3;
        bool valid4;
        bool valid5;
        bool valid6;
        string note;
        public int Id_form { get => id_form; set => id_form = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string DateForm { get => dateForm; set => dateForm = value; }
        public bool Valid1 { get => valid1; set => valid1 = value; }
        public bool Valid2 { get => valid2; set => valid2 = value; }
        public bool Valid3 { get => valid3; set => valid3 = value; }
        public bool Valid4 { get => valid4; set => valid4 = value; }
        public bool Valid5 { get => valid5; set => valid5 = value; }
        public bool Valid6 { get => valid6; set => valid6 = value; }
        public string Note { get => note; set => note = value; }
        public string ConStr { get; }

        public ValidForm(int id,string personal_id, string dateForm, bool valid1, bool valid2, bool valid3, bool valid4, bool valid5, bool valid6, string note)
        {
            Id_form = id;
            Personal_id = personal_id;
            DateForm = dateForm;
            Valid1 = valid1;
            Valid2 = valid2;
            Valid3 = valid3;
            Valid4 = valid4;
            Valid5 = valid5;
            Valid6 = valid6;
            Note = note;
        }
    }
}