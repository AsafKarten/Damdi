using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Donations
    {
        int blood_donation_id;
        string personal_id;
        int station_code;
        string station_name;
        string donation_type;
        bool age_approve;
        int auto_worker_id;
        DateTime donation_date;

        public Donations(int blood_donation_id)
        {
            Blood_donation_id = blood_donation_id;
        }

        public Donations(DateTime donation_date)
        {
            Donation_date = donation_date;
        }

        public Donations(
            int blood_donation_id,
            string personal_id,
            int station_code,
            string station_name,
            string donation_type,
            int auto_worker_id,
            DateTime donation_date,
            bool age_approve
            )
        {
            Blood_donation_id = blood_donation_id;
            Personal_id = personal_id;
            Station_code = station_code;
            Station_name = station_name;
            Donation_type = donation_type;
            Auto_worker_id = auto_worker_id;
            Donation_date = donation_date;
            Age_approve = age_approve;
        }

        public int Blood_donation_id { get => blood_donation_id; set => blood_donation_id = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public int Station_code { get => station_code; set => station_code = value; }
        public string Station_name { get => station_name; set => station_name = value; }
        public string Donation_type { get => donation_type; set => donation_type = value; }
        public bool Age_approve { get => age_approve; set => age_approve = value; }
        public int Auto_worker_id { get => auto_worker_id; set => auto_worker_id = value; }
        public DateTime Donation_date { get => donation_date; set => donation_date = value; }
    }
}