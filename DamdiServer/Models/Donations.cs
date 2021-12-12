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
        string site_name;
        string donation_type;
        bool age_approve;
        int auto_worker_id;
        DateTime donation_date;
        int mi_donation_from;
        int mi_donator_from;

        public Donations(
            int blood_donation_id,
            string personal_id,
            int station_code,
            string site_name,
            string donation_type,
            bool age_approve,
            int auto_worker_id,
            DateTime donation_date,
            int mi_donation_from,
            int mi_donator_from
            )
        {
            Blood_donation_id = blood_donation_id;
            Personal_id = personal_id;
            Station_code = station_code;
            Site_name = site_name;
            Donation_type = donation_type;
            Age_approve = age_approve;
            Auto_worker_id = auto_worker_id;
            Donation_date = donation_date;
            Mi_donation_from = mi_donation_from;
            Mi_donator_from = mi_donator_from;
        }

        public int Blood_donation_id { get => blood_donation_id; set => blood_donation_id = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public int Station_code { get => station_code; set => station_code = value; }
        public string Site_name { get => site_name; set => site_name = value; }
        public string Donation_type { get => donation_type; set => donation_type = value; }
        public bool Age_approve { get => age_approve; set => age_approve = value; }
        public int Auto_worker_id { get => auto_worker_id; set => auto_worker_id = value; }
        public DateTime Donation_date { get => donation_date; set => donation_date = value; }
        public int Mi_donation_from { get => mi_donation_from; set => mi_donation_from = value; }
        public int Mi_donator_from { get => mi_donator_from; set => mi_donator_from = value; }
    }
}