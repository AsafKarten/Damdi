namespace DamdiServer.Models
{
    public class DonorsInfo
    {
        public string Personal_id { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Birthdate { get; set; }
        public string Prev_first_name { get; set; }
        public string Prev_last_name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Postal_code { get; set; }
        public string Mail_box { get; set; }
        public string Telephone { get; set; }
        public string Work_telephone { get; set; }
        public bool Blood_group_member { get; set; }
        public bool Personal_insurance { get; set; }
        public bool Confirm_examination { get; set; }
        public bool Agree_future_don { get; set; }
        public string Birth_land { get; set; }
        public string Aliya_year { get; set; }
        public string Father_birth_land { get; set; }
        public string Mother_birth_land { get; set; }
        public DonorsInfo()
        {

        }
        public DonorsInfo(
            string personal_id,
            string first_name,
            string last_name,
            string phone,
            string gender,
            string birthdate,
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
            Personal_id = personal_id;
            First_name = first_name;
            Last_name = last_name;
            Phone = phone;
            Gender = gender;
            Birthdate = birthdate;
            Prev_first_name = prev_first_name;
            Prev_last_name = prev_last_name;
            City = city;
            Address = address;
            Postal_code = postal_code;
            Mail_box = mail_box;
            Telephone = telephone;
            Work_telephone = work_telephone;
            Blood_group_member = blood_group_member;
            Personal_insurance = personal_insurance;
            Confirm_examination = confirm_examination;
            Agree_future_don = agree_future_don;
            Birthdate = birth_land;
            Aliya_year = aliya_year;
            Father_birth_land = father_birth_land;
            Mother_birth_land = mother_birth_land;
        }
    }
}