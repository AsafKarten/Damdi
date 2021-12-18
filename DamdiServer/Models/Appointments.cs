using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Appointments
    {
        int app_id;
        int station_code;
        string personal_id;
        DateTime app_time;
        bool confirm_1;
        bool confirm_2;
        bool confirm_3;


        public Appointments(int app_id,int station_code, string personal_id, DateTime app_time,bool confirm_1, bool confirm_2, bool confirm_3)
        {
            App_id = app_id;
            Station_code = station_code;
            Personal_id = personal_id;
            App_time = app_time;
            Confirm_1 = confirm_1;
            Confirm_2 = confirm_2;
            Confirm_3 = confirm_3;
        }

        public int App_id { get => app_id; set => app_id = value; }
        public int Station_code { get => station_code; set => station_code = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public DateTime App_time { get => app_time; set => app_time = value; }
        public bool Confirm_1 { get => confirm_1; set => confirm_1 = value; }
        public bool Confirm_2 { get => confirm_2; set => confirm_2 = value; }
        public bool Confirm_3 { get => confirm_3; set => confirm_3 = value; }
    }
}