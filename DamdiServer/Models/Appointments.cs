using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Appointments
    {
        Stations station = new Stations();
        int app_id;
        int station_code;
        string personal_id;
        string app_time;

        public Appointments(int app_id, int station_code, string personal_id, string app_time)
        {
            App_id = app_id;
            Station_code = station_code;
            Personal_id = personal_id;
            App_time = app_time;
        }

        public Appointments(int app_id, string station_name,int station_code, string personal_id, string app_time)
        {
            Station.Station_name = station_name;
            Station_code = station_code;
            App_id = app_id;
            Personal_id = personal_id;
            App_time = app_time;
        }

        public int App_id { get => app_id; set => app_id = value; }
        public int Station_code { get => station_code; set => station_code = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string App_time { get => app_time; set => app_time = value; }
        public Stations Station { get => station; set => station = value; }
    }
}