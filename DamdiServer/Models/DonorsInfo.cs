using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class DonorsInfo
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public string birthdate { get; set; }
        public string prev_first_name { get; set; }
        public string prev_last_name { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string postal_code { get; set; }
        public string mail_box { get; set; }
        public string telephone { get; set; }
        public string work_telephone { get; set; }
        public bool blood_group_member { get; set; }
        public bool personal_insurance { get; set; }
        public bool confirm_examination { get; set; }
        public bool agree_future_don { get; set; }
        public string birth_land { get; set; }
        public string aliya_year { get; set; }
        public string father_birth_land { get; set; }
        public string mother_birth_land { get; set; }

        public DonorsInfo(
            string first_name,
            string last_name, string phone,
            string gender, string birthdate,
            string prev_first_name,
            string prev_last_name,
            string city,
            string address,
            string postal_code,
            string mail_box,
            string telephone,
            string work_telephone,
            bool blood_group_member,
            bool personal_insurance,
            bool confirm_examination,
            bool agree_future_don,
            string birth_land,
            string aliya_year,
            string father_birth_land,
            string mother_birth_land
            )
        {
            this.first_name = first_name;
            this.last_name = last_name;
            this.phone = phone;
            this.gender = gender;
            this.birthdate = birthdate;
            this.prev_first_name = prev_first_name;
            this.prev_last_name = prev_last_name;
            this.city = city;
            this.address = address;
            this.postal_code = postal_code;
            this.mail_box = mail_box;
            this.telephone = telephone;
            this.work_telephone = work_telephone;
            this.blood_group_member = blood_group_member;
            this.personal_insurance = personal_insurance;
            this.confirm_examination = confirm_examination;
            this.agree_future_don = agree_future_don;
            this.birth_land = birth_land;
            this.aliya_year = aliya_year;
            this.father_birth_land = father_birth_land;
            this.mother_birth_land = mother_birth_land;
        }
    }
}