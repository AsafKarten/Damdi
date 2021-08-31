using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class MedicalInfoDonation
    {
        int mi_donation_from;
        string personal_id;
        DateTime answer_date;
        bool q3_1;
        bool q3_2; bool q3_3; bool q3_4; bool q3_5; bool q3_6; bool q3_7; bool q3_8; bool q3_9; bool q3_10;
        bool q3_11; bool q3_12; bool q3_13; bool q3_14; bool q3_15; bool q3_16; bool q3_17; bool q3_18; bool q3_19;
        bool q3_20; bool q3_21;
        string notes;

        public MedicalInfoDonation(int mi_donation_from,
            string personal_id,
            DateTime answer_date,
            bool q3_1, bool q3_2,
            bool q3_3, bool q3_4,
            bool q3_5, bool q3_6,
            bool q3_7, bool q3_8,
            bool q3_9, bool q3_10,
            bool q3_11, bool q3_12,
            bool q3_13, bool q3_14,
            bool q3_15, bool q3_16,
            bool q3_17, bool q3_18,
            bool q3_19, bool q3_20,
            bool q3_21, string notes)
        {
            Mi_donation_from = mi_donation_from;
            Personal_id = personal_id;
            Answer_date = answer_date;
            Q3_1 = q3_1;
            Q3_2 = q3_2;
            Q3_3 = q3_3;
            Q3_4 = q3_4;
            Q3_5 = q3_5;
            Q3_6 = q3_6;
            Q3_7 = q3_7;
            Q3_8 = q3_8;
            Q3_9 = q3_9;
            Q3_10 = q3_10;
            Q3_11 = q3_11;
            Q3_12 = q3_12;
            Q3_13 = q3_13;
            Q3_14 = q3_14;
            Q3_15 = q3_15;
            Q3_16 = q3_16;
            Q3_17 = q3_17;
            Q3_18 = q3_18;
            Q3_19 = q3_19;
            Q3_20 = q3_20;
            Q3_21 = q3_21;
            Notes = notes;
        }

        public int Mi_donation_from { get => mi_donation_from; set => mi_donation_from = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public DateTime Answer_date { get => answer_date; set => answer_date = value; }
        public bool Q3_1 { get => q3_1; set => q3_1 = value; }
        public bool Q3_2 { get => q3_2; set => q3_2 = value; }
        public bool Q3_3 { get => q3_3; set => q3_3 = value; }
        public bool Q3_4 { get => q3_4; set => q3_4 = value; }
        public bool Q3_5 { get => q3_5; set => q3_5 = value; }
        public bool Q3_6 { get => q3_6; set => q3_6 = value; }
        public bool Q3_7 { get => q3_7; set => q3_7 = value; }
        public bool Q3_8 { get => q3_8; set => q3_8 = value; }
        public bool Q3_9 { get => q3_9; set => q3_9 = value; }
        public bool Q3_10 { get => q3_10; set => q3_10 = value; }
        public bool Q3_11 { get => q3_11; set => q3_11 = value; }
        public bool Q3_12 { get => q3_12; set => q3_12 = value; }
        public bool Q3_13 { get => q3_13; set => q3_13 = value; }
        public bool Q3_14 { get => q3_14; set => q3_14 = value; }
        public bool Q3_15 { get => q3_15; set => q3_15 = value; }
        public bool Q3_16 { get => q3_16; set => q3_16 = value; }
        public bool Q3_17 { get => q3_17; set => q3_17 = value; }
        public bool Q3_18 { get => q3_18; set => q3_18 = value; }
        public bool Q3_19 { get => q3_19; set => q3_19 = value; }
        public bool Q3_20 { get => q3_20; set => q3_20 = value; }
        public bool Q3_21 { get => q3_21; set => q3_21 = value; }
        public string Notes { get => notes; set => notes = value; }
    }
}