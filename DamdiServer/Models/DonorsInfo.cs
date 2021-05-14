namespace DamdiServer.Models
{
    public class DonorsInfo
    {
        private string personal_id;
        private string first_name;
        private string last_name;
        private string phone;
        private string gender;
        private string birthdate;
        private string prev_first_name;
        private string prev_last_name;
        private string city;
        private string address;
        private string postal_code;
        private string mail_box;
        private string telephone;
        private string work_telephone;
        private bool blood_group_member;
        private bool personal_insurance;
        private bool confirm_examination;
        private bool agree_future_don;
        private string father_birth_land;
        private string mother_birth_land;
        private string aliya_year;
        private string birth_land;

        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string First_name { get => first_name; set => first_name = value; }
        public string Last_name { get => last_name; set => last_name = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Gender { get => gender; set => gender = value; }
        public string Birthdate { get => birthdate; set => birthdate = value; }
        public string Prev_first_name { get => prev_first_name; set => prev_first_name = value; }
        public string Prev_last_name { get => prev_last_name; set => prev_last_name = value; }
        public string City { get => city; set => city = value; }
        public string Address { get => address; set => address = value; }
        public string Postal_code { get => postal_code; set => postal_code = value; }
        public string Mail_box { get => mail_box; set => mail_box = value; }
        public string Telephone { get => telephone; set => telephone = value; }
        public string Work_telephone { get => work_telephone; set => work_telephone = value; }
        public bool Blood_group_member { get => blood_group_member; set => blood_group_member = value; }
        public bool Personal_insurance { get => personal_insurance; set => personal_insurance = value; }
        public bool Confirm_examination { get => confirm_examination; set => confirm_examination = value; }
        public string Birth_land { get => birth_land; set => birth_land = value; }
        public bool Agree_future_don { get => agree_future_don; set => agree_future_don = value; }
        public string Aliya_year { get => aliya_year; set => aliya_year = value; }
        public string Father_birth_land { get => father_birth_land; set => father_birth_land = value; }
        public string Mother_birth_land { get => mother_birth_land; set => mother_birth_land = value; }
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