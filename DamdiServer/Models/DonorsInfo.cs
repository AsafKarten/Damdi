using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class DonorsInfo
    {
        private string first_name { get; set; }
        private string last_name { get; set; }
        private string phone { get; set; }
        private string gender { get; set; }
        private string birthdate { get; set; }
        private string prev_first_name { get; set; }
        private string prev_last_name { get; set; }
        private string city { get; set; }
        private string address { get; set; }
        private string postal_code { get; set; }
        private string mail_box { get; set; }
        private string telephone { get; set; }
        private string work_telephone { get; set; }
        private bool blood_group_member { get; set; }
        private bool personal_insurance { get; set; }
        private bool confirm_examination { get; set; }
        private bool agree_future_don { get; set; }
        private string birth_land { get; set; }
        private string aliya_year { get; set; }
        private string father_birth_land { get; set; }
        private string mother_birth_land { get; set; }

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